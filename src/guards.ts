import {type PrismBeamPathValue} from './prism-beam-model.js';

export const isSimplePrimitive = (
  value: unknown
): value is string | number | boolean =>
  typeof value === 'string' ||
  typeof value === 'number' ||
  typeof value === 'boolean';
export const isPrismBeamBaseEntity = (
  value: Record<string, unknown> | undefined
): value is PrismBeamPathValue =>
  value !== undefined && typeof value['path'] === 'string';
