import SwaggerParser from '@apidevtools/swagger-parser';
import type { OpenAPIV3_1 } from 'openapi-types';

/**
 * Symbols stamped onto dereferenced schema objects so we can recover
 * the original $ref target name without a separate RefMap.
 */
export const REF_NAME_SYMBOL = Symbol('refName');
export const REF_PATH_SYMBOL = Symbol('refPath');

export type AnnotatedSchema = OpenAPIV3_1.SchemaObject & {
  [REF_NAME_SYMBOL]?: string;
  [REF_PATH_SYMBOL]?: string;
};

export interface ResolvedDocument {
  document: OpenAPIV3_1.Document;
  /** component-name → dereferenced schema (with Symbols) */
  schemaRegistry: Map<string, AnnotatedSchema>;
}

// ── Internal helpers ────────────────────────────────────────────────

/**
 * Pre-walk: collect every `$ref` pointer in the raw (pre-dereferenced) spec,
 * building a map from **identity** of the referencing object to the ref-name.
 *
 * After SwaggerParser.dereference() replaces `{ $ref }` objects with the
 * resolved schema, those resolved schemas are the *same objects* that live
 * under `components/schemas/<name>`.  We use that fact: walk the raw spec,
 * record `refPath → refName`, then after dereferencing stamp the resolved
 * component schemas with Symbol metadata.
 */
function collectRefTargets(raw: Record<string, unknown>): Map<string, string> {
  const refPaths = new Map<string, string>();

  function walk(node: unknown): void {
    if (node == null || typeof node !== 'object') return;

    if (Array.isArray(node)) {
      for (const item of node) walk(item);
      return;
    }

    const obj = node as Record<string, unknown>;
    if (typeof obj['$ref'] === 'string') {
      const ref = obj['$ref'] as string;
      if (ref.startsWith('#/components/schemas/')) {
        const name = ref.split('/').pop()!;
        refPaths.set(ref, name);
      }
      return; // $ref objects have no other meaningful keys
    }

    for (const value of Object.values(obj)) {
      walk(value);
    }
  }

  walk(raw);
  return refPaths;
}

// ── Public API ──────────────────────────────────────────────────────

function validateOpenApiVersion(raw: Record<string, unknown>): void {
  const version = (raw.openapi ?? raw.swagger) as string | undefined;
  if (!version || (!version.startsWith('3.0') && !version.startsWith('3.1'))) {
    throw new Error(
      `Unsupported OpenAPI version "${version ?? 'unknown'}". Only OpenAPI 3.0.x and 3.1.x are supported.`,
    );
  }
}

/**
 * Resolve (dereference) an OpenAPI document and annotate component schemas
 * with Symbol metadata so callers can recover `$ref` names without a RefMap.
 */
export async function resolveDocument(
  raw: Record<string, unknown>,
): Promise<ResolvedDocument> {
  validateOpenApiVersion(raw);

  // 1. Pre-walk: remember which $ref paths exist
  const refTargets = collectRefTargets(raw);

  // 2. Dereference (structuredClone to avoid mutating caller's object)
  const document = (await SwaggerParser.dereference(
    structuredClone(raw) as OpenAPIV3_1.Document,
  )) as OpenAPIV3_1.Document;

  // 3. Stamp component schemas with Symbol metadata
  const schemaRegistry = new Map<string, AnnotatedSchema>();
  const componentSchemas = document.components?.schemas;
  if (componentSchemas) {
    for (const [name, schema] of Object.entries(componentSchemas)) {
      if (schema && typeof schema === 'object' && !('$ref' in schema)) {
        const annotated = schema as AnnotatedSchema;
        annotated[REF_NAME_SYMBOL] = name;
        annotated[REF_PATH_SYMBOL] = `#/components/schemas/${name}`;
        schemaRegistry.set(name, annotated);
      }
    }
  }

  // 4. Walk dereferenced doc — for every position that originally had a $ref,
  //    the resolved object is now the component schema itself (same identity).
  //    Those are already stamped above, so downstream code can just check
  //    `schema[REF_NAME_SYMBOL]` to get the name.
  //
  //    For inline schemas in operations (response/requestBody) that pointed at
  //    a component schema, the dereferencer replaces the { $ref } with the
  //    *same* object from components.schemas, so the Symbols propagate.

  // Additionally, annotate schemas that are nested inside operations but
  // resolve to component schemas (the identity check above covers this,
  // but we also need to annotate property-level schemas that point to
  // component schemas).
  annotateNestedRefs(document, refTargets, raw);

  return { document, schemaRegistry };
}

/**
 * For schemas inside properties / allOf / oneOf that were originally $refs to
 * component schemas: ensure the resolved object carries the Symbol.
 * SwaggerParser.dereference produces the same object identity for schemas that
 * share a $ref target, so many of these are already annotated. This pass catches
 * any that might have been missed (e.g., structuredClone edge cases).
 */
function annotateNestedRefs(
  document: OpenAPIV3_1.Document,
  refTargets: Map<string, string>,
  raw: Record<string, unknown>,
): void {
  // Walk every position in the resolved document. If the corresponding position
  // in the raw doc was a $ref, stamp the resolved schema.
  function walkPair(resolved: unknown, rawNode: unknown, path: string): void {
    if (resolved == null || typeof resolved !== 'object') return;
    if (rawNode == null || typeof rawNode !== 'object') return;

    if (Array.isArray(resolved)) {
      const rawArr = rawNode as unknown[];
      for (let i = 0; i < resolved.length; i++) {
        walkPair(resolved[i], rawArr?.[i], `${path}/${i}`);
      }
      return;
    }

    const rawObj = rawNode as Record<string, unknown>;

    // If raw position was a $ref, stamp the resolved object
    if (typeof rawObj['$ref'] === 'string') {
      const ref = rawObj['$ref'] as string;
      const name = refTargets.get(ref);
      if (name && typeof resolved === 'object') {
        const schema = resolved as AnnotatedSchema;
        if (!schema[REF_NAME_SYMBOL]) {
          schema[REF_NAME_SYMBOL] = name;
          schema[REF_PATH_SYMBOL] = ref;
        }
      }
      return;
    }

    const resolvedObj = resolved as Record<string, unknown>;
    for (const key of Object.keys(resolvedObj)) {
      if (key.startsWith('x-') || key === 'description' || key === 'summary') continue;
      walkPair(resolvedObj[key], rawObj[key], `${path}/${key}`);
    }
  }

  walkPair(document, raw, '#');
}

/**
 * Helper to read the $ref name from a schema object that has been through
 * `resolveDocument()`.  Returns `undefined` if the schema was not originally
 * a `$ref`.
 */
export function getRefName(schema: unknown): string | undefined {
  if (schema == null || typeof schema !== 'object') return undefined;
  return (schema as AnnotatedSchema)[REF_NAME_SYMBOL];
}
