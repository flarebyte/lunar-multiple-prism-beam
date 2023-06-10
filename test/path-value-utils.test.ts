import {test} from 'node:test';
import assert from 'node:assert/strict';
import {
  entityToPathValueList,
  pathValueListToEntity,
} from '../src/path-value-utils.js';
import {getEntityPaths} from '../src/path-utils.js';

test('entityToPathValueList and pathValueListToEntity should get back the initial entity', () => {
  const entity = {
    id: 'id123',
    name: 'name123',
    address: {street: '123 street'},
    active: true,
    age: 21,
    phones: ['phone1', 'phone2', 'phone3'],
  };
  const paths = getEntityPaths(entity);
  const pvl = entityToPathValueList(entity, paths);
  const actual = pathValueListToEntity('id123', pvl);
  assert.deepStrictEqual(actual, entity);
});
