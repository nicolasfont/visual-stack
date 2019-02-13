import React, {Component} from 'react';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import './styles.css';
import dateFormat from 'dateformat';
import R from 'ramda';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';


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

class DatePicker extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            dateRangePicker: {
                selection: {
                    startDate: this.props.startDate,
                    endDate: this.props.endDate,
                    key: 'selection',
                },
            }
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
        this.props.onApply(this.state.dateRangePicker.selection.startDate, this.state.dateRangePicker.selection.endDate);
    }

    render() {
        const baseDateRange = {start: this.props.startDate, end: this.props.endDate};
        return (
            <div>
                <button id={'vs-date-picker-dropdown'}
                        className={'vs-date-picker-dropdown'}>
                    {DatePicker.buttonText(baseDateRange)}
                    <ChevronRightIcon
                        className={'vs-chevronDown'}
                    />
                </button>
                <div>
                    <DateRangePicker
                        onChange={this.handleRangeChange.bind(this, 'dateRangePicker')}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={1}
                        ranges={[this.state.dateRangePicker.selection]}
                        direction="horizontal"
                    />
                    <div>
                        <button onClick={this.saveSelection.bind(this)}> apply</button>
                        <button>cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DatePicker;
