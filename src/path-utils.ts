import {deepKeys} from 'dot-prop';
import {type PrismBeamBaseEntity} from './prism-beam-model.js';

const getEntityPaths = (entity: PrismBeamBaseEntity) => deepKeys(entity);
