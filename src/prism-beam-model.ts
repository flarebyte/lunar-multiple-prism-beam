import {z} from 'zod';
import {stringFields} from 'faora-kai';
import {contentTypes} from './content-type-list.js';

const getHttpAction = z.object({
  kind: z.literal('get'),
  contentType: z.enum(contentTypes),
  schemaName: stringFields.string1To50,
  urlTemplate: stringFields.string1To140,
});

const postHttpAction = z.object({
  kind: z.literal('post'),
  encodingType: z.enum(contentTypes),
  schemaName: stringFields.string1To50,
  urlTemplate: stringFields.string1To140,
});

const target = z.discriminatedUnion('kind', [getHttpAction, postHttpAction]);

const action = z.object({
  name: stringFields.string1To50,
  target,
});

const entity = z.object({
  id: stringFields.string1To140,
  _actions: z.array(action).min(1).optional(),
});
