import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import {
  InternalSlidingPanel,
  InternalToggleIcon,
  InternalSlidingPanelDropdown,
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

    test('should render children when Dropdown is expanded', () => {
      const handleDropdown = sinon.spy();
      const slidingPanel = mount(
        <InternalSlidingPanelDropdown
          label="MyCids"
          toggleFilterDropdown={handleDropdown}
          id="test_dropdown"
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
      expect(handleDropdown).toHaveProperty('callCount');
    });
  });
});
