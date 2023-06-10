import {test} from 'node:test';
import assert from 'node:assert/strict';
import {arePathsInAllowList, keepPathInAllowList} from '../src/path-utils.js';

const checkAbc = arePathsInAllowList(new Set(['a.b.c', 'f.g.h', 'f.i*.a.b']));
const keepAbc = keepPathInAllowList(new Set(['a.b.c', 'f.g.h', 'f.i*.a.b']));

test('arePathsInAllowList should accept expected path', () => {
  assert.ok(checkAbc(['f.g.h']), 'fgh');
  assert.ok(checkAbc(['f.g.h', 'a.b.c']), 'fgh and abc');
  assert.ok(
    checkAbc(['a.b.c', 'f.i[6].a.b', 'f.i[999].a.b', 'f.i[9999].a.b']),
    'fgh and abc'
  );
});

test('arePathsInAllowList should not accept bad paths', () => {
  assert.equal(checkAbc(['a.b.c', 'wrong.path']), false, 'wrong path');
  assert.equal(checkAbc(['a.b.c', 'unsafe path']), false, 'path with space');
  assert.equal(checkAbc(['a.b.c', 'f.i*.a.b']), false, 'no * in path');
});

test('keepPathInAllowList should accept expected path', () => {
  assert.ok(keepAbc('f.g.h'), 'fgh');
  assert.ok(keepAbc('a.b.c'), 'abc');
  assert.ok(keepAbc('f.i[999].a.b'), 'array indice');
});

test('keepPathInAllowList should not accept bad paths', () => {
  assert.equal(keepAbc('wrong.path'), false, 'wrong path');
  assert.equal(keepAbc('unsafe path'), false, 'path with space');
  assert.equal(keepAbc('f.i*.a.b'), false, 'no * in path');
});
