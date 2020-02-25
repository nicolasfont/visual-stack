import { createFilter } from '../filter';
import { TreeSelector } from '../tree-selector';

const treeSelector = new TreeSelector({
  rootId: () => 'root',
  parent: nodeId =>
    ({
      a1: 'root',
      a2: 'root',
      a11: 'a1',
      a12: 'a1',
      a111: 'a11',
      a112: 'a11',
      a113: 'a11',
      a21: 'a2',
      a22: 'a2',
    }[nodeId]),
  children: nodeId =>
    ({
      root: ['a1', 'a2'],
      a1: ['a11', 'a12'],
      a2: ['a21', 'a22'],
      a11: ['a111', 'a112', 'a113'],
    }[nodeId]),
  name: nodeId =>
    ({
      root: 'root',
      a1: 'aaa',
      a2: 'bbb',
      a11: 'aaa ccc',
      a12: 'aaa ddd',
      a21: 'eee fff jjj',
      a22: 'ggg xxx yyy',
      a111: 'hhh',
      a112: 'iii',
      a113: 'jjj',
    }[nodeId]),
});
const filter = createFilter(treeSelector, 3);

/*
root -> root
  + a1 -> aaa
    + a11 -> aaa ccc
      + a111 -> hhh
      + a112 -> iii
      + a113 -> jjj
    + a12 -> aaa ddd
  + a2 -> bbb
    + a21 -> eee fff jjj
    + a22 -> ggg xxx yyy
 */

test('Matches leaf node', () => {
  const [filteredOut, expanded] = filter('ggg');
  expect(filteredOut).toHaveProperty('a1', true);
  expect(filteredOut).toHaveProperty('a21', true);
  expect(filteredOut).not.toHaveProperty('root', true);
  expect(filteredOut).not.toHaveProperty('a2', true);
  expect(filteredOut).not.toHaveProperty('a22', true);
  expect(expanded).toHaveProperty('root', true);
  expect(expanded).toHaveProperty('a2', true);
});

test('Matches non-leaf node', () => {
  const [filteredOut, expanded] = filter('bbb');
  expect(filteredOut).toHaveProperty('a1', true);
  expect(filteredOut).not.toHaveProperty('root', true);
  expect(filteredOut).not.toHaveProperty('a2', true);
  expect(expanded).toHaveProperty('root', true);
  expect(expanded).toHaveProperty('a2', false);
});

test('Matches at non-leaf and leaf node', () => {
  const [filteredOut, expanded] = filter('aaa');
  expect(filteredOut).toHaveProperty('a2', true);
  expect(filteredOut).not.toHaveProperty('root', true);
  expect(filteredOut).not.toHaveProperty('a1', true);
  expect(filteredOut).not.toHaveProperty('a11', true);
  expect(expanded).toHaveProperty('root', true);
  expect(expanded).toHaveProperty('a1', true);
  expect(expanded).toHaveProperty('a11', false);
});

test('Matches in multiple branches', () => {
  const [filteredOut, expanded] = filter('jjj');
  expect(filteredOut).toHaveProperty('a111', true);
  expect(filteredOut).toHaveProperty('a112', true);
  expect(filteredOut).toHaveProperty('a22', true);
  expect(filteredOut).not.toHaveProperty('root', true);
  expect(filteredOut).not.toHaveProperty('a1', true);
  expect(filteredOut).not.toHaveProperty('a11', true);
  expect(filteredOut).not.toHaveProperty('a113', true);
  expect(filteredOut).not.toHaveProperty('a2', true);
  expect(filteredOut).not.toHaveProperty('a21', true);
  expect(expanded).toHaveProperty('root', true);
  expect(expanded).toHaveProperty('a1', true);
  expect(expanded).toHaveProperty('a11', true);
  expect(expanded).toHaveProperty('a2', true);
});

test('Matches multiple snippets of text', () => {
  const [filteredOut, expanded] = filter('eee ggg');
  expect(filteredOut).toHaveProperty('a1', true);
  expect(filteredOut).not.toHaveProperty('root', true);
  expect(filteredOut).not.toHaveProperty('a2', true);
  expect(filteredOut).not.toHaveProperty('a21', true);
  expect(filteredOut).not.toHaveProperty('a22', true);
  expect(expanded).toHaveProperty('root', true);
  expect(expanded).toHaveProperty('a2', true);
});
