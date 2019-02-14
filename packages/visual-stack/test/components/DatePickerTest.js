import DatePicker from '../../src/components/DatePicker/DatePicker';
import React from 'react';
import {equal, fail} from 'assert';
import {mount} from 'enzyme';
import * as R from 'ramda';
import * as chai from 'chai';

describe("DatePicker", () => {
    it("should render formatted button text from date object with YYYY-MM-DD string input", () => {
        // Given
        const wrapper = mount(<DatePicker startDate={"2019/01/01"} endDate={"2020/01/01"}/>);

        // When
        const vsDropPicker = wrapper.find('#vs-date-picker-dropdown').props().children[0].props.children;

        // Then
        equal(vsDropPicker, "Jan 01, 2019\u00a0\u2013\u00a0Jan 01, 2020");
    });

    it("should render formatted start date with correct date in date display", () => {
        // Given
        const wrapper = mount(<DatePicker startDate={"2019/01/01"} endDate={"2020/01/01"}/>);

        // When
        let input = wrapper.find('.rdrDateDisplay').props();
        const startDate = input.children[0].props.children.props.value;
        const endDate = input.children[1].props.children.props.value;

        // Then
        equal(startDate, "Jan 1, 2019");
        equal(endDate, "Jan 1, 2020");
    });

    it("should return same start and end date when clicking apply", () => {
        // Given
        let selectedStart = "", selectedEnd = "";
        const applyHandler = (startDate, endDate) => {
            selectedStart = startDate;
            selectedEnd = endDate;
        };
        const wrapper = mount(<DatePicker startDate={"2019/01/01"} endDate={"2019/12/31"} onApply={applyHandler}/>);

        // When
        wrapper.find('#vs-apply-button').simulate('click');

        // Then
        equal(selectedStart, "2019/01/01");
        equal(selectedEnd, "2019/12/31");
    });
});

describe("DatePicker Valid Inputs", () => {
    // Given
    let table = [
        {
            start: "2019/01/01",
            end: "2020/01/01",
            expectedOutput: "Jan 01, 2019\u00a0\u2013\u00a0Jan 01, 2020"
        },
        {
            start: "2019/12/31",
            end: "2020/01/15",
            expectedOutput: "Dec 31, 2019\u00a0\u2013\u00a0Jan 15, 2020"
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

describe("DatePicker Invalid Inputs", () => {
    // Given
    let invalidInputsTable = [
        {
            start: "2019-01-01",
            end: "2020-01-01",
        },
        {
            start: "2019/33/35",
            end: "2020/32/99",
        },
        {
            start: "2019/1/1",
            end: "2020/1/1",
        },
        {
            start: "NOT A REAL DATE",
            end: "NOT A REAL DATE",
        }
    ];

    const testInputs = ({start, end}) => {
        it("verify invalid input: " + start + ", end: " + end, () => {
            // When
            let mountDatePicker = () => mount(<DatePicker startDate={start} endDate={end}/>);

            // Then
            chai.expect(mountDatePicker).to.throw('invalid input: does not match YYYY/MM/DD');
        });
    };

    R.map(testInputs, invalidInputsTable);
});
