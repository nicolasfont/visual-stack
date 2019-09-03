import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import {
  InternalSlidingPanel,
  InternalToggleIcon,
  InternalSlidingPanelDropdown,
  slidingPanelStateToProps,
  slidingPanelDropdownStateToProps,
} from '../../src/components/SlidingPanel';
import {
  SlidingPanel,
  SlidingPanelHeader,
  SlidingPanelDropdown,
} from '@cjdev/visual-stack/lib/components/SlidingPanel';

import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('SlidingPanel', () => {
  describe('SlidingPanel', () => {
    test('should render VisualStack SlidingPanel default active false', () => {
      const wrapper = shallow(<InternalSlidingPanel />);
      expect(wrapper.find(SlidingPanel).prop('active')).toBe.false;
    });

    test('should render VisualStack SlidingPanel passing on active prop', () => {
      const wrapper = shallow(<InternalSlidingPanel active={true} />);
      expect(wrapper.find(SlidingPanel).prop('active')).toBe.true;
    });

    test('should propagate children to VisualStack SlidingPanel', () => {
      const wrapper = shallow(
        <InternalSlidingPanel active={true}>
          <SlidingPanelHeader />
        </InternalSlidingPanel>
      );
      expect(wrapper.find(SlidingPanelHeader)).toHaveLength(1);
    });

    test('slidingPanelStateToProps should use initialActive when no state is passed', () => {
      // given
      const state = { visualStack: { slidingPanel: { active: undefined } } };
      const props = { initialActive: true };

      // when
      const calculatedProps = slidingPanelStateToProps(state, props);
      // then
      expect(calculatedProps).toMatchObject({
        active: true,
        syncStateToOpen: true,
      });
    });

    test('slidingPanelStateToProps should use its own state when not undefined', () => {
      // given
      const state = { visualStack: { slidingPanel: { active: false } } };
      const props = { initialActive: true };

      // when
      const calculatedProps = slidingPanelStateToProps(state, props);
      // then
      expect(calculatedProps).toMatchObject({
        active: false,
        syncStateToOpen: false,
      });
    });

    test('slidingPanelStateToProps should not syncstateToOpen when initialActive falsy', () => {
      // given
      const state = { visualStack: { slidingPanel: { active: undefined } } };
      const props = { initialActive: false };

      // when
      const calculatedProps = slidingPanelStateToProps(state, props);
      // then
      expect(calculatedProps).toMatchObject({
        active: false,
        syncStateToOpen: false,
      });
    });
  });

  describe('ToggleIcon', () => {
    test('should render VisualStack ToggleIcon', () => {
      const wrapper = mount(<InternalToggleIcon />);
      expect(wrapper.find('.vs-sliding-panel-toggle-icon')).toHaveLength(1);
    });
    test('should provide onClick to VisualStack ToggleIcon', () => {
      const handleToggleSlidingPanel = sinon.spy();
      const wrapper = mount(
        <InternalToggleIcon toggleSlidingPanel={handleToggleSlidingPanel} />
      );
      wrapper.find('.vs-sliding-panel-toggle-icon').simulate('click');
      expect(handleToggleSlidingPanel).toHaveProperty('callCount');
    });
  });

  describe('SlidingPanelDropdown', () => {
    test('should render VisualStack SlidingPanelDropdown with label', () => {
      const title = 'My CIDs';
      const slidingPanel = shallow(
        <InternalSlidingPanel>
          <InternalSlidingPanelDropdown label={title} id="test_dropdown" />
        </InternalSlidingPanel>
      );
      const dropdown = slidingPanel.find(InternalSlidingPanelDropdown);
      expect(dropdown).toHaveLength(1);
      expect(dropdown.props().label).toBe(title);
    });

    test('should call expandFilterDropdown when syncStateToOpen is truthy', () => {
      const expandFilterDropdown = jest.fn();
      const slidingPanel = mount(
        <InternalSlidingPanelDropdown
          label="MyCids"
          id="test_dropdown"
          syncStateToOpen
          expandFilterDropdown={expandFilterDropdown}
        >
          <div>Something</div>
        </InternalSlidingPanelDropdown>
      );
      const dropdown = slidingPanel.find(SlidingPanelDropdown);
      dropdown
        .find('a.vs-sliding-panel-section-container-label')
        .simulate('click');
      expect(
        dropdown.find('div.vs-sliding-panel-section-options')
      ).toHaveLength(1);
      expect(expandFilterDropdown.mock.calls).toHaveLength(1);
    });

    test('slidingPanelDropdownStateToProps should use own state if not undefined', () => {
      // given
      const state = {
        visualStack: { slidingPanel: { foo: { expanded: false } } },
      };
      const props = { initialActive: true, id: 'foo' };

      // when
      const calculatedProps = slidingPanelDropdownStateToProps(state, props);
      // then
      expect(calculatedProps).toMatchObject({
        expanded: false,
        syncStateToOpen: false,
      });
    });

    test('slidingPanelDropdownStateToProps should use initalActive if state is undefined', () => {
      // given
      const state = { visualStack: { slidingPanel: {} } };
      const props = { initialActive: 'bar', id: 'foo' };

      // when
      const calculatedProps = slidingPanelDropdownStateToProps(state, props);
      // then
      expect(calculatedProps).toMatchObject({
        expanded: 'bar',
        syncStateToOpen: true,
      });
    });

    test('slidingPanelDropdownStateToProps should not syncStateToOpen when it has state', () => {
      // given
      const state = {
        visualStack: { slidingPanel: { foo: { expanded: 'baz' } } },
      };
      const props = { initialActive: true, id: 'foo' };

      // when
      const calculatedProps = slidingPanelDropdownStateToProps(state, props);
      // then
      expect(calculatedProps).toMatchObject({
        expanded: 'baz',
        syncStateToOpen: false,
      });
    });
  });
});
