import React from 'react';
import * as R from 'ramda';

export const createHighlighter = (getName, highlightClass, sizeThreshold) => (
  nodeId,
  textToFind
) => {
  const targetText = getName(nodeId);
  const snippetArray = textToFind
    .toLowerCase()
    .split(' ')
    .filter(x => x.length >= sizeThreshold);
  if (snippetArray.length === 0)
    return [<span key={'0-' + targetText}>{targetText}</span>];
  const matchedAreas = R.chain(
    snippet => findAll(targetText.toLowerCase(), snippet),
    snippetArray
  ).sort(compareArea);
  const simplifiedAreas = simplifyAreas(matchedAreas);
  return makeSpans(targetText, simplifiedAreas, highlightClass);
};

export function makeSpans(targetText, highlightAreas, highlightClass) {
  let spans = [];
  const pushSpan = (txt, i, highlightClass) =>
    highlightClass
      ? spans.push(
          <span key={`${i}-${txt}`} className={highlightClass}>
            {txt}
          </span>
        )
      : spans.push(<span key={`${i}-${txt}`}>{txt}</span>);
  let last = 0;
  let i = 0;
  for (const [start, length] of highlightAreas) {
    if (start > last) pushSpan(targetText.substring(last, start), i++);
    last = start + length;
    pushSpan(targetText.substring(start, last), i, highlightClass);
    ++i;
  }
  if (last < targetText.length)
    pushSpan(targetText.substring(last, targetText.length), i);
  return spans;
}

export function simplifyAreas(matches) {
  let areas = [];
  let start = 0,
    length = 0;
  for (const [st, ln] of matches) {
    const overlaps = start + length >= st;
    if (length > 0 && overlaps) {
      const end = Math.max(start + length, st + ln);
      start = Math.min(start, st);
      length = end - start;
    } else {
      if (length > 0) areas.push([start, length]);
      start = st;
      length = ln;
    }
  }
  if (length > 0) areas.push([start, length]);
  return areas;
}

export function findAll(targetText, snippet) {
  let matches = [];
  let pos = targetText.indexOf(snippet, 0);
  while (pos >= 0) {
    matches.push([pos, snippet.length]);
    pos = targetText.indexOf(snippet, pos + 1);
  }
  return matches;
}

export const compareArea = ([start1, len1], [start2, len2]) =>
  start1 === start2 ? len1 - len2 : start1 - start2;
