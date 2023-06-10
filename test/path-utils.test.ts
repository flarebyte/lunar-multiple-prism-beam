import {test} from 'node:test';
import assert from 'node:assert/strict';
import {arePathsInAllowList} from '../src/path-utils.js';

const checkAbc = arePathsInAllowList(new Set(['a/b/c', 'f/g/h', 'f/g/*/1']));

test('arePathsInAllowList should accept expected path', () => {
  assert.ok(checkAbc(['f/g/h']), 'fgh');
  assert.ok(checkAbc(['f/g/h', 'a/b/c']), 'fgh and abc');
});

test('arePathsInAllowList should not accept bad paths', () => {
  assert.ok(checkAbc(['wrong/path']), 'wrong path');
});
