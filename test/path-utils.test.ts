import {test} from 'node:test';
import assert from 'node:assert/strict';
import {arePathsInAllowList} from '../src/path-utils.js';

const checkAbc = arePathsInAllowList(new Set(['a.b.c', 'f.g.h', 'f.i*.a.b']));

test('arePathsInAllowList should accept expected path', () => {
  assert.ok(checkAbc(['f.g.h']), 'fgh');
  assert.ok(checkAbc(['f.g.h', 'a.b.c']), 'fgh and abc');
});

test('arePathsInAllowList should not accept bad paths', () => {
  assert.equal(checkAbc(['wrong.path']), false, 'wrong path');
});
