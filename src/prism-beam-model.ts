import {z} from 'zod';
import {stringFields} from 'faora-kai';

const tags = z.array(stringFields.string1To80).nonempty().max(30).optional();
const role = stringFields.string1To80;
const userId = stringFields.string1To80;
const dateTime = z.date();
const operation = z.enum([
  'read',
  'create',
  'update',
  'upsert',
  'delete',
  'search',
]);

export const entity = z.object({
  id: stringFields.string1To140,
});

const pathValue = z.object({
  path: stringFields.string1To200,
  value: z.union([z.string(), z.number(), z.boolean()]),
});

const queryContext = z.object({
  userId,
  created: dateTime,
});

const query = z.object({
  role,
  operation,
  tags,
  ids: z.array(z.number()).nonempty().max(30),
});

const task = z.object({
  context: queryContext,
  queries: z.array(query).nonempty(),
  entities: z.array(entity).nonempty(),
});

export type PrismBeamBaseEntity = z.infer<typeof entity>;

export type PrismBeamPairEntity = {
  first: PrismBeamBaseEntity;
  second: PrismBeamBaseEntity;
};

export type PrismBeamTripleEntity = {
  first: PrismBeamBaseEntity;
  second: PrismBeamBaseEntity;
  third: PrismBeamBaseEntity;
};

export type PrismBeamTask = z.infer<typeof task>;

export type PrismBeamPathValue = z.infer<typeof pathValue>;
type ValidationError = {
  message: string;
  path: string;
};

/** An error that could be returned by lunar multiple prism error */
export type PrismBeamError =
  | {
      step:
        | 'single/validate-output'
        | 'single/validate-first-entity'
        | 'pair/validate-output'
        | 'pair/validate-first-entity'
        | 'pair/validate-second-entity'
        | 'triple/validate-output'
        | 'triple/validate-first-entity'
        | 'triple/validate-second-entity'
        | 'triple/validate-third-entity';
      errors: ValidationError[];
    }
  | {
      step:
        | 'compose'
        | 'compose/first/supported'
        | 'compose/second/supported'
        | 'compose/third/supported';

      message: string;
      finalMessage?: string;
    };
