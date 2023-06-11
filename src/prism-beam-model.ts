import {z} from 'zod';
import {stringFields} from 'faora-kai';
import {contentTypes} from './content-type-list.js';

const tags = z.array(stringFields.string1To80).min(1).optional();
const urlTemplate = stringFields.string1To140;
const roles = z.array(stringFields.string1To80).min(1).optional();

const getHttpAction = z.object({
  kind: z.literal('http/get'),
  contentType: z.enum(contentTypes),
  schemaName: stringFields.string1To50,
  urlTemplate,
});

const postHttpAction = z.object({
  kind: z.literal('http/post'),
  encodingType: z.enum(contentTypes),
  schemaName: stringFields.string1To50,
  urlTemplate,
});

const putHttpAction = z.object({
  kind: z.literal('http/put'),
  encodingType: z.enum(contentTypes),
  schemaName: stringFields.string1To50,
  urlTemplate,
});

const target = z.discriminatedUnion('kind', [
  getHttpAction,
  postHttpAction,
  putHttpAction,
]);

const action = z.object({
  name: stringFields.string1To50,
  target,
  tags,
  roles,
});

export const entity = z.object({
  id: stringFields.string1To140,
});

export const actionable = z.object({
  _actions: z.array(action).nonempty().optional(),
});

const pathValue = z.object({
  path: stringFields.string1To200,
  value: z.union([z.string(), z.number(), z.boolean()]),
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

export type PrismBeamAction = z.infer<typeof action>;

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
