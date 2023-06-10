import {type Result, succeed, failWith} from 'fairlie-functional';
import {
  type PrismBeamBaseEntity,
  type PrismBeamError,
} from './prism-beam-model.js';
import {
  arePathsInAllowList,
  getEntityPaths,
  keepPathInAllowList,
} from './path-utils.js';
import {
  entityToPathValueList,
  pathValueListToEntity,
} from './path-value-utils.js';

type MaskedEntity = {
  entity: PrismBeamBaseEntity;
  paths: {
    supported?: Set<string>;
    allowed: Set<string>;
  };
};

type ComposeEntityOpts =
  | {
      kind: 'single';
      id: string;
      main: MaskedEntity;
    }
  | {
      kind: 'protected';
      id: string;
      main: MaskedEntity;
      protected: MaskedEntity;
    };

export const composeEntity = (
  opts: ComposeEntityOpts
): Result<PrismBeamBaseEntity, PrismBeamError> => {
  switch (opts.kind) {
    case 'single': {
      return composeSingleEntity(opts);
    }

    case 'protected': {
      return composeProtectedEntity(opts);
    }

    default: {
      return failWith({step: 'compose', message: 'Unknown kind options'});
    }
  }
};

const composeSingleEntity = (
  opts: ComposeEntityOpts & {kind: 'single'}
): Result<PrismBeamBaseEntity, PrismBeamError> => {
  const {id, main} = opts;
  const mainPaths = getEntityPaths(main.entity);
  if (
    main.paths.supported &&
    !arePathsInAllowList(main.paths.supported, mainPaths)
  ) {
    return failWith({
      step: 'compose/main/supported',
      message: 'The main entity has paths that are not supported',
    });
  }

  const mainAllowedPaths = mainPaths.filter(
    keepPathInAllowList(main.paths.allowed)
  );

  const mainPathValueList = entityToPathValueList(
    main.entity,
    mainAllowedPaths
  );
  const composedEntity = pathValueListToEntity(id, mainPathValueList);
  return succeed(composedEntity);
};

const composeProtectedEntity = (
  opts: ComposeEntityOpts & {kind: 'protected'}
): Result<PrismBeamBaseEntity, PrismBeamError> => {
  return succeed({id: 'id123'});
};
