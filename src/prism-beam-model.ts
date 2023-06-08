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
  _actions: z.array(action).min(1).optional(),
});

export type PrismBeamEntity = z.infer<typeof entity>;
