import DatePicker from '../../src/components/DatePicker/DatePicker';
import React from 'react';
import {equal, fail} from 'assert';
import {mount} from 'enzyme';
import * as R from 'ramda';

describe("DatePicker", () => {
    it("should render formatted button text from date object with YYYY-MM-DD string input", () => {
        // Given
        const wrapper = mount(<DatePicker startDate={"2019-01-01"} endDate={"2020-01-01"}/>);

        // When
        const vsDropPicker = wrapper.find('#vs-date-picker-dropdown').props().children[0].props.children;

        // Then
        equal(vsDropPicker, "Jan 01, 2019\u00a0\u2013\u00a0Jan 01, 2020");
    });

    it("should render empty values for dates if input is not in a correct format", () => {
        // Given
        try {
            // When
            mount(<DatePicker startDate={"lhasdjh"} endDate={"asdf"}/>);
        } catch (e) {
            // Then
            if (!(e instanceof TypeError)) {
                fail("Expected TypeError: Invalid date");
            }
        }
    });

    // it("should return same start and end date when clicking apply", () => {
    //     // Given
    //     let actualStart = "", actualEnd = "";
    //     const applyHandler = (startDate, endDate) => {
    //         actualStart = startDate;
    //         actualEnd = endDate;
    //     };
    //     const wrapper = mount(<DatePicker startDate={"2019-01-01"} endDate={"2019-12-31"} onApply={applyHandler}/>);
    //
    //     // When
    //     wrapper.find('#vs-apply-button').simulate('click');
    //
    //     // Then
    //     equal(actualStart, "2019-01-01");
    //     equal(actualEnd, "2019-12-31");
    // });
});

describe("DatePicker", () => {
    // Given
    let table = [
        {
            start: new Date("2019-01-01T00:00:00+00:00"),
            end: new Date("2020-01-01T00:00:00+00:00"),
            expectedOutput: "Jan 01, 2019\u00a0\u2013\u00a0Jan 01, 2020"
        },
        {
            start: new Date("2019-01-01T00:00:00+00:00"),
            end: new Date("2020-01-01T00:00:00+00:00"),
            expectedOutput: "Jan 01, 2019\u00a0\u2013\u00a0Jan 01, 2020"
        },
        {
            start: new Date("2019-01-01"),
            end: new Date("2020-01-01"),
            expectedOutput: "Jan 01, 2019\u00a0\u2013\u00a0Jan 01, 2020"
        },
        {
            start: "2019-01-01",
            end: "2020-01-01",
            expectedOutput: "Jan 01, 2019\u00a0\u2013\u00a0Jan 01, 2020"
        }
    ];

    const testInputs = ({start, end, expectedOutput}) => {
        it("verify button text behavior start: " + start + ", end: " + end + " expect: " + expectedOutput, () => {
            const wrapper = mount(<DatePicker startDate={start} endDate={end}/>);

            // When
            const vsDropPicker = wrapper.find('#vs-date-picker-dropdown').props().children[0].props.children;

            // Then
            equal(vsDropPicker, expectedOutput);
        });
    };

    R.map(testInputs, table);
});
