import React from 'react';
import { mount, shallow } from 'enzyme';
import { DateTime } from 'luxon';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import * as uut from '../DatePickerButton';

Enzyme.configure({ adapter: new Adapter() });

describe('DatePicker', () => {
  test('shows all four dates when there are two multi-day ranges', () => {
    expect(
      mount(
        <uut.DateRangeDisplay
          locale="en"
          ranges={[['2018-01-01', '2018-01-03'], ['2019-03-01', '2019-06-03']]}
        />
      ).text()
    ).toMatch(/^Jan 1, 2018...Jan 3, 2018[^a-zA-Z]*Mar 1, 2019...Jun 3, 2019$/);
  });

  test('shows two dates when there are two one-day ranges', () => {
    expect(
      mount(
        <uut.DateRangeDisplay
          locale="en"
          ranges={[['2018-01-01', '2018-01-01'], ['2019-03-01', '2019-03-01']]}
        />
      ).text()
    ).toMatch(/^Jan 1, 2018[^a-zA-Z]*Mar 1, 2019$/);
  });
  test('shows both dates when there is one multi-day range', () => {
    expect(
      mount(
        <uut.DateRangeDisplay
          locale="en"
          ranges={[['2018-01-01', '2018-01-03']]}
        />
      ).text()
    ).toMatch(/^Jan 1, 2018...Jan 3, 2018$/);
  });
  test('shows one date when there is one single-day range', () => {
    expect(
      mount(
        <uut.DateRangeDisplay
          locale="en"
          ranges={[['2018-01-01', '2018-01-01']]}
        />
      ).text()
    ).toMatch(/^Jan 1, 2018$/);
  });
  test('localizes dates correctly', () => {
    expect(
      mount(
        <uut.DateRangeDisplay
          locale="de"
          ranges={[['2018-03-01', '2018-03-01']]}
        />
      ).text()
    ).toMatch(/^1. März 2018$/);
  });
});
