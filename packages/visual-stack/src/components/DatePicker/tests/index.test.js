import React from 'react';
import { mount, shallow } from 'enzyme';
import { DateTime } from 'luxon';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import * as uut from '../';

Enzyme.configure({ adapter: new Adapter() });

describe('DatePicker', () => {
  const expectedRange = ['2019-02-02', '2019-02-04'];
  const parseDate = d => DateTime.fromFormat(d, 'yyyy-MM-dd').toJSDate();
  const expectedMinDate = new Date('2016-01-01');
  const expectedMaxDate = new Date('2020-01-01');
  test('works', () => {
    const wrapper = mount(
      <uut.DatePicker
        selectedRanges={[expectedRange]}
        selectedSidebarRanges={['custom']}
        cancelButtonText="Cancel"
        applyButtonText="Apply"
        selectableRange={[expectedMinDate, expectedMaxDate]}
        onCalendarRangeSelect={() => {}}
        onSidebarRangeSelect={() => {}}
        onApply={() => {}}
        onCancel={() => {}}
        sidebarConfig={[
          uut.sidebarSection(
            uut.sectionTitle('Predefined Range'),
            uut.sectionRange('today', 'Today', [
              DateTime.fromJSDate(new Date()).toFormat('yyyy-MM-dd'),
              DateTime.fromJSDate(new Date()).toFormat('yyyy-MM-dd'),
            ]),
            uut.sectionRange('tomorrow', 'Tomorrow', [
              DateTime.fromJSDate(new Date())
                .plus({ days: 1 })
                .toFormat('yyyy-MM-dd'),
              DateTime.fromJSDate(new Date())
                .plus({ days: 1 })
                .toFormat('yyyy-MM-dd'),
            ]),
            uut.sectionRange('custom', 'Custom', null)
          ),
        ]}
      />
    );
    expect(wrapper.find('DatePickerSidebar h4').text()).toEqual(
      'Predefined Range'
    );
    expect(wrapper.find('DatePickerSidebar li').map(v => v.text())).toEqual([
      'Today',
      'Tomorrow',
      'Custom',
    ]);
    expect(wrapper.find('button.vs-apply-button').text()).toEqual('Apply');
    expect(wrapper.find('button.vs-cancel-button').text()).toEqual('Cancel');
    expect(
      wrapper.find('DatePickerSidebar .custom input').prop('checked')
    ).toBeTruthy();
    expect(wrapper.find('DateRange').props()).toMatchObject({
      minDate: expectedMinDate,
      maxDate: expectedMaxDate,
      ranges: [
        expect.objectContaining({
          startDate: parseDate(expectedRange[0]),
          endDate: parseDate(expectedRange[1]),
          range1: expectedRange,
        }),
      ],
    });
  });
});
