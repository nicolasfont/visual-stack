import React from 'react';
import Enzyme, { shallow } from 'enzyme';

import * as uut from '../index';

import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const getStyles = () => {
  // Returns an ES6 Proxy that pretends to have a value for any prop you give it
  return new Proxy(
    {},
    {
      get(_, prop) {
        return prop;
      },
    }
  );
};

describe('ButtonWithDropDown', () => {
  test('expanded works', () => {
    const expanded = shallow(
      <uut.ButtonWithDropdown
        expanded={true}
        styles={getStyles()}
        buttonContent=""
      />
    );
    expect(expanded.find('.vs-dropdown.vs-visible')).toHaveLength(1);

    const collapsed = shallow(
      <uut.ButtonWithDropdown
        expanded={false}
        styles={getStyles()}
        buttonContent=""
      />
    );
    expect(collapsed.find('.vs-dropdown.vs-visible')).toHaveLength(0);
    expect(collapsed.find('.vs-dropdown')).toHaveLength(1);
  });

  test('button wired correctly', () => {
    const doExpand = () => {};
    const component = shallow(
      <uut.ButtonWithDropdown
        expanded={true}
        doExpand={doExpand}
        buttonContent="hi"
        className="newClass"
        id="id"
        styles={getStyles()}
      >
        <div id="target" />
      </uut.ButtonWithDropdown>
    );

    expect(
      component
        .find('button')
        .text()
        .slice(0, 2)
    ).toEqual('hi');
    expect(component.find('button').prop('onClick')).toEqual(doExpand);
    expect(component.find('button').prop('className')).toEqual('newClass');
    expect(component.find('button').prop('id')).toEqual('id');
    expect(component.find('.vs-dropdown #target')).toHaveLength(1);
  });

  test('uses ButtonComponent prop', () => {
    const doExpand = () => {};
    const ButtonComponent = _props => <div id="button" />;
    const component = shallow(
      <uut.ButtonWithDropdown
        expanded={true}
        doExpand={doExpand}
        buttonContent="hi"
        className="newClass"
        id="id"
        styles={getStyles()}
        ButtonComponent={ButtonComponent}
      >
        <div id="target" />
      </uut.ButtonWithDropdown>
    );

    const button = component.find(ButtonComponent);
    expect(button).toHaveLength(1);
    expect(button.prop('expanded')).toEqual(true);
  });
});
