import {type Result, succeed, failWith} from 'fairlie-functional';
import {type ZodSchema} from 'zod';
import {safeParse} from 'faora-kai';
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
      schema: ZodSchema;
    }
  | {
      kind: 'pair';
      id: string;
      first: MaskedEntity;
      second: MaskedEntity;
      schema: ZodSchema;
    }
  | {
      kind: 'triple';
      id: string;
      first: MaskedEntity;
      second: MaskedEntity;
      third: MaskedEntity;
      schema: ZodSchema;
    };

export const composeEntity = <M extends Record<string, unknown>>(
  opts: ComposeEntityOpts
): Result<M, PrismBeamError> => {
  switch (opts.kind) {
    case 'single': {
      return composeSingleEntity<M>(opts);
    }

    case 'pair': {
      return composePairEntity<M>(opts);
    }

    case 'triple': {
      return composeTripleEntity<M>(opts);
    }

    default: {
      return failWith({step: 'compose', message: 'Unknown kind options'});
    }
  }
};

const composeSingleEntity = <M extends Record<string, unknown>>(
  opts: ComposeEntityOpts & {kind: 'single'}
): Result<M, PrismBeamError> => {
  const {id, first, schema} = opts;
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
  const composedEntityResult = safeParse<M>(composedEntity, {
    schema,
    formatting: 'privacy-first',
  });
  if (composedEntityResult.status === 'failure') {
    return failWith({
      step: 'single/validate-output',
      errors: composedEntityResult.error,
    });
  }

  return succeed(composedEntityResult.value);
};

const composePairEntity = <M extends Record<string, unknown>>(
  opts: ComposeEntityOpts & {kind: 'pair'}
): Result<M, PrismBeamError> => {
  const {id, schema, first, second} = opts;
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
  const composedEntityResult = safeParse<M>(composedEntity, {
    schema,
    formatting: 'privacy-first',
  });
  if (composedEntityResult.status === 'failure') {
    return failWith({
      step: 'pair/validate-output',
      errors: composedEntityResult.error,
    });
  }

  return succeed(composedEntityResult.value);
};

const composeTripleEntity = <M extends Record<string, unknown>>(
  opts: ComposeEntityOpts & {kind: 'triple'}
): Result<M, PrismBeamError> => {
  const {id, schema, first, second, third} = opts;
  const firstPaths = getEntityPaths(first.entity);
  const secondPaths = getEntityPaths(second.entity);
  const thirdPaths = getEntityPaths(third.entity);
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

  if (
    third.paths.supported &&
    !arePathsInAllowList(third.paths.supported, thirdPaths)
  ) {
    return failWith({
      step: 'compose/third/supported',
      message:
        'The third entity has paths that are not supported; this is suspicious and should be investigated',
    });
  }

  const firstAllowedPaths = firstPaths.filter(
    keepPathInAllowList(first.paths.allowed)
  );

  const secondAllowedPaths = secondPaths.filter(
    keepPathInAllowList(second.paths.allowed)
  );
  const thirdAllowedPaths = thirdPaths.filter(
    keepPathInAllowList(third.paths.allowed)
  );

  const firstPathValueList = entityToPathValueList(
    first.entity,
    firstAllowedPaths
  );

  const secondPathValueList = entityToPathValueList(
    second.entity,
    secondAllowedPaths
  );
  const thirdPathValueList = entityToPathValueList(
    third.entity,
    thirdAllowedPaths
  );
  const composedEntity = pathValueListToEntity(id, [
    ...firstPathValueList,
    ...secondPathValueList,
    ...thirdPathValueList,
  ]);
  const composedEntityResult = safeParse<M>(composedEntity, {
    schema,
    formatting: 'privacy-first',
  });
  if (composedEntityResult.status === 'failure') {
    return failWith({
      step: 'triple/validate-output',
      errors: composedEntityResult.error,
    });
  }

  return succeed(composedEntityResult.value);
};
