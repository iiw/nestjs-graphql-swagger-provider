import * as fs from 'node:fs';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { generate } from '../src/generate.js';
import { createOutputDir, PRICING_API_FIXTURE_PATH, removeOutputDir } from './helpers.js';

describe('generate with pricing API spec', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-pricing-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
  });

  it('should generate without errors', async () => {
    await expect(generate(PRICING_API_FIXTURE_PATH, outputDir)).resolves.not.toThrow();
  });

  it('should create a folder for each controller tag', async () => {
    await generate(PRICING_API_FIXTURE_PATH, outputDir);

    const expectedFolders = [
      'actualiza',
      'cancelar',
      'consulta',
      'precio-unitario',
      'reingreso',
    ];

    for (const folder of expectedFolders) {
      expect(
        fs.existsSync(path.join(outputDir, folder)),
        `Expected folder "${folder}" to exist`,
      ).toBe(true);
    }
  });

  it('should generate all module files for each controller', async () => {
    await generate(PRICING_API_FIXTURE_PATH, outputDir);

    const moduleFiles = ['module.ts', 'resolver.ts', 'service.ts'];

    for (const controller of ['actualiza', 'consulta', 'cancelar', 'reingreso']) {
      for (const suffix of moduleFiles) {
        const filePath = path.join(outputDir, controller, `${controller}.${suffix}`);
        expect(
          fs.existsSync(filePath),
          `Expected ${controller}/${controller}.${suffix} to exist`,
        ).toBe(true);
      }
    }
  });

  it('should not generate enums.ts when spec has no enums', async () => {
    await generate(PRICING_API_FIXTURE_PATH, outputDir);

    expect(fs.existsSync(path.join(outputDir, 'enums.ts'))).toBe(false);
  });

  it('should generate a model class for each consulta GET endpoint', async () => {
    await generate(PRICING_API_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'consulta', 'consulta.models.ts'),
      'utf-8',
    );
    // Each GET endpoint produces a response model
    expect(content).toContain('class GetConsultaPendientesFolioLPEResponse');
    expect(content).toContain('class GetConsultaPuObtenerPUsAutorizadosEnGestionResponse');
    expect(content).toContain('class GetConsultaPUInterfazSAPFechaCreacionResponse');
    expect(content).toContain('class GetConsultaPUVoBoObtenerPUSResponse');
    expect(content).toContain('class GetConsultaPUVoBoObtenerContratosResponse');
    expect(content).toContain('class GetConsultaPUVoBoObtenerObrasResponse');
    expect(content).toContain('class GetConsultaPUEncarpetadoResponse');
  });

  it('should handle multiple path parameters in PrecioUnitario controller', async () => {
    await generate(PRICING_API_FIXTURE_PATH, outputDir);

    const resolverContent = fs.readFileSync(
      path.join(outputDir, 'precio-unitario', 'precio-unitario.resolver.ts'),
      'utf-8',
    );
    // GET /PrecioUnitario/{contrato}/{anexo}/{partida} has 3 path params
    expect(resolverContent).toContain("@Args('contrato'");
    expect(resolverContent).toContain("@Args('anexo'");
    expect(resolverContent).toContain("@Args('partida'");
  });

  it('should pass multiple path parameters to service and api client', async () => {
    await generate(PRICING_API_FIXTURE_PATH, outputDir);

    const serviceContent = fs.readFileSync(
      path.join(outputDir, 'precio-unitario', 'precio-unitario.service.ts'),
      'utf-8',
    );
    expect(serviceContent).toContain('contrato');
    expect(serviceContent).toContain('anexo');
    expect(serviceContent).toContain('partida');
  });

  it('should generate response model for PrecioUnitario controller', async () => {
    await generate(PRICING_API_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'precio-unitario', 'precio-unitario.models.ts'),
      'utf-8',
    );
    expect(content).toContain('class GetPrecioUnitarioContratoAnexoPartidaResponse');
    expect(content).toContain('@ObjectType()');
    expect(content).toContain('solicitud');
    expect(content).toContain('noSolicitudCancelacion');
  });

  it('should handle multiple query parameters in consulta controller', async () => {
    await generate(PRICING_API_FIXTURE_PATH, outputDir);

    const resolverContent = fs.readFileSync(
      path.join(outputDir, 'consulta', 'consulta.resolver.ts'),
      'utf-8',
    );
    // GET /consulta/PUVoBo/ObtenerPUS has 7 query params
    expect(resolverContent).toContain("@Args('solicitud'");
    expect(resolverContent).toContain("@Args('contrato'");
    expect(resolverContent).toContain("@Args('cancelado'");
  });

  it('should generate DTOs for controllers with request bodies', async () => {
    await generate(PRICING_API_FIXTURE_PATH, outputDir);

    expect(fs.existsSync(path.join(outputDir, 'actualiza', 'actualiza.dto.ts'))).toBe(true);
    expect(fs.existsSync(path.join(outputDir, 'cancelar', 'cancelar.dto.ts'))).toBe(true);
  });

  it('should generate @Mutation decorators for POST endpoints', async () => {
    await generate(PRICING_API_FIXTURE_PATH, outputDir);

    const resolverContent = fs.readFileSync(
      path.join(outputDir, 'actualiza', 'actualiza.resolver.ts'),
      'utf-8',
    );
    expect(resolverContent).toContain('@Mutation(');
  });

  it('should generate @Query decorators for GET endpoints', async () => {
    await generate(PRICING_API_FIXTURE_PATH, outputDir);

    const resolverContent = fs.readFileSync(
      path.join(outputDir, 'consulta', 'consulta.resolver.ts'),
      'utf-8',
    );
    expect(resolverContent).toContain('@Query(');
  });

  it('should generate error handling for 404 responses', async () => {
    await generate(PRICING_API_FIXTURE_PATH, outputDir);

    const serviceContent = fs.readFileSync(
      path.join(outputDir, 'consulta', 'consulta.service.ts'),
      'utf-8',
    );
    expect(serviceContent).toContain('HttpException');
    expect(serviceContent).toContain('404');
  });

  it('all generated class names should be valid TypeScript identifiers', async () => {
    await generate(PRICING_API_FIXTURE_PATH, outputDir);

    const dirs = fs.readdirSync(outputDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const dir of dirs) {
      const dirPath = path.join(outputDir, dir);
      const files = fs.readdirSync(dirPath).filter(
        (f) => f.endsWith('.models.ts') || f.endsWith('.dto.ts'),
      );

      for (const file of files) {
        const content = fs.readFileSync(path.join(dirPath, file), 'utf-8');
        const classNames = [...content.matchAll(/class (\S+)/g)].map((m) => m[1]);

        for (const name of classNames) {
          expect(name, `Class "${name}" in ${file} is not a valid identifier`).toMatch(
            /^[A-Z][A-Za-z0-9_]*$/,
          );
        }
      }
    }
  });

  it('should generate service calls using correct api client namespaces', async () => {
    await generate(PRICING_API_FIXTURE_PATH, outputDir);

    const apiClientContent = fs.readFileSync(
      path.join(outputDir, 'api-client.ts'),
      'utf-8',
    );

    // Verify namespaces used in services exist in api-client
    for (const controller of ['actualiza', 'consulta', 'cancelar', 'precio-unitario', 'reingreso']) {
      const servicePath = path.join(outputDir, controller, `${controller}.service.ts`);
      if (!fs.existsSync(servicePath)) continue;

      const serviceContent = fs.readFileSync(servicePath, 'utf-8');
      const namespaceCalls = [...serviceContent.matchAll(/this\.apiClient\.(\w+)\.\w+\(/g)];
      const namespaces = [...new Set(namespaceCalls.map((m) => m[1]))];

      for (const ns of namespaces) {
        expect(
          apiClientContent,
          `Service uses namespace "${ns}" but it doesn't exist in api-client.ts`,
        ).toMatch(new RegExp(`\\b${ns}\\b\\s*=\\s*\\{`));
      }
    }
  });
});
