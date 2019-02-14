import React, {Component} from 'react';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import './styles.css';
import R from 'ramda';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {DateRangePicker} from 'react-date-range';
import dateFormat from 'dateformat';

const nonBreakSpace = '\u00a0';
const dash = '\u2013';

const isAbsent = val => R.isNil(val) || R.isEmpty(val);
const format = date => isAbsent(date) ? '' : dateFormat(date, "mmm dd, yyyy");
const formatYYYYMMDD = date => dateFormat(date, "yyyy/mm/dd");
const isValidDate = date => R.test(/^\d{4}\/[0|1][0-9]\/[0-3][0-9]$/, date);

export const formatIntervalForDisplay = interval => {
    if (isAbsent(interval)) {
        return `${dash}${dash}`;
    }
    const {start, end} = interval;
    return start === end ? `${format(start)}` : `${format(start)}${nonBreakSpace}${dash}${nonBreakSpace}${format(end)}`;
};

const verifyDateInput = (startDate, endDate) => {
    if (typeof startDate !== 'string' || typeof endDate !== 'string') {
        throw Error('invalid input: not a string');
    }

    if (!isValidDate(startDate) || !isValidDate(endDate)) {
        throw Error('invalid input: does not match YYYY/MM/DD');
    }
};

class DatePicker extends Component {

    constructor(props, context) {
        super(props, context);

        let startDate = this.props.startDate,
            endDate = this.props.endDate;

        verifyDateInput(startDate, endDate);

        startDate = new Date(this.props.startDate);
        endDate = new Date(this.props.endDate);

        this.state = {
            dateRangePicker: {
                selection: {
                    startDate: startDate,
                    endDate: endDate,
                    key: 'selection',
                },
            },
            showDP: isAbsent(this.props.showDP) ? false : this.props.showDP
        };
    }


    static buttonText(baseDateRange) {
        return (
            <span>
                {formatIntervalForDisplay(baseDateRange)}
            </span>
        );
    }

    handleRangeChange(which, payload) {
        this.setState({
            [which]: {
                ...this.state[which],
                ...payload,
            },
        });
    }

    saveSelection() {
        this.setState({showDP: false});
        this.props.onApply(
            formatYYYYMMDD(this.state.dateRangePicker.selection.startDate),
            formatYYYYMMDD(this.state.dateRangePicker.selection.endDate));
    }

    render() {
        const baseDateRange = {start: this.props.startDate, end: this.props.endDate};
        const datePickerClassName = this.state.showDP ? 'vs-date-picker-visible' : 'vs-date-picker';
        const chevronClassName = this.state.showDP ? 'vs-chevronRight' : 'vs-chevronDown';

        return (
            <div>
                <button id={'vs-date-picker-dropdown'}
                        className={'vs-date-picker-dropdown'}
                        onClick={() => this.setState({showDP: !this.state.showDP})}>
                    {DatePicker.buttonText(baseDateRange)}
                    <ChevronRightIcon
                        className={chevronClassName}
                    />
                </button>
                <div id={'vs-date-picker'} className={datePickerClassName}>
                    <DateRangePicker
                        onChange={this.handleRangeChange.bind(this, 'dateRangePicker')}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={1}
                        ranges={[this.state.dateRangePicker.selection]}
                        direction="horizontal"
                    />
                    <div className={'vs-button-bar'}>
                        <button onClick={this.saveSelection.bind(this)}
                                id={'vs-apply-button'}
                                className={'vs-apply-button'}>
                            Apply
                        </button>
                        <button onClick={() => this.setState({showDP: false})}
                                className={'vs-cancel-button'}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DatePicker;
