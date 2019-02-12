import React, { Component } from 'react';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import './styles.css';

const formatIntervalForDisplay = ({startDate, endDate}) => {
    const nonBreakSpace = '\u00a0';
    const dash = '\u2013';
    const start = "Jan 1, 2019";
    const end = "Feb 1, 2019";

    return  `${start}${nonBreakSpace}${dash}${nonBreakSpace}${end} ( UTC )`;
};

class DatePickerDropdown extends Component {

    static buttonText(dateRange) {
        return (
            <span>
        {formatIntervalForDisplay(dateRange)}
      </span>
        );
    }

    render() {
        const dateRange = { startDate: new Date(), endDate: new Date() };
        return (
            <div>
                <button id={'vs-date-picker-dropdown'}
                        className={'vs-date-picker-dropdown'}>
                    {DatePickerDropdown.buttonText(dateRange)}
                    <ChevronRightIcon
                        className={'vs-chevronDown'}
                    />
                </button>
            </div>
        );
    }
}

export default DatePickerDropdown;
