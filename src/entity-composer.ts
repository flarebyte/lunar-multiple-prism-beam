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
      first: MaskedEntity;
    }
  | {
      kind: 'pair';
      id: string;
      first: MaskedEntity;
      second: MaskedEntity;
    };

export const composeEntity = (
  opts: ComposeEntityOpts
): Result<PrismBeamBaseEntity, PrismBeamError> => {
  switch (opts.kind) {
    case 'single': {
      return composeSingleEntity(opts);
    }

    case 'pair': {
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
  const {id, first} = opts;
  const firstPaths = getEntityPaths(first.entity);
  if (
    first.paths.supported &&
    !arePathsInAllowList(first.paths.supported, firstPaths)
  ) {
    return failWith({
      step: 'compose/first/supported',
      message:
        'The entity has paths that are not supported; this is suspicious and should be investigated',
    });
  }

  const firstAllowedPaths = firstPaths.filter(
    keepPathInAllowList(first.paths.allowed)
  );

  const firstPathValueList = entityToPathValueList(
    first.entity,
    firstAllowedPaths
  );
  const composedEntity = pathValueListToEntity(id, firstPathValueList);
  return succeed(composedEntity);
};

const composeProtectedEntity = (
  opts: ComposeEntityOpts & {kind: 'pair'}
): Result<PrismBeamBaseEntity, PrismBeamError> => {
  const {id, first, second} = opts;
  const firstPaths = getEntityPaths(first.entity);
  const secondPaths = getEntityPaths(second.entity);
  if (
    first.paths.supported &&
    !arePathsInAllowList(first.paths.supported, firstPaths)
  ) {
    return failWith({
      step: 'compose/first/supported',
      message:
        'The first entity has paths that are not supported; this is suspicious and should be investigated',
    });
  }

  if (
    second.paths.supported &&
    !arePathsInAllowList(second.paths.supported, secondPaths)
  ) {
    return failWith({
      step: 'compose/second/supported',
      message:
        'The second entity has paths that are not supported; this is suspicious and should be investigated',
    });
  }

  const firstAllowedPaths = firstPaths.filter(
    keepPathInAllowList(first.paths.allowed)
  );

  const secondAllowedPaths = secondPaths.filter(
    keepPathInAllowList(second.paths.allowed)
  );

  const firstPathValueList = entityToPathValueList(
    first.entity,
    firstAllowedPaths
  );

  const secondPathValueList = entityToPathValueList(
    second.entity,
    secondAllowedPaths
  );
  const composedEntity = pathValueListToEntity(id, [
    ...firstPathValueList,
    ...secondPathValueList,
  ]);
  return succeed(composedEntity);
};
