import * as R from 'ramda';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import classNames from 'classnames';

import { Button } from '../Button';
import { CompareIcon } from '../Icons';
import './DatePicker.css';

const isAbsent = val => R.isNil(val) || R.isEmpty(val);
const internalDateFormat = 'yyyy-MM-dd';
const dash = '\u2013'; // Unicode Character 'EN DASH' (U+2013)
const nonBreakSpace = '\u00a0'; // Unicode Character 'NO-BREAK SPACE' (U+00A0)

function fromInternalDateFormat(date) {
  return DateTime.fromFormat(date, internalDateFormat);
}

const toLocalizedFormat = R.curry((locale, dateTime) =>
  dateTime.toFormat('DD', { locale })
);

const shortLocalizedDateFormatter = R.curry((toLocalizedFormat, date) =>
  isAbsent(date)
    ? `${dash}${dash}`
    : toLocalizedFormat(fromInternalDateFormat(date))
);

export const formatIntervalForDisplay = R.curry(
  (toLocalizedFormat, locale, interval) => {
    if (isAbsent(interval)) {
      return `${dash}${dash}`;
    }

    const [start, end] = interval;

    const format = shortLocalizedDateFormatter(toLocalizedFormat(locale));
    const isSameDay =
      fromInternalDateFormat(end).diff(fromInternalDateFormat(start), 'day')
        .days === 0;

    return isSameDay
      ? format(start)
      : `${format(start)}${nonBreakSpace}${dash}${nonBreakSpace}${format(
          fromInternalDateFormat(end).toFormat(internalDateFormat)
        )}`;
  }
);

export const dateRangeDisplayFactory = toLocalizedFormat =>
  function DateRangeDisplay({ locale, ranges }) {
    const formatter = formatIntervalForDisplay(toLocalizedFormat, locale);
    const [base, comparison] = ranges;
    if (comparison !== undefined) {
      return (
        <span>
          {formatter(base)}
          <CompareIcon />
          {formatter(comparison)}
        </span>
      );
    } else {
      return <span>{formatter(base)}</span>;
    }
  };

export const DateRangeDisplay = dateRangeDisplayFactory(toLocalizedFormat);

export const DatePickerButton = ({
  expanded,
  locale,
  ranges,
  className,
  DateRangeDisplay,
  type = 'outline-secondary',
  ...props
}) => (
  <Button
    {...props}
    className={classNames(
      className,
      { 'vs-date-picker-button-expanded': expanded },
      'vs-date-picker-button'
    )}
    type={type}
  >
    <DateRangeDisplay {...{ locale, ranges }} />
    <ChevronRightIcon className="vs-expanded-icon" />
  </Button>
);
DatePickerButton.propTypes = {
  expanded: PropTypes.bool,
  children: PropTypes.node,
};
DatePickerButton.defaultProps = {
  DateRangeDisplay,
};

export default DatePickerButton;
