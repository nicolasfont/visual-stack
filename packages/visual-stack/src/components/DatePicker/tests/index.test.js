import React from 'react';
import { mount, shallow } from 'enzyme';
import { DateTime } from 'luxon';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import * as uut from '../';

Enzyme.configure({ adapter: new Adapter() });

describe('DatePicker', () => {
  test('basic functionality works', () => {
    const expectedRange = ['2019-02-02', '2019-02-04'];
    const parseDate = d => DateTime.fromFormat(d, 'yyyy-MM-dd').toJSDate();
    const expectedMinDate = new Date('2016-01-01');
    const expectedMaxDate = new Date('2020-01-01');
    let calendarSelectionReset = false;
    const resetCalendarSelection = () => {
      calendarSelectionReset = true;
    };

    let applied = false;
    const apply = () => {
      applied = true;
    };

    let selectedNamedRanges = ['custom'];
    let selectedRanges = [expectedRange];

    const wrapper = mount(
      <uut.DatePicker
        selectedRanges={selectedRanges}
        selectedNamedRanges={selectedNamedRanges}
        cancelButtonText="Cancel"
        applyButtonText="Apply"
        selectableRange={[expectedMinDate, expectedMaxDate]}
        updateCalendarRanges={v => {
          selectedRanges = v;
        }}
        updateNamedCalendarRanges={v => {
          selectedNamedRanges = v;
        }}
        onApply={apply}
        resetCalendarSelection={resetCalendarSelection}
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

    wrapper.find('DatePickerSidebar .today').simulate('click');
    expect(selectedNamedRanges).toEqual(['today']);
    wrapper.find('DatePickerSidebar .tomorrow input').simulate('change');
    expect(selectedNamedRanges).toEqual(['tomorrow']);

    expect(selectedRanges).toMatchObject([
      [
        DateTime.fromJSDate(new Date())
          .plus({ days: 1 })
          .toFormat('yyyy-MM-dd'),
        DateTime.fromJSDate(new Date())
          .plus({ days: 1 })
          .toFormat('yyyy-MM-dd'),
      ],
    ]);

    wrapper.find('button.vs-cancel-button').simulate('click');
    expect(calendarSelectionReset).toBeTruthy();

    wrapper.find('button.vs-apply-button').simulate('click');
    expect(applied).toBeTruthy();
  });

  test('computed ranges and transition from single-calendar', () => {
    const initialBaseRange = ['2019-02-02', '2019-02-04'];
    const initialComparisonRange = ['2017-04-12', '2017-04-14'];
    const expectedComparisonRange = ['2018-02-02', '2018-02-04'];

    const parseDate = d => DateTime.fromFormat(d, 'yyyy-MM-dd');
    const selectableRange = [new Date('2016-01-01'), new Date('2020-01-01')];

    let selectedNamedRanges = ['custom', 'none'];
    let selectedRanges = [initialBaseRange, initialComparisonRange];

    const wrapper = mount(
      <uut.DatePicker
        selectedRanges={selectedRanges}
        selectedNamedRanges={selectedNamedRanges}
        selectableRange={selectableRange}
        updateCalendarRanges={v => {
          selectedRanges = v;
        }}
        updateNamedCalendarRanges={v => {
          selectedNamedRanges = v;
        }}
        onApply={() => {}}
        resetCalendarSelection={() => {}}
        sidebarConfig={[
          uut.sidebarSection(
            uut.sectionTitle('Base Range'),
            uut.sectionRange('a', 'b', [])
          ),
          uut.sidebarSection(
            uut.sectionTitle('Predefined Range'),
            uut.sectionRange('last-year', 'Last Year', ([base, _]) => [
              parseDate(base[0])
                .minus({ years: 1 })
                .toFormat('yyyy-MM-dd'),
              parseDate(base[1])
                .minus({ years: 1 })
                .toFormat('yyyy-MM-dd'),
            ])
          ),
        ]}
      />
    );

    expect.assertions(3);
    expect(wrapper.find('.vs-date-pickers').children()).toHaveLength(1);

    wrapper.find('.last-year').simulate('click');

    // simulate reactive prop update, as component won't get new values by default
    wrapper.setProps({ selectedNamedRanges, selectedRanges }, () => {
      expect(wrapper.find('.vs-date-pickers').children()).toHaveLength(2);
      expect(selectedRanges).toEqual([
        initialBaseRange,
        expectedComparisonRange,
      ]);
    });
  });

  test('applying with "none" selected excludes the corresponding range', () => {
    const initialBaseRange = ['2019-02-02', '2019-02-04'];
    const initialComparisonRange = ['2017-04-12', '2017-04-14'];

    const parseDate = d => DateTime.fromFormat(d, 'yyyy-MM-dd');
    const selectableRange = [new Date('2016-01-01'), new Date('2020-01-01')];

    let selectedNamedRanges = ['custom', 'none'];
    let selectedRanges = [initialBaseRange, initialComparisonRange];

    let appliedRanges = null;
    const wrapper = mount(
      <uut.DatePicker
        selectedRanges={selectedRanges}
        selectedNamedRanges={selectedNamedRanges}
        selectableRange={selectableRange}
        updateCalendarRanges={v => {}}
        updateNamedCalendarRanges={v => {}}
        onApply={v => {
          appliedRanges = v;
        }}
        resetCalendarSelection={() => {}}
        sidebarConfig={[
          uut.sidebarSection(
            uut.sectionTitle('Base Range'),
            uut.sectionRange('a', 'b', [])
          ),
          uut.sidebarSection(
            uut.sectionTitle('Predefined Range'),
            uut.sectionRange('last-year', 'Last Year', ([base, _]) => [
              parseDate(base[0])
                .minus({ years: 1 })
                .toFormat('yyyy-MM-dd'),
              parseDate(base[1])
                .minus({ years: 1 })
                .toFormat('yyyy-MM-dd'),
            ])
          ),
        ]}
      />
    );

    expect(wrapper.find('.vs-date-pickers').children()).toHaveLength(1);
    wrapper.find('button.vs-apply-button').simulate('click');

    expect(appliedRanges).toEqual([initialBaseRange]);
  });
});
