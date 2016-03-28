import React from 'react';
import { Row, ActionButton } from '../../src/components/List';
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

  describe("Action Button", () => {
    let shallowWrapper, hasBeenClicked = false;
    const onClick = () => { hasBeenClicked = true; }, icon = "fa fa-plus", className = "some-class other-class";
    beforeEach(() => {
       hasBeenClicked = false;
       shallowWrapper = shallow(<ActionButton icon={icon} className={className} onClick={onClick} />);
    });

    it("should append icon and className together", () => {
      equal(shallowWrapper.find('span').prop('className'), `${icon} ${className}`);
    });

    it("should have onClick prop registered", () => {
      shallowWrapper.simulate('click');
      equal(hasBeenClicked, true);
    });
  });
});
