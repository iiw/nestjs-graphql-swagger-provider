import * as fs from 'node:fs';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { generate } from '../src/generate.js';
import { createOutputDir, NESTED_FIXTURE_PATH, removeOutputDir } from './helpers.js';

describe('generate with inline nested objects', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-nested-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
  });

  it('should generate separate @InputType() class for nested object property', async () => {
    await generate(NESTED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'orders', 'orders.dto.ts'),
      'utf-8',
    );
    // The nested shipping object should be extracted to its own class
    expect(content).toContain('class CreateOrderInputShipping');
    expect(content).toContain('@InputType()');
  });

  it('should reference the extracted nested type in the parent class', async () => {
    await generate(NESTED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'orders', 'orders.dto.ts'),
      'utf-8',
    );
    // Parent should reference the extracted type
    expect(content).toContain('shipping');
    expect(content).toContain('CreateOrderInputShipping');
  });

  it('should generate separate class for array of inline objects', async () => {
    await generate(NESTED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'orders', 'orders.dto.ts'),
      'utf-8',
    );
    // items is an array of inline objects
    expect(content).toContain('class CreateOrderInputItems');
    expect(content).toContain('productId');
    expect(content).toContain('quantity');
  });

  it('should generate deeply nested extracted classes', async () => {
    await generate(NESTED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'orders', 'orders.dto.ts'),
      'utf-8',
    );
    // shipping.geo is a nested object within the nested shipping object
    expect(content).toContain('class CreateOrderInputShippingGeo');
    expect(content).toContain('lat');
    expect(content).toContain('lng');
  });

  it('should generate separate @ObjectType() classes for nested objects in responses', async () => {
    await generate(NESTED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'orders', 'orders.models.ts'),
      'utf-8',
    );
    expect(content).toContain('class OrderShipping');
    expect(content).toContain('@ObjectType()');
    expect(content).toContain('street');
    expect(content).toContain('city');
  });

  it('should generate deeply nested @ObjectType() classes for responses', async () => {
    await generate(NESTED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'orders', 'orders.models.ts'),
      'utf-8',
    );
    expect(content).toContain('class OrderShippingGeo');
  });

  it('should generate separate @ObjectType() class for array of inline objects in responses', async () => {
    await generate(NESTED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'orders', 'orders.models.ts'),
      'utf-8',
    );
    expect(content).toContain('class OrderPayments');
    expect(content).toContain('method');
    expect(content).toContain('amount');
  });

  it('should preserve descriptions on nested object properties', async () => {
    await generate(NESTED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'orders', 'orders.dto.ts'),
      'utf-8',
    );
    // The items[].note property has a description
    expect(content).toContain("description: 'Optional note for this item'");
  });

  it('should use explicit @Field(() => Type) for nested object types', async () => {
    await generate(NESTED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'orders', 'orders.dto.ts'),
      'utf-8',
    );
    expect(content).toContain('() => CreateOrderInputShipping');
  });

  it('should use @Field(() => [Type]) for array of nested objects', async () => {
    await generate(NESTED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'orders', 'orders.dto.ts'),
      'utf-8',
    );
    expect(content).toContain('() => [CreateOrderInputItems]');
  });
});
