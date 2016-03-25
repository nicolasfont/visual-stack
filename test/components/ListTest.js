import React from 'react';
import { Row } from '../../src/components/List';
import { shallow } from 'enzyme';
import { equal, ok } from 'assert';

describe('List', () => {
  describe('Row', () => {
    let shallowWrapper, hasBeenClicked;
    describe('Without expansion', () => {
      const clickMe = () => { hasBeenClicked = true; };
      beforeEach(() => {
        hasBeenClicked = false;
        shallowWrapper = shallow(<Row id="hello" onClick={clickMe}><div>Hi</div></Row>);
      });
      it('should handle an onClick function', () => {
        shallowWrapper.simulate('click');
        ok(hasBeenClicked);
      });
      it('should be able to find its id', () => {
        equal('hello', shallowWrapper.prop('id'));
      });
      it('should have children', () => {
        ok(shallowWrapper.contains(<div>Hi</div>));
      });
    });
    describe('With expansion', () => {
      it('should contain an ExpansionNode', () => {
        const expansion = 'I am now expanded';
        shallowWrapper = shallow(<Row expansion={expansion}><div>Hi</div></Row>);
        ok(shallowWrapper.contains(expansion));
      });
    });
  });
});
