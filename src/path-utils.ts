import {deepKeys} from 'dot-prop';
import {type PrismBeamBaseEntity} from './prism-beam-model.js';

export const getEntityPaths = (entity: PrismBeamBaseEntity) => deepKeys(entity);

const isSafePath = (path: string): boolean =>
  /^\w+(\[\d{1,4}])?(\.\w+(\[\d{1,4}])?)*$/.test(path);

export const arePathsInAllowList =
  (allowList: Set<string>) =>
  (actual: string[]): boolean =>
    !actual.some((path) => isSafePath(path) && !allowList.has(path));
