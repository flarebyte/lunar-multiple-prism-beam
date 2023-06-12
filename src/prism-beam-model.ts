import {z} from 'zod';
import {stringFields} from 'faora-kai';

const tags = z.array(stringFields.string1To80).nonempty().max(30).optional();
const role = stringFields.string1To80;
const userId = stringFields.string1To80;
const dateTime = z.date();

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
  tags,
});

const ref = z.object({
  name: stringFields.string1To80,
  ref: stringFields.string1To80,
});

const payloadRef = z.object({
  a: z.literal('entity'),
  name: stringFields.string1To80,
  entity,
});

const query = z.object({
  role,
  tags,
  refs: z.array(ref).nonempty().max(30),
});

const task = z.object({
  context: queryContext,
  queries: z.array(query).nonempty(),
  payloads: z.array(payloadRef).nonempty(),
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
