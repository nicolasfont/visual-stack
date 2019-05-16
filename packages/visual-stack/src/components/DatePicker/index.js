import * as R from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../Button';
import { withErrorBoundary } from '../ErrorBoundary';

import { DateTime } from 'luxon';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {
  cs,
  de,
  enUS,
  es,
  fr,
  pl,
  zhCN,
  ja,
  pt,
} from 'react-date-range/dist/locale';

import './DatePicker.css';

function SidebarRangeSection({ config, selectedId, onRangeSelect }) {
  const { title, ranges } = config;

  return (
    <>
      <h4 className="date-range-title">{title}</h4>
      <ul>
        {ranges.map(({ id, label }) => (
          <li key={id}>
            <span className={id} onClick={() => onRangeSelect(id)}>
              <input
                type="radio"
                onChange={() => onRangeSelect(id)}
                checked={selectedId === id}
              />
              {label}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

const rangeConfigShape = PropTypes.shape({
  title: PropTypes.string,
  ranges: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    })
  ),
});
SidebarRangeSection.propTypes = {
  config: rangeConfigShape,
  onRangeSelect: PropTypes.func,
  selectedId: PropTypes.string,
};

const doSidebarRangeSelect = (
  rangeConfig,
  selectedSidebarRanges,
  selectedRanges,
  onRangeSelect,
  onCalendarRangeUpdate,
  index
) => selection => {
  const newSidebarRanges = R.update(index, selection, selectedSidebarRanges);
  const applyRange = R.cond([
    [
      range => R.is(Function, range),
      (range, selectedRanges) => range(selectedRanges),
    ],
    [range => R.is(Array, range), R.identity],
    [R.T, (_, selectedRanges, idx) => selectedRanges[idx]],
  ]);

  const rangeFor = ({ ranges }, selected) => {
    const result = R.find(R.propEq('id', selected), ranges);
    return result && result.range;
  };

  const callbacksOrStaticOrNothing = R.zipWith(
    (selected, config) => rangeFor(config, selected),
    newSidebarRanges,
    rangeConfig
  );

  const newSelectedRanges = R.addIndex(R.reduce)(
    (curSelectedRanges, nextThing, idx) =>
      R.update(
        idx,
        applyRange(nextThing, curSelectedRanges, idx),
        curSelectedRanges
      ),
    selectedRanges,
    callbacksOrStaticOrNothing
  );

  onCalendarRangeUpdate(newSelectedRanges);
  onRangeSelect(newSidebarRanges);
};

const DatePickerSidebar = ({
  rangeConfig,
  selectedSidebarRanges,
  onRangeSelect,
  onCalendarRangeUpdate,
  selectedRanges,
}) => {
  return (
    <div className={'vs-date-picker-sidebar'}>
      {R.addIndex(R.zipWith)(
        (config, selected, index) => (
          <SidebarRangeSection
            key={config.title}
            config={config}
            selectedId={selected}
            onRangeSelect={doSidebarRangeSelect(
              rangeConfig,
              selectedSidebarRanges,
              selectedRanges,
              onRangeSelect,
              onCalendarRangeUpdate,
              index
            )}
          />
        ),
        rangeConfig,
        selectedSidebarRanges
      )}
    </div>
  );
};

DatePickerSidebar.propTypes = {
  onRangeSelect: PropTypes.func,
  rangeConfig: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      ranges: PropTypes.array,
    })
  ),
  selectedSidebarRanges: PropTypes.arrayOf(PropTypes.string),
  comparisonRanges: PropTypes.arrayOf(PropTypes.array),
};

const languageToLocale = {
  cs,
  de,
  en: enUS,
  es,
  fr,
  pl,
  zh: zhCN,
  ja,
  pt,
};

export const languageToDateFormat = {
  cs: 'D. MMMM YYYY',
  de: 'D. MMMM YYYY',
  en: 'MMMM D, YYYY',
  es: 'D [de] MMMM [de] YYYY',
  fr: 'D MMMM YYYY',
  pl: 'D MMMM YYYY',
  zh: 'YYYY年MMMMD日',
  pt: 'D [de] MMMM [de] YYYY',
  ja: 'YYYY年M月D日',
};

const rangeToCalendarInput = (range, intervalColor) => {
  return {
    startDate:
      range[0] && DateTime.fromFormat(range[0], 'yyyy-MM-dd').toJSDate(),
    endDate: range[1] && DateTime.fromFormat(range[1], 'yyyy-MM-dd').toJSDate(),
    range1: range,
    color: intervalColor,
  };
};

function updateSelectedRanges(idx, newRange, selectedRanges) {
  return R.update(
    idx,
    R.map(v => v && DateTime.fromJSDate(v).toFormat('yyyy-MM-dd'), newRange),
    selectedRanges
  );
}

const adaptToReactDateRange = (intervalColors, intervals) => {
  const result = R.zipWith(rangeToCalendarInput, intervals, intervalColors);
  return result;
};

export const DatePicker = ({
  onCalendarRangeSelect,
  onSidebarRangeSelect,
  onCancel,
  saveHandler,
  selectableRange: [minDate, maxDate],
  selectedRanges,
  selectedSidebarRanges,
  sidebarConfig,
  cancelButtonText,
  applyButtonText,
  locale = 'en',
  dateFormat = languageToDateFormat[locale],
  intervalColors = ['#05afec', '#0061ac'],
}) => (
  <div
    className={`${
      selectedRanges.length === 2
        ? 'vs-date-picker vs-date-picker-side-by-side'
        : 'vs-date-picker'
    }`}
  >
    <div className="vs-date-picker-calendars">
      <DatePickerSidebar
        rangeConfig={sidebarConfig}
        onRangeSelect={onSidebarRangeSelect}
        selectedSidebarRanges={selectedSidebarRanges}
        selectedRanges={selectedRanges}
        onCalendarRangeUpdate={onCalendarRangeSelect}
      />
      <div className="vs-date-pickers">
        {R.addIndex(R.zipWith)(
          (range, className, idx) => (
            <DateRange
              key={className}
              className={className}
              onChange={({ range1: range }) => {
                doSidebarRangeSelect(
                  sidebarConfig,
                  selectedSidebarRanges,
                  updateSelectedRanges(
                    idx,
                    R.props(['startDate', 'endDate'], range),
                    selectedRanges
                  ),
                  onSidebarRangeSelect,
                  onCalendarRangeSelect,
                  idx
                )('custom');
              }}
              moveRangeOnFirstSelection={false}
              ranges={[range]}
              minDate={minDate}
              maxDate={maxDate}
              direction="vertical"
              scroll={{ enabled: false }}
              locale={languageToLocale[locale]}
              dateDisplayFormat={dateFormat}
            />
          ),
          adaptToReactDateRange(intervalColors, selectedRanges),
          ['vs-calendar', 'vs-comparison-calendar vs-calendar']
        )}
      </div>
    </div>
    <div className="vs-button-bar">
      <Button type="text" onClick={onCancel} className="vs-cancel-button">
        {cancelButtonText}
      </Button>
      <Button
        type="solid-primary"
        onClick={saveHandler}
        className="vs-apply-button"
      >
        {applyButtonText}
      </Button>
    </div>
  </div>
);
DatePicker.propTypes = {
  selectedRanges: PropTypes.array,
  selectedNamedIntervals: PropTypes.arrayOf(PropTypes.string),
  sidebarConfig: rangeConfigShape,
  selectableRange: PropTypes.array,
  onCalendarRangeUpdate: PropTypes.func,
  onSidebarRangeSelect: PropTypes.func,
  saveHandler: PropTypes.func,
  onCancel: PropTypes.func,
  cancelButtonText: PropTypes.node,
  applyButtonText: PropTypes.node,
};

export default withErrorBoundary(DatePicker);
