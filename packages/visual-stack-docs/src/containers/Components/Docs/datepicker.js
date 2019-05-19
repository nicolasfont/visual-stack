import React, { useState } from 'react';

import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import { Demo, Snippet } from '../../../components/Demo';

/* s0:start */
import ConnectedDatePicker from '@cjdev/visual-stack-redux/lib/components/DatePicker';
import DatePicker from '@cjdev/visual-stack/lib/components/DatePicker';
import {
  DatePickerButton,
  DateRangeDisplay,
} from '@cjdev/visual-stack/lib/components/DatePicker/DatePickerButton';
import { ButtonWithDropdown } from '@cjdev/visual-stack/lib/components/ButtonWithDropdown';

import {
  sidebarSection,
  sectionTitle,
  sectionRange,
} from '@cjdev/visual-stack/lib/components/DatePicker';

import { DateTime } from 'luxon';
/* s0:end */

const TwoCalendarDemo = ({
  selectedRanges,
  updateCalendarRanges,
  selectedNamedRanges,
  updateNamedCalendarRanges,
  appliedRanges,
  setAppliedRanges,
}) => (
  /* s2:start */
  <div
    style={{
      border: 'thin solid black',
      display: 'inline-block',
    }}
  >
    <DatePicker
      selectedRanges={selectedRanges}
      updateCalendarRanges={updateCalendarRanges}
      selectedNamedRanges={selectedNamedRanges}
      updateNamedCalendarRanges={updateNamedCalendarRanges}
      resetCalendarSelection={() => updateCalendarRanges(appliedRanges)}
      onApply={setAppliedRanges}
      locale="de"
      selectableRange={[new Date('2016-01-01'), new Date('2020-01-01')]}
      cancelButtonText="Cancel"
      applyButtonText="Apply"
      sidebarConfig={[
        sidebarSection(
          sectionTitle('Predefined Range'),
          sectionRange('today', 'Today', [
            DateTime.fromJSDate(new Date()).toFormat('yyyy-MM-dd'),
            DateTime.fromJSDate(new Date()).toFormat('yyyy-MM-dd'),
          ]),
          sectionRange('tomorrow', 'Tomorrow', [
            DateTime.fromJSDate(new Date())
              .plus({ days: 1 })
              .toFormat('yyyy-MM-dd'),
            DateTime.fromJSDate(new Date())
              .plus({ days: 1 })
              .toFormat('yyyy-MM-dd'),
          ]),
          sectionRange('custom', 'Custom', null)
        ),
        sidebarSection(
          sectionTitle('Comparison Range'),
          sectionRange('yesterday', 'Yesterday', [
            DateTime.fromJSDate(new Date())
              .minus({ days: 1 })
              .toFormat('yyyy-MM-dd'),
            DateTime.fromJSDate(new Date())
              .minus({ days: 1 })
              .toFormat('yyyy-MM-dd'),
          ]),
          sectionRange(
            'previous-year',
            'Previous Year',
            previousCalendarRanges => {
              const [baseStart, baseEnd] = previousCalendarRanges[0];
              return [
                DateTime.fromFormat(baseStart, 'yyyy-MM-dd')
                  .minus({ years: 1 })
                  .toFormat('yyyy-MM-dd'),
                DateTime.fromFormat(baseEnd, 'yyyy-MM-dd')
                  .minus({ years: 1 })
                  .toFormat('yyyy-MM-dd'),
              ];
            }
          ),
          sectionRange('custom', 'Custom', null),
          sectionRange('none', 'No Comparison', null)
        ),
      ]}
    />
  </div>
  /* s2:end */
);

const OneCalendarDemo = ({
  selectedRanges,
  updateCalendarRanges,
  selectedNamedRanges,
  updateNamedCalendarRanges,
  appliedRanges,
  setAppliedRanges,
}) => (
  /* s3:start */
  <div
    style={{
      border: 'thin solid black',
      display: 'inline-block',
    }}
  >
    <DatePicker
      selectedRanges={selectedRanges}
      updateCalendarRanges={updateCalendarRanges}
      selectedNamedRanges={selectedNamedRanges}
      updateNamedCalendarRanges={updateNamedCalendarRanges}
      resetCalendarSelection={() => updateCalendarRanges(appliedRanges)}
      onApply={setAppliedRanges}
      selectableRange={[new Date('2016-01-01'), new Date('2020-01-01')]}
      cancelButtonText="Cancel"
      applyButtonText="Apply"
      sidebarConfig={[
        sidebarSection(
          sectionRange('today', 'Today', [
            DateTime.fromJSDate(new Date()).toFormat('yyyy-MM-dd'),
            DateTime.fromJSDate(new Date()).toFormat('yyyy-MM-dd'),
          ]),
          sectionRange('tomorrow', 'Tomorrow', [
            DateTime.fromJSDate(new Date())
              .plus({ days: 1 })
              .toFormat('yyyy-MM-dd'),
            DateTime.fromJSDate(new Date())
              .plus({ days: 1 })
              .toFormat('yyyy-MM-dd'),
          ]),
          sectionRange('custom', 'Custom', null)
        ),
      ]}
    />
  </div>
  /* s3:end */
);

const ConnectedDatepickerDemo = ({
  selectedRanges,
  onApply,
  selectedNamedRanges,
}) => (
  /* s6:start */
  <div
    style={{
      border: 'thin solid black',
      display: 'inline-block',
    }}
  >
    <ConnectedDatePicker
      id="connected-demo"
      selectedRanges={selectedRanges}
      selectedNamedRanges={selectedNamedRanges}
      onApply={onApply}
      selectableRange={[new Date('2016-01-01'), new Date('2020-01-01')]}
      cancelButtonText="Cancel"
      applyButtonText="Apply"
      sidebarConfig={[
        sidebarSection(
          sectionRange('today', 'Today', [
            DateTime.fromJSDate(new Date()).toFormat('yyyy-MM-dd'),
            DateTime.fromJSDate(new Date()).toFormat('yyyy-MM-dd'),
          ]),
          sectionRange('tomorrow', 'Tomorrow', [
            DateTime.fromJSDate(new Date())
              .plus({ days: 1 })
              .toFormat('yyyy-MM-dd'),
            DateTime.fromJSDate(new Date())
              .plus({ days: 1 })
              .toFormat('yyyy-MM-dd'),
          ]),
          sectionRange('custom', 'Custom', null)
        ),
      ]}
    />
  </div>
  /* s6:end */
);

const ConnectedDatepickerWithDropdownDemo = ({
  appliedRanges,
  selectedRanges,
  onApply,
  selectedNamedRanges,
}) => {
  const [dropdownState, setDropdownState] = useState(false);
  return (
    /* s8:start */
    <ButtonWithDropdown
      expanded={dropdownState ? 1 : 0}
      doExpand={() => setDropdownState(!dropdownState)}
      renderButton={props => (
        <DatePickerButton ranges={appliedRanges} locale="en" {...props} />
      )}
    >
      <ConnectedDatePicker
        id="connected-demo"
        selectedRanges={selectedRanges}
        selectedNamedRanges={selectedNamedRanges}
        onApply={(...args) => {
          setDropdownState(false);
          onApply(...args);
        }}
        onCancel={(...args) => setDropdownState(false)}
        selectableRange={[new Date('2016-01-01'), new Date('2020-01-01')]}
        cancelButtonText="Cancel"
        applyButtonText="Apply"
        sidebarConfig={[
          sidebarSection(
            sectionTitle('Predefined Range'),
            sectionRange('today', 'Today', [
              DateTime.fromJSDate(new Date()).toFormat('yyyy-MM-dd'),
              DateTime.fromJSDate(new Date()).toFormat('yyyy-MM-dd'),
            ]),
            sectionRange('tomorrow', 'Tomorrow', [
              DateTime.fromJSDate(new Date())
                .plus({ days: 1 })
                .toFormat('yyyy-MM-dd'),
              DateTime.fromJSDate(new Date())
                .plus({ days: 1 })
                .toFormat('yyyy-MM-dd'),
            ]),
            sectionRange('custom', 'Custom', null)
          ),
          sidebarSection(
            sectionTitle('Comparison Range'),
            sectionRange('yesterday', 'Yesterday', [
              DateTime.fromJSDate(new Date())
                .minus({ days: 1 })
                .toFormat('yyyy-MM-dd'),
              DateTime.fromJSDate(new Date())
                .minus({ days: 1 })
                .toFormat('yyyy-MM-dd'),
            ]),
            sectionRange(
              'previous-year',
              'Previous Year',
              previousCalendarRanges => {
                const [baseStart, baseEnd] = previousCalendarRanges[0];
                return [
                  DateTime.fromFormat(baseStart, 'yyyy-MM-dd')
                    .minus({ years: 1 })
                    .toFormat('yyyy-MM-dd'),
                  DateTime.fromFormat(baseEnd, 'yyyy-MM-dd')
                    .minus({ years: 1 })
                    .toFormat('yyyy-MM-dd'),
                ];
              }
            ),
            sectionRange('custom', 'Custom', null),
            sectionRange('none', 'No Comparison', null)
          ),
        ]}
      />
    </ButtonWithDropdown>
    /* s8:end */
  );
};

export default () => {
  /* s7:start */
  const [reduxAppliedRange, setReduxAppliedRange] = useState([
    ['2017-01-01', '2017-01-03'],
  ]);
  /* s7:end */

  /* s5:start */
  const [oneCalendarAppliedRanges, setOneCalendarAppliedRanges] = useState([
    ['2017-01-01', '2017-01-03'],
  ]);
  const [oneCalendarSelectedRanges, setOneCalendarSelectedRanges] = useState(
    () => oneCalendarAppliedRanges
  );
  const [
    oneCalendarSelectedSidebarRanges,
    setOneCalendarSidebarRanges,
  ] = useState(['custom']);
  /* s5:end */

  /* s1:start */
  const [appliedRanges, setAppliedRanges] = useState([
    ['2017-01-01', '2017-01-03'],
    ['2016-04-01', '2016-04-03'],
  ]);
  const [selectedRanges, updateCalendarRanges] = useState(() => appliedRanges);
  const [selectedNamedRanges, updateNamedCalendarRanges] = useState([
    'custom',
    'custom',
  ]);
  /* s1:end */

  return (
    <Demo srcFile="/samples/src/containers/Components/Docs/datepicker.js">
      {snippets => {
        return (
          <div>
            <Panel>
              <Body>
                <Snippet tag="s0" src={snippets} />
              </Body>
            </Panel>
            <Panel>
              <Body>
                <p>
                  {' '}
                  Allows a user to select one or more ranges from side-by-side
                  calendars and to select from a list of named ranges.{' '}
                </p>{' '}
                <p>
                  The sidebar sections correspond to the calendars so that the
                  top sidebar section corresponds to the leftmost calendar and
                  as you go down the sidebar, you go right in the visible
                  calendars.{' '}
                </p>
                <p>
                  The predefined ranges are defined using{' '}
                  <code>sidebarSection</code>, <code>sectionTitle</code> and{' '}
                  <code>sectionRange</code> (see the examples for usage). The
                  named ranges can each be specified as a list of start and end
                  dates in the format <code>yyyy-mm-dd</code>, or a function can
                  be passed that gets all the currently selected ranges (from
                  both calendars) and returns a single range for the calendar
                  corresponding to the sidebar section.
                </p>
                <p>
                  There are two special named intervals: <code>custom</code> and{' '}
                  <code>none</code>. If calendar is manipulated directly, the{' '}
                  <code>custom</code> range is selected. If <code>none</code> is
                  selected, the corresponding calendar is hidden.
                </p>
              </Body>
            </Panel>
            <Panel>
              <Header>Redux DatePicker</Header>
              <Body>
                <Snippet tag="s0" src={snippets} />
                <br />
                <ConnectedDatepickerDemo
                  selectedRanges={oneCalendarSelectedRanges}
                  onApply={v => setReduxAppliedRange(v)}
                  selectedNamedRanges={oneCalendarSelectedSidebarRanges}
                />
                <br />
                <DateRangeDisplay ranges={reduxAppliedRange} locale="en" />
                <Snippet tag="s6" src={snippets} />
              </Body>
            </Panel>
            <Panel>
              <Header>Simple DatePicker</Header>
              <Body>
                <Snippet tag="s0" src={snippets} />
                <br />
                <OneCalendarDemo
                  selectedRanges={oneCalendarSelectedRanges}
                  updateCalendarRanges={setOneCalendarSelectedRanges}
                  selectedNamedRanges={oneCalendarSelectedSidebarRanges}
                  updateNamedCalendarRanges={setOneCalendarSidebarRanges}
                  setAppliedRanges={setOneCalendarAppliedRanges}
                  appliedRanges={oneCalendarAppliedRanges}
                />
                <br />
                <DateRangeDisplay
                  ranges={oneCalendarAppliedRanges}
                  locale="en"
                />
                <Snippet tag="s2" src={snippets} />
              </Body>
            </Panel>
            <Panel>
              <Header>Two Calendar DatePicker</Header>
              <Body>
                <Snippet tag="s0" src={snippets} />
                <TwoCalendarDemo
                  {...{
                    appliedRanges,
                    selectedRanges,
                    updateCalendarRanges,
                    selectedNamedRanges,
                    updateNamedCalendarRanges,
                    setAppliedRanges,
                  }}
                />
                <br />
                <DateRangeDisplay ranges={appliedRanges} locale="en" />
                <Snippet tag="s2" src={snippets} />
              </Body>
            </Panel>
            <Panel>
              <Header>Two Calendar DatePicker with Dropdown</Header>
              <Body>
                <Snippet tag="s0" src={snippets} />
                <ConnectedDatepickerWithDropdownDemo
                  appliedRanges={appliedRanges}
                  selectedRanges={selectedRanges}
                  onApply={v => setAppliedRanges(v)}
                  selectedNamedRanges={selectedNamedRanges}
                />
                <br />
                <Snippet tag="s8" src={snippets} />
              </Body>
            </Panel>
          </div>
        );
      }}
    </Demo>
  );
};
