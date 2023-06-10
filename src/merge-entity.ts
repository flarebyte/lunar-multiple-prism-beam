import {getProperty} from 'dot-prop';
import {
  type PrismBeamPathValue,
  type PrismBeamBaseEntity,
} from './prism-beam-model.js';
import {isSimplePrimitive, isPrismBeamBaseEntity} from './guards.js';

const getAsPrismBeamPathValueOrNot =
  (entity: PrismBeamBaseEntity) =>
  (path: string): PrismBeamPathValue | undefined => {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const value = getProperty(entity, path);
    return isSimplePrimitive(value) ? {path, value} : undefined;
  };

const getEntityAsPathObject = (
  entity: PrismBeamBaseEntity,
  paths: string[]
): PrismBeamPathValue[] =>
  paths.map(getAsPrismBeamPathValueOrNot(entity)).filter(isPrismBeamBaseEntity);
