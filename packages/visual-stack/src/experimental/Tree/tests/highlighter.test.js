import React from 'react';
import {
  compareArea,
  createHighlighter,
  makeSpans,
  simplifyAreas,
  findAll,
} from '../highlighter';

test('compareArea works', () => {
  expect(compareArea([1, 1], [1, 1])).toEqual(0);
  expect(compareArea([1, 0], [1, 1])).toBeLessThan(0);
  expect(compareArea([1, 1], [1, 0])).toBeGreaterThan(0);
  expect(compareArea([0, 1], [1, 1])).toBeLessThan(0);
  expect(compareArea([1, 1], [0, 1])).toBeGreaterThan(0);
});

test('findAll works', () => {
  expect(findAll('', 'b')).toEqual([]);
  expect(findAll('b', 'b')).toEqual([[0, 1]]);
  expect(findAll('bcb', 'b')).toEqual([[0, 1], [2, 1]]);
  expect(findAll('abc', 'b')).toEqual([[1, 1]]);
  expect(findAll('abb', 'b')).toEqual([[1, 1], [2, 1]]);
});

test('simplifyAreas works', () => {
  expect(simplifyAreas([])).toEqual([]);
  expect(simplifyAreas([[0, 1]])).toEqual([[0, 1]]);
  expect(simplifyAreas([[0, 1], [1, 1]])).toEqual([[0, 2]]);
  expect(simplifyAreas([[0, 2], [1, 3]])).toEqual([[0, 4]]);
  expect(simplifyAreas([[0, 1], [2, 1]])).toEqual([[0, 1], [2, 1]]);
  expect(simplifyAreas([[0, 1], [1, 1], [2, 1]])).toEqual([[0, 3]]);
});

test('makeSpans works', () => {
  expect(makeSpans('', [], 'highlight')).toEqual([]);
  expect(makeSpans('hello world', [[0, 5]], 'highlight')).toEqual([
    <span key="0-hello" className="highlight">
      hello
    </span>,
    <span key="1- world"> world</span>,
  ]);
  expect(makeSpans('hello beautiful world', [[6, 9]], 'highlight')).toEqual([
    <span key="0-hello ">hello </span>,
    <span key="1-beautiful" className="highlight">
      beautiful
    </span>,
    <span key="2- world"> world</span>,
  ]);
  expect(
    makeSpans('hello beautiful world', [[0, 5], [16, 5]], 'highlight')
  ).toEqual([
    <span key="0-hello" className="highlight">
      hello
    </span>,
    <span key="1- beautiful "> beautiful </span>,
    <span key="2-world" className="highlight">
      world
    </span>,
  ]);
});

const highlight = createHighlighter(
  id => ({ 1: '', 2: 'hello beautiful world' }[id]),
  'highlight',
  1
);

test('highlight works', () => {
  expect(highlight(1, '')).toEqual([<span key="0-">{''}</span>]);

  expect(highlight(2, 'hello world')).toEqual([
    <span key="0-hello" className="highlight">
      hello
    </span>,
    <span key="1- beautiful "> beautiful </span>,
    <span key="2-world" className="highlight">
      world
    </span>,
  ]);
});
