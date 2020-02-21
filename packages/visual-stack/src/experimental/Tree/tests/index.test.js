import React from 'react';
import { Tree } from '../index';
import { TreeSelector } from '../tree-selector';
import Enzyme, { mount, render } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import { TriStateCheckbox } from '../../TriStateCheckbox';

Enzyme.configure({ adapter: new Adapter() });

/*
root
  +- a
  +- b
*/

const treeSelector = new TreeSelector({
  parent: id =>
    ({
      a: 'root',
      b: 'root',
    }[id]),
  children: id =>
    ({
      root: ['a', 'b'],
    }[id]),
  name: id =>
    ({
      root: 'Root',
      a: 'Node A',
      b: 'Node B',
    }[id]),
});

describe('Tree', () => {
  it('should render all content', () => {
    const wrapper = render(
      <Tree
        treeStructure={treeSelector}
        rootVisible={false}
        selection={treeSelector.createMap(_ => 1)}
        expansion={treeSelector.createMap(id => id === 'root')}
      />
    );
    expect(wrapper.find('.vs-leafContent').text()).toEqual('Node ANode B');
  });

  it('should use the labelContent property', () => {
    const labelContent = id => `label ${id}-`;
    const wrapper = render(
      <Tree
        treeStructure={treeSelector}
        rootVisible={false}
        selection={treeSelector.createMap(_ => 1)}
        expansion={treeSelector.createMap(id => id === 'root')}
        labelContent={labelContent}
      />
    );
    expect(wrapper.find('.vs-leafContent').text()).toEqual('label a-label b-');
  });

  it('should pass the highlight property to the labelContent function', () => {
    var ok = true;
    const labelContent = (id, highlight) => {
      ok = highlight == 'test';
      return `label ${id}-`;
    };
    const wrapper = render(
      <Tree
        treeStructure={treeSelector}
        rootVisible={false}
        selection={treeSelector.createMap(_ => 1)}
        expansion={treeSelector.createMap(id => id === 'root')}
        labelContent={labelContent}
        highlight={'test'}
      />
    );
    expect(ok).toEqual(true);
  });

  it('should render checkbox content correctly', () => {
    const wrapper = mount(
      <Tree
        treeStructure={treeSelector}
        rootVisible={true}
        selection={{ root: -1, a: 1, b: 0 }}
        expansion={treeSelector.createMap(id => id === 'root')}
      />
    );
    [-1, 1, 0].forEach((value, index) =>
      expect(
        wrapper.find('TriStateCheckbox').get(index).props['value']
      ).toEqual(value)
    );
  });
});
