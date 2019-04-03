import React from 'react';
import { CollapsiblePanel } from '../CollapsiblePanel';
import { shallow } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('CollapsiblePanel', () => {
  let shallowWrapper;

  describe('when initially collapsed', () => {
    beforeEach(() => {
      shallowWrapper = shallow(
        <CollapsiblePanel>
          <div id="test-marker">I am some content</div>
        </CollapsiblePanel>
      );
    });

    test('should not initially show content', () => {
      expect(shallowWrapper.find('div#test-marker').length).toBe(0);
    });

    test('should toggle content when button is clicked', () => {
      const headerButton = shallowWrapper.find(
        '.vs-collapsible-panel-header-button'
      );
      headerButton.simulate('click');
      expect(shallowWrapper.find('div#test-marker').length).toBe(1);
      headerButton.simulate('click');
      expect(shallowWrapper.find('div#test-marker').length).toBe(0);
    });
  });

  describe('when not initially collapsed', () => {
    beforeEach(() => {
      shallowWrapper = shallow(
        <CollapsiblePanel initializedCollapsed={false}>
          <div id="test-marker">I am some content</div>
        </CollapsiblePanel>
      );
    });

    test('should initially show the content', () => {
      expect(shallowWrapper.find('div#test-marker').length).toBe(1);
    });
  });
});
