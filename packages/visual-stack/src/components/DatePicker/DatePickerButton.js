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

const shortLocalizedDateFormatter = locale => date =>
  isAbsent(date)
    ? `${dash}${dash}`
    : fromInternalDateFormat(date).toFormat('DD', { locale });

export const formatIntervalForDisplay = (locale, interval) => {
  if (isAbsent(interval)) {
    return `${dash}${dash}`;
  }

  const [start, end] = interval;

  const format = shortLocalizedDateFormatter(locale);
  const isSameDay =
    fromInternalDateFormat(end).diff(fromInternalDateFormat(start), 'day')
      .days === 0;

  return isSameDay
    ? format(start)
    : `${format(start)}${nonBreakSpace}${dash}${nonBreakSpace}${format(
        fromInternalDateFormat(end).toFormat(internalDateFormat)
      )}`;
};

export const DateRangeDisplay = ({ locale, ranges }) => {
  const [base, comparison] = ranges;
  if (comparison !== undefined) {
    return (
      <span>
        {formatIntervalForDisplay(locale, base)}
        <CompareIcon />
        {formatIntervalForDisplay(locale, comparison)}
      </span>
    );
  } else {
    return <span>{formatIntervalForDisplay(locale, base)}</span>;
  }
};

export const DatePickerButton = ({
  expanded,
  locale,
  ranges,
  className,
  ...props
}) => (
  <Button
    {...props}
    className={classNames(
      className,
      { 'vs-date-picker-button-expanded': expanded },
      'vs-date-picker-button'
    )}
    type="outline-primary"
  >
    <DateRangeDisplay {...{ locale, ranges }} />
    <ChevronRightIcon className="vs-expanded-icon" />
  </Button>
);
DatePickerButton.propTypes = {
  expanded: PropTypes.bool,
  children: PropTypes.node,
};

export default DatePickerButton;
