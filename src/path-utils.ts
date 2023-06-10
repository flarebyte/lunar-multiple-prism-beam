import {deepKeys} from 'dot-prop';
import {type PrismBeamBaseEntity} from './prism-beam-model.js';

export const getEntityPaths = (entity: PrismBeamBaseEntity) => deepKeys(entity);

export const arePathsInAllowList =
  (allowList: Set<string>) =>
  (actual: string[]): boolean =>
    !actual.some((value) => !allowList.has(value));
