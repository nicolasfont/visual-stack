import React from 'react';
import { Row, ActionButton } from '../List';
import { shallow } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
Enzyme.configure({ adapter: new Adapter() });

describe('List', () => {
  describe('Row', () => {
    let shallowWrapper, hasBeenClicked;
    describe('Without expansion', () => {
      const clickMe = () => { hasBeenClicked = true; };
      beforeEach(() => {
        hasBeenClicked = false;
        shallowWrapper = shallow(<Row id="hello" onClick={clickMe}><div>Hi</div></Row>);
      });
      test('should handle an onClick function', () => {
        shallowWrapper.simulate('click');
        expect(hasBeenClicked).toBe(true);
      });
      test('should be able to find its id', () => {
        expect(shallowWrapper.prop('id')).toEqual('hello');
      });
      test('should have children', () => {
        expect(shallowWrapper.contains(<div>Hi</div>)).toBe(true);
      });
    });
    describe('With expansion', () => {
      test('should contain an ExpansionNode', () => {
        const expansion = 'I am now expanded';
        shallowWrapper = shallow(<Row expansion={expansion}><div>Hi</div></Row>);
        expect(shallowWrapper.contains(expansion)).toBe(true);
      });
    });
  });

  describe('Action Button', () => {
    let shallowWrapper, hasBeenClicked = false;
    const onClick = () => { hasBeenClicked = true; }, icon = 'fa fa-plus', className = 'some-class other-class';
    beforeEach(() => {
      hasBeenClicked = false;
      shallowWrapper = shallow(<ActionButton icon={icon} className={className} onClick={onClick} />);
    });

    test('should append icon and className together', () => {
      expect(shallowWrapper.find('span').prop('className')).toEqual(`${icon} ${className}`);
    });

    test('should have onClick prop registered', () => {
      shallowWrapper.simulate('click');
      expect(hasBeenClicked).toEqual(true);
    });
  });
});
