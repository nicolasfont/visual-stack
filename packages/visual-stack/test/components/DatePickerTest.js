import DatePicker from '../../src/components/DatePicker/DatePicker';
import React from 'react';
import { equal } from 'assert';
import { mount } from 'enzyme';

describe("DatePicker", () => {
    it("should render button with formatted date", () => {
        // Given
        const wrapper = mount(<DatePicker startDate={new Date("2019-01-01T00:00:00+00:00")} endDate={new Date("2020-01-01T00:00:00+00:00")}/>);

        // When
        const vsDropPicker = wrapper.find('#vs-date-picker-dropdown').props().children[0].props.children;

        // Then
        equal(vsDropPicker, "Jan 01, 2019\u00a0\u2013\u00a0Jan 01, 2020");
    });
});
