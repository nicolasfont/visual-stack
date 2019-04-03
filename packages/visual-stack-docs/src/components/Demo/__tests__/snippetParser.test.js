/* eslint-env jest */
import { parse, trimLeadingWhiteSpace } from '../snippetParser.js';

describe('trimLeadingWhiteSpace', () => {
  it('returns the same array when line with no whitespace', () => {
    const input = ['    123', '234', ' 345', '  456'];
    expect(trimLeadingWhiteSpace(input)).toEqual(input);
  });

  it('returns a shortened array when non-zero whitespace ', () => {
    const input = ['      123', '  234', '   345', '    456'];
    const expectedOutput = ['    123', '234', ' 345', '  456'];
    expect(trimLeadingWhiteSpace(input)).toEqual(expectedOutput);
  });
});

describe('parse', () => {
  it('returns empty when given empty', () => {
    expect(parse()).toEqual({});
    expect(parse('')).toEqual({});
  });

  it('returns object with tag as key and contained lines', () => {
    const input = [
      'whatever',
      's1:start',
      'this should be included 1',
      'this should be included 2',
      's1:end',
      'whatever',
    ].join('\n');

    const output = parse(input);
    expect(output.s1).toBeDefined();
    expect(output.s1).toHaveLength(2);
    expect(output.s1).toContain('this should be included 1');
    expect(output.s1).toContain('this should be included 2');
  });

  it('should throw if 2nd start before first end', () => {
    const input = [
      'whatever',
      's1:start',
      'this should be included 1',
      's2:start',
      'this should be included 2',
      's1:end',
      'whatever',
    ].join('\n');

    expect(() => {
      parse(input);
    }).toThrow('Invalid');
  });

  it('should throw if end does not match start', () => {
    const input = [
      'whatever',
      's1:start',
      'this should be included 1',
      'this should be included 2',
      's2:end',
      'whatever',
    ].join('\n');

    expect(() => {
      parse(input);
    }).toThrow('Invalid');
  });

  it('should throw if start does not have matching end', () => {
    const input = [
      'whatever',
      's1:start',
      'this should be included 1',
      'this should be included 2',
      // 's2:end',
      'whatever',
    ].join('\n');

    expect(() => {
      parse(input);
    }).toThrow('Invalid');
  });

  it('should throw if end does not have a start', () => {
    const input = [
      'whatever',
      // 's1:start',
      'this should be included 1',
      'this should be included 2',
      's2:end',
      'whatever',
    ].join('\n');

    expect(() => {
      parse(input);
    }).toThrow('Invalid');
  });

  it('should throw if tag is not unique', () => {
    const input = [
      'whatever',
      's1:start',
      'this should be included 1',
      's1:end',
      's1:start',
      'this should be included 1',
      's1:end',
      'whatever',
    ].join('\n');

    expect(() => {
      parse(input);
    }).toThrow('Duplicate Tag: s1');
  });
});
