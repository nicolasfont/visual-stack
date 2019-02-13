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
    if (isAbsent(interval)) {return `${dash}${dash}`;}
    const {start, end} = interval;
    return `${format(start)}${nonBreakSpace}${dash}${nonBreakSpace}${format(end)}`;
};

class DatePicker extends Component {

    constructor(props, context) {
        super(props, context);

        let startDate = this.props.startDate;
        let endDate = this.props.endDate;

        if (typeof startDate !== 'object') {
            startDate = new Date(this.props.startDate);
        }

        if (typeof endDate !== 'object') {
            endDate = new Date(this.props.endDate);
        }

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
        this.props.onApply(this.state.dateRangePicker.selection.startDate, this.state.dateRangePicker.selection.endDate);
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
