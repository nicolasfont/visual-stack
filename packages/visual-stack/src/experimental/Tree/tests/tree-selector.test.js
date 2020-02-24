import {
  TreeSelector,
  SELECTION_EMPTY,
  SELECTION_PARTIAL,
  SELECTION_FULL,
} from '../tree-selector';
import R from 'ramda';

const hierarchy = {
  root: { name: 'Root', children: ['a', 'b'] },
  a: { name: 'A', parentId: 'root', children: ['a1', 'a2'] },
  a1: { name: 'A1', parentId: 'a', children: ['a11'] },
  a2: { name: 'A2', parentId: 'a', children: [] },
  a11: { name: 'A11', parentId: 'a1', children: [] },
  b: { name: 'B', parentId: 'root', children: ['b1', 'b2', 'b3'] },
  b1: { name: 'B1', parentId: 'b', children: ['b11'] },
  b2: { name: 'B2', parentId: 'b', children: [] },
  b3: { name: 'B3', parentId: 'b', children: [] },
  b11: { name: 'B11', parentId: 'b1', children: ['b111'] },
  b111: { name: 'B111', parentId: 'b11', children: [] },
};

const initialSelection = R.map(R.always(SELECTION_FULL), hierarchy);

const treeSelector = new TreeSelector({
  parent: (nodeId, hierarchy) => hierarchy[nodeId].parentId,
  children: (nodeId, hierarchy) => hierarchy[nodeId].children,
  isChild: (nodeId, hierarchy) => hierarchy[nodeId].children.length == 0,
  all: (predicate, hierarchy) =>
    (function*() {
      for (let id in hierarchy) if (predicate(id)) yield id;
    })(),
  rootId: _ => 'root',
  name: (nodeId, hierarchy) => hierarchy[nodeId].name,
});

const toggle = (nodeId, selection = initialSelection) =>
  treeSelector.toggle(nodeId, selection, hierarchy);

const select = (nodeId, state, selection = initialSelection) =>
  treeSelector.select(nodeId, state, selection, hierarchy);

const forAll = () => true;
const selectAllLeaves = (predicate, newState, selection = initialSelection) =>
  treeSelector.selectAllLeaves(predicate, newState, selection, hierarchy);

test('toggling selection of a leaf node works', () => {
  const actual1 = toggle('a2');
  expect(actual1).toEqual({
    ...initialSelection,
    a2: SELECTION_EMPTY,
    a: SELECTION_PARTIAL,
    root: SELECTION_PARTIAL,
  });

  const actual2 = toggle('a2', actual1);
  expect(actual2).toEqual(initialSelection);
});

test('setting selection of a leaf node works', () => {
  const actual1 = select('a2', SELECTION_EMPTY);
  expect(actual1).toEqual({
    ...initialSelection,
    a2: SELECTION_EMPTY,
    a: SELECTION_PARTIAL,
    root: SELECTION_PARTIAL,
  });

  const actual2 = select('a2', SELECTION_FULL, actual1);
  expect(actual2).toEqual(initialSelection);
});

test('setting selection of a leaf node is idempotent', () => {
  const actual1 = select('a2', SELECTION_EMPTY, select('a2', SELECTION_EMPTY));

  expect(actual1).toEqual({
    ...initialSelection,
    a2: SELECTION_EMPTY,
    a: SELECTION_PARTIAL,
    root: SELECTION_PARTIAL,
  });

  const actual2 = select(
    'a2',
    SELECTION_FULL,
    select('a2', SELECTION_FULL, actual1)
  );
  expect(actual2).toEqual(initialSelection);
});

test('toggling selection of a non-leaf node works', () => {
  const actual1 = toggle('a');
  expect(actual1).toEqual({
    ...initialSelection,
    a: SELECTION_EMPTY,
    a1: SELECTION_EMPTY,
    a11: SELECTION_EMPTY,
    a2: SELECTION_EMPTY,
    root: SELECTION_PARTIAL,
  });

  const actual2 = toggle('a', actual1);
  expect(actual2).toEqual(initialSelection);
});

test('setting selection of a non-leaf node works', () => {
  const actual1 = select('a', SELECTION_EMPTY);
  expect(actual1).toEqual({
    ...initialSelection,
    a: SELECTION_EMPTY,
    a1: SELECTION_EMPTY,
    a11: SELECTION_EMPTY,
    a2: SELECTION_EMPTY,
    root: SELECTION_PARTIAL,
  });

  const actual2 = select('a', SELECTION_FULL, actual1);
  expect(actual2).toEqual(initialSelection);
});

test('setting selection of a non-leaf is idempotent', () => {
  const actual1 = select('a', SELECTION_EMPTY, select('a', SELECTION_EMPTY));
  expect(actual1).toEqual({
    ...initialSelection,
    a: SELECTION_EMPTY,
    a1: SELECTION_EMPTY,
    a11: SELECTION_EMPTY,
    a2: SELECTION_EMPTY,
    root: SELECTION_PARTIAL,
  });

  const actual2 = select(
    'a',
    SELECTION_FULL,
    select('a', SELECTION_FULL, actual1)
  );
  expect(actual2).toEqual(initialSelection);
});

test('setting selection of all leaves works', () => {
  const actual1 = selectAllLeaves(forAll, SELECTION_EMPTY);
  expect(actual1).toEqual({
    root: SELECTION_EMPTY,
    a: SELECTION_EMPTY,
    b: SELECTION_EMPTY,
    a1: SELECTION_EMPTY,
    a11: SELECTION_EMPTY,
    a2: SELECTION_EMPTY,
    b1: SELECTION_EMPTY,
    b2: SELECTION_EMPTY,
    b3: SELECTION_EMPTY,
    b11: SELECTION_EMPTY,
    b111: SELECTION_EMPTY,
  });

  const actual2 = selectAllLeaves(forAll, SELECTION_FULL, actual1);
  expect(actual2).toEqual(initialSelection);
});

test('setting selection of all leaves is idempotent', () => {
  const actual1 = selectAllLeaves(
    forAll,
    SELECTION_EMPTY,
    selectAllLeaves(forAll, SELECTION_EMPTY)
  );
  expect(actual1).toEqual({
    root: SELECTION_EMPTY,
    a: SELECTION_EMPTY,
    b: SELECTION_EMPTY,
    a1: SELECTION_EMPTY,
    a11: SELECTION_EMPTY,
    a2: SELECTION_EMPTY,
    b1: SELECTION_EMPTY,
    b2: SELECTION_EMPTY,
    b3: SELECTION_EMPTY,
    b11: SELECTION_EMPTY,
    b111: SELECTION_EMPTY,
  });

  const actual2 = selectAllLeaves(
    forAll,
    SELECTION_FULL,
    selectAllLeaves(forAll, SELECTION_FULL, actual1)
  );
  expect(actual2).toEqual(initialSelection);
});

test('setting selection of a set of leaves works', () => {
  const predicate = id => id == 'a2' || id == 'b3';
  const actual1 = selectAllLeaves(predicate, SELECTION_EMPTY);
  expect(actual1).toEqual({
    root: SELECTION_PARTIAL,
    a: SELECTION_PARTIAL,
    b: SELECTION_PARTIAL,
    a1: SELECTION_FULL,
    a11: SELECTION_FULL,
    a2: SELECTION_EMPTY,
    b1: SELECTION_FULL,
    b2: SELECTION_FULL,
    b3: SELECTION_EMPTY,
    b11: SELECTION_FULL,
    b111: SELECTION_FULL,
  });

  const actual2 = selectAllLeaves(predicate, SELECTION_FULL, actual1);
  expect(actual2).toEqual(initialSelection);
});

test('setting selection of a set of leaves is idempotent', () => {
  const predicate = id => id == 'a2' || id == 'b3';
  const actual1 = selectAllLeaves(
    predicate,
    SELECTION_EMPTY,
    selectAllLeaves(predicate, SELECTION_EMPTY)
  );
  expect(actual1).toEqual({
    root: SELECTION_PARTIAL,
    a: SELECTION_PARTIAL,
    b: SELECTION_PARTIAL,
    a1: SELECTION_FULL,
    a11: SELECTION_FULL,
    a2: SELECTION_EMPTY,
    b1: SELECTION_FULL,
    b2: SELECTION_FULL,
    b3: SELECTION_EMPTY,
    b11: SELECTION_FULL,
    b111: SELECTION_FULL,
  });

  const actual2 = selectAllLeaves(
    predicate,
    SELECTION_FULL,
    selectAllLeaves(predicate, SELECTION_FULL, actual1)
  );
  expect(actual2).toEqual(initialSelection);
});

test('Pre-human description for everything and nothing works', () => {
  const actual1 = treeSelector.describe(initialSelection, hierarchy);
  expect(actual1).toEqual('Everything');

  const actual2 = treeSelector.describe(
    {
      root: SELECTION_EMPTY,
      a: SELECTION_EMPTY,
      a1: SELECTION_EMPTY,
      a11: SELECTION_EMPTY,
      a2: SELECTION_EMPTY,
      b: SELECTION_EMPTY,
      b1: SELECTION_EMPTY,
      b2: SELECTION_EMPTY,
      b3: SELECTION_EMPTY,
      b11: SELECTION_EMPTY,
      b111: SELECTION_EMPTY,
    },
    hierarchy
  );
  expect(actual2).toEqual('Nothing');
});

test('Pre-human description for deep selection works', () => {
  const actual1 = treeSelector.describe(
    {
      root: SELECTION_PARTIAL,
      a: SELECTION_FULL,
      a1: SELECTION_FULL,
      a11: SELECTION_FULL,
      a2: SELECTION_FULL,
      b: SELECTION_PARTIAL,
      b1: SELECTION_EMPTY,
      b11: SELECTION_EMPTY,
      b111: SELECTION_EMPTY,
      b2: SELECTION_FULL,
      b3: SELECTION_FULL,
    },
    hierarchy
  );
  expect(actual1).toEqual(['Everything', 'except', ['B1']]);

  const actual2 = treeSelector.describe(
    {
      root: SELECTION_PARTIAL,
      a: SELECTION_FULL,
      a1: SELECTION_FULL,
      a11: SELECTION_FULL,
      a2: SELECTION_FULL,
      b: SELECTION_PARTIAL,
      b1: SELECTION_EMPTY,
      b11: SELECTION_EMPTY,
      b111: SELECTION_EMPTY,
      b2: SELECTION_EMPTY,
      b3: SELECTION_FULL,
    },
    hierarchy
  );
  expect(actual2).toEqual(['Everything', 'except', ['B', 'except', ['B3']]]);
});

test('Retrieving selected IDs for everything and nothing works', () => {
  const actual1 = treeSelector.selectedIds(initialSelection, hierarchy);
  expect(actual1).toEqual([]);

  const actual2 = treeSelector.selectedIds(
    {
      root: SELECTION_EMPTY,
      a: SELECTION_EMPTY,
      a1: SELECTION_EMPTY,
      a11: SELECTION_EMPTY,
      a2: SELECTION_EMPTY,
      b: SELECTION_EMPTY,
      b1: SELECTION_EMPTY,
      b2: SELECTION_EMPTY,
      b3: SELECTION_EMPTY,
      b11: SELECTION_EMPTY,
      b111: SELECTION_EMPTY,
    },
    hierarchy
  );
  expect(actual2).toEqual(null);
});

test('Retrieving selected IDs for a mixed selection works', () => {
  const actual1 = treeSelector.selectedIds(
    {
      root: SELECTION_PARTIAL,
      a: SELECTION_FULL,
      a1: SELECTION_FULL,
      a11: SELECTION_FULL,
      a2: SELECTION_FULL,
      b: SELECTION_PARTIAL,
      b1: SELECTION_EMPTY,
      b11: SELECTION_EMPTY,
      b111: SELECTION_EMPTY,
      b2: SELECTION_FULL,
      b3: SELECTION_FULL,
    },
    hierarchy
  );
  expect(new Set(actual1)).toEqual(new Set(['a', 'b2', 'b3']));

  const actual2 = treeSelector.selectedIds(
    {
      root: SELECTION_PARTIAL,
      a: SELECTION_FULL,
      a1: SELECTION_FULL,
      a11: SELECTION_FULL,
      a2: SELECTION_FULL,
      b: SELECTION_PARTIAL,
      b1: SELECTION_EMPTY,
      b11: SELECTION_EMPTY,
      b111: SELECTION_EMPTY,
      b2: SELECTION_EMPTY,
      b3: SELECTION_FULL,
    },
    hierarchy
  );
  expect(new Set(actual2)).toEqual(new Set(['a', 'b3']));
});
