import React, { Component } from 'react';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import './styles.css';
import dateFormat from 'dateformat';
import R from 'ramda';

const nonBreakSpace = '\u00a0';
const dash = '\u2013';

const isAbsent = val => R.isNil(val) || R.isEmpty(val);

const format = date => isAbsent(date) ? '' : dateFormat(new Date(date), "mmm dd, yyyy", true);

export const formatIntervalForDisplay = interval => {
    if (isAbsent(interval)) {
        return `${dash}${dash}`;
    }
    const {start, end} = interval;

    return `${format(start)}${nonBreakSpace}${dash}${nonBreakSpace}${format(end)}`;
};

class DatePickerDropdown extends Component {

    static buttonText(baseDateRange) {
        return (
            <span>
                {formatIntervalForDisplay(baseDateRange)}
            </span>
        );
    }

    render() {
        const baseDateRange = {start: this.props.startDate, end: this.props.endDate};
        return (
            <div>
                <button id={'vs-date-picker-dropdown'}
                        className={'vs-date-picker-dropdown'}>
                    {DatePickerDropdown.buttonText(baseDateRange)}
                    <ChevronRightIcon
                        className={'vs-chevronDown'}
                    />
                </button>
            </div>
        );
    }
}

export default DatePickerDropdown;
