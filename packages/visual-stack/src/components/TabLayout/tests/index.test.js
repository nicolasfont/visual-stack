import React from 'react';
import R from 'ramda';
import { mount } from 'enzyme';
import { TabLayout, Tab } from '../';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
Enzyme.configure({ adapter: new Adapter() });

describe('TabLayout', () => {
  const el = document.createElement('div');
  document.body.appendChild(el);

  const options = { attachTo: el };

  describe('functionaltesty', () => {
    test('should render', () => {
      const wrapper = mount(
        <TabLayout/>
      );
      expect(wrapper.find(TabLayout).length).toEqual(1);
    });

    test('should render tab header', () => {
      const wrapper = mount(
        <TabLayout/>
      );
      expect(wrapper.find('.vs-tab-header').length).toEqual(1);
    });

    test('should render child tabs', () => {
      const wrapper = mount(
        <TabLayout tabLayoutId={'tabLayout1'}>
          <Tab label={<div>Tab1</div>} content={<div>Tab Content 1</div>}/>
          <Tab label={<div>Tab2</div>} content={<div>Tab Content 2</div>}/>
          <Tab label={<div>Tab3</div>} content={<div>Tab Content 3</div>}/>
        </TabLayout>
      );
      expect(wrapper.find(TabLayout).length).toEqual(1);
      expect(wrapper.find('.vs-tab-label').length).toEqual(3);
      expect(R.map(label => label.text(), wrapper.find('.vs-tab-label'))).toEqual(['Tab1', 'Tab2', 'Tab3']);
      expect(wrapper.find('.vs-tab-body').children().length).toEqual(3);
      expect(R.map(content => content.text(), wrapper.find('.vs-tab-body').children())).toEqual(['Tab Content 1', 'Tab Content 2', 'Tab Content 3']);
    });

    test('should only show content for selected tab', () => {
      const wrapper = mount(
        <TabLayout tabLayoutId={'tabLayout1'} selectedIndex={0}>
          <Tab label={<div>Tab1</div>} content={<div>Tab Content 1</div>}/>
          <Tab label={<div>Tab2</div>} content={<div>Tab Content 2</div>}/>
          <Tab label={<div>Tab3</div>} content={<div>Tab Content 3</div>}/>
        </TabLayout>
      );
      expect(R.map(content => content.props().hidden, wrapper.find('.vs-tab-body').children())).toEqual([false, true, true]);
    });

    test('should call selectTab when tab clicked', () => {
      let clicks = 0;
      let clicksIndex = [];
      const mockSelectTab = (event, index) => {
        clicks += 1;
        clicksIndex = R.concat(clicksIndex, index);
      };
      const wrapper = mount(
        <TabLayout tabLayoutId={'tabLayout1'} selectedIndex={0} selectTab={mockSelectTab}>
          <Tab label={<div>Tab</div>} content={<div>Tab Content</div>}/>
        </TabLayout>
      );
      const tabLabel = wrapper.find('.vs-tab-label').at(0);
      tabLabel.simulate('click');
      expect(clicks).toEqual(1);
      expect(clicksIndex.length).toEqual(1);
      expect(clicksIndex[0]).toEqual(0);
    });

    test('should not call selectTab if tab is disabled', () => {
      let clicks = 0;
      let clicksIndex = [];
      const mockSelectTab = (event, index) => {
        clicks += 1;
        clicksIndex = R.concat(clicksIndex, index);
      };
      const wrapper = mount(
        <TabLayout tabLayoutId={'tabLayout1'} selectedIndex={0} selectTab={mockSelectTab}>
          <Tab label={<div>Tab</div>} content={<div>Tab Content</div>} disabled={true}/>
        </TabLayout>
      );
      const tabLabel = wrapper.find('.vs-tab-label').at(0);
      tabLabel.simulate('click');
      expect(clicks).toEqual(0);
      expect(clicksIndex.length).toEqual(0);
    });

    test('should call onTabClick when tab clicked and function exists', () => {
      let clicks = 0;
      const mockOnTabClick = () => {
        clicks += 1;
      };
      const wrapper = mount(
        <TabLayout tabLayoutId={'tabLayout1'} selectedIndex={0} onTabClick={mockOnTabClick} selectTab={() => {}}>
          <Tab label={<div>Tab</div>} content={<div>Tab Content</div>}/>
        </TabLayout>
      );
      const tabLabel = wrapper.find('.vs-tab-label').at(0);
      tabLabel.simulate('click');
      expect(clicks).toEqual(1);
    });

    test('should not call onTabClick if tab disabled', () => {
      let clicks = 0;
      const mockOnTabClick = () => {
        clicks += 1;
      };
      const wrapper = mount(
        <TabLayout tabLayoutId={'tabLayout1'} selectedIndex={0} onTabClick={mockOnTabClick} selectTab={() => {}}>
          <Tab label={<div>Tab</div>} content={<div>Tab Content</div>} disabled={true}/>
        </TabLayout>
      );
      const tabLabel = wrapper.find('.vs-tab-label').at(0);
      tabLabel.simulate('click');
      expect(clicks).toEqual(0);
    });
  });

  describe('styling', () => {
    test('should render tab underline with theme color when tab selected', () => {
      const wrapper = mount(
        <TabLayout tabLayoutId={'tabLayout1'} selectedIndex={0}>
          <Tab label={<div>Tab1</div>} content={<div>Tab Content 1</div>}/>
          <Tab label={<div>Tab2</div>} content={<div>Tab Content 2</div>}/>
        </TabLayout>
      );

      const tabLabelClicked = wrapper.find('.vs-tab-label.vs-tab-label-clicked');
      const tabLabelContent = tabLabelClicked.at(0);
      const tabLabelContentWrapper = tabLabelContent.children().at(0);
      expect(tabLabelContentWrapper.props().style).toEqual({ borderBottom: '4px solid #49c5b1' });

      const tabLabelInactive = wrapper.find('.vs-tab-label');
      const tabLabelContentInactive = tabLabelInactive.at(1);
      const tabLabelContentWrapperInactive = tabLabelContentInactive.children().at(0);
      expect(tabLabelContentWrapperInactive.props().style).toEqual({ });
    });

    test('should highlight text on hover', () => {
      const wrapper = mount(
        <TabLayout tabLayoutId={'tabLayout1'} selectedIndex={0}>
          <Tab label={<div>Tab1</div>} content={<div>Tab Content 1</div>} />
          <Tab label={<div>Tab2</div>} content={<div>Tab Content 2</div>} />
        </TabLayout>,
      );

      const tabLabels = wrapper.find('.vs-tab-label');
      let tabLabelInactive = tabLabels.at(1);

      tabLabelInactive = tabLabelInactive.simulate('mouseover');
      tabLabelInactive.update();

      expect(wrapper.find('.vs-tab-label').at(1).props().style).toEqual({ color: '#49c5b1', cursor: 'pointer' });

      tabLabelInactive.simulate('mouseleave');
      expect(tabLabelInactive.props().style).toEqual({ color: '#888' });
    });

    test('should take custom accent color', () => {
      const themeColor = 'grey';

      const wrapper = mount(
        <TabLayout tabLayoutId={'tabLayout1'} selectedIndex={0} themeColor={themeColor}>
          <Tab label={<div>Tab1</div>} content={<div>Tab Content 1</div>}/>
          <Tab label={<div>Tab2</div>} content={<div>Tab Content 2</div>}/>
        </TabLayout>
      );

      const tabLabelInactive = wrapper.find('.vs-tab-label').at(1);
      tabLabelInactive.simulate('mouseOver');
      expect(wrapper.find('.vs-tab-label').at(1).props().style).toEqual({ color: themeColor, cursor: 'pointer' });
    });

    test('should not apply hover styling on selected tab', () => {
      const wrapper = mount(
        <TabLayout tabLayoutId={'tabLayout1'} selectedIndex={0}>
          <Tab label={<div>Tab1</div>} content={<div>Tab Content 1</div>}/>
          <Tab label={<div>Tab2</div>} content={<div>Tab Content 2</div>}/>
        </TabLayout>
      );

      const tabLabels = wrapper.find('.vs-tab-label');
      const tabLabelInactive = tabLabels.at(0);
      tabLabelInactive.simulate('mouseOver');
      expect(tabLabelInactive.props().style).toEqual({ });
    });

    test('should apply disabled class to disabled tab', () => {
      const wrapper = mount(
        <TabLayout tabLayoutId={'tabLayout1'} selectedIndex={0}>
          <Tab label={<div>Tab1</div>} content={<div>Tab Content 1</div>} disabled={true}/>
        </TabLayout>
      );
      const tabLabels = wrapper.find('.vs-tab-label.vs-tab-label-disabled');
      expect(tabLabels.length).toEqual(1);
    });

    test('should apply styles for floating header', () => {
      const headerHeight = '10px';
      const headerWidth = '100px';
      const wrapper = mount(
        <TabLayout tabLayoutId={'tabLayout1'} selectedIndex={0} floatingHeader={true} headerHeight={headerHeight} headerWidth={headerWidth}>
          <Tab label={<div>Tab1</div>} content={<div>Tab Content 1</div>} disabled={true}/>
        </TabLayout>
      );

      const floatingHeader = wrapper.find('.vs-tab-header.vs-tab-header-floating');
      const tabBody = wrapper.find('.vs-tab-body');

      expect(floatingHeader.length).toEqual(1);
      expect(floatingHeader.at(0).props().style.width).toEqual(headerWidth);
      expect(tabBody.at(0).props().style.paddingTop).toEqual(headerHeight);
    });
  });
});
