import React, { useState } from 'react';

import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import { Demo, Snippet } from '../../../components/Demo';

import { DateTime } from 'luxon';

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

const formatDateAsString = date =>
  [date.getFullYear(), date.getMonth() + 1, date.getDate()]
    .map(v =>
      new Intl.NumberFormat('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }).format(v)
    )
    .join('-');
const dayAfter = date => {
  date.setDate(date.getDate() + 1);
  return date;
};
const dayBefore = date => {
  date.setDate(date.getDate() - 1);
  return date;
};

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
      onCancel={() => updateCalendarRanges(appliedRanges)}
      onApply={setAppliedRanges}
      locale="de"
      selectableRange={['2016-01-01', '2019-12-31']}
      cancelButtonText="Cancel"
      applyButtonText="Apply"
      sidebarConfig={[
        sidebarSection(
          sectionTitle('Predefined Range'),
          sectionRange('today', 'Today', [
            formatDateAsString(new Date()),
            formatDateAsString(new Date()),
          ]),
          sectionRange('tomorrow', 'Tomorrow', [
            formatDateAsString(dayAfter(new Date())),
            formatDateAsString(dayAfter(new Date())),
          ]),
          sectionRange('custom', 'Custom', null)
        ),
        sidebarSection(
          sectionTitle('Comparison Range'),
          sectionRange('yesterday', 'Yesterday', [
            formatDateAsString(dayBefore(new Date())),
            formatDateAsString(dayBefore(new Date())),
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
      onCancel={() => updateCalendarRanges(appliedRanges)}
      onApply={setAppliedRanges}
      selectableRange={['2016-01-01', '2019-12-31']}
      cancelButtonText="Cancel"
      applyButtonText="Apply"
      sidebarConfig={[
        sidebarSection(
          sectionTitle('Predefined Range'),
          sectionRange('today', 'Today', [
            formatDateAsString(new Date()),
            formatDateAsString(new Date()),
          ]),
          sectionRange('tomorrow', 'Tomorrow', [
            formatDateAsString(dayAfter(new Date())),
            formatDateAsString(dayAfter(new Date())),
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
      selectableRange={['2016-01-01', '2019-12-31']}
      cancelButtonText="Cancel"
      applyButtonText="Apply"
      sidebarConfig={[
        sidebarSection(
          sectionTitle('Predefined Range'),
          sectionRange('today', 'Today', [
            formatDateAsString(new Date()),
            formatDateAsString(new Date()),
          ]),
          sectionRange('tomorrow', 'Tomorrow', [
            formatDateAsString(dayAfter(new Date())),
            formatDateAsString(dayAfter(new Date())),
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
      expanded={dropdownState}
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
        onCancel={_ => setDropdownState(false)}
        selectableRange={['2016-01-01', '2019-12-31']}
        cancelButtonText="Cancel"
        applyButtonText="Apply"
        sidebarConfig={[
          sidebarSection(
            sectionTitle('Predefined Range'),
            sectionRange('today', 'Today', [
              formatDateAsString(new Date()),
              formatDateAsString(new Date()),
            ]),
            sectionRange('tomorrow', 'Tomorrow', [
              formatDateAsString(dayAfter(new Date())),
              formatDateAsString(dayAfter(new Date())),
            ]),
            sectionRange('custom', 'Custom', null)
          ),
          sidebarSection(
            sectionTitle('Comparison Range'),
            sectionRange('yesterday', 'Yesterday', [
              formatDateAsString(dayBefore(new Date())),
              formatDateAsString(dayBefore(new Date())),
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
  const [reduxAppliedRanges, setReduxAppliedRange] = useState([
    ['2017-01-01', '2017-01-03'],
  ]);
  const [reduxAppliedNamedRange, setReduxAppliedNamedRange] = useState([
    'tomorrow',
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

  const [appliedRanges, setAppliedRanges] = useState([
    ['2017-01-01', '2017-01-03'],
    ['2016-04-01', '2016-04-03'],
  ]);
  /* s1:start */
  const [selectedRanges, updateCalendarRanges] = useState([
    ['2017-01-01', '2017-01-03'],
    ['2016-04-01', '2016-04-03'],
  ]);
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
                <p>
                  {' '}
                  Allows a user to select one or more ranges from side-by-side
                  calendars and to select from a list of named ranges. The value
                  selected when the user clicks the Apply button as well as the
                  currently selected named ranges will be sent to the{' '}
                  <code>onApply(selectedRanges, selectedNamedRanges)</code>{' '}
                  callback.
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
                  <code>
                    sectionRange(selectedRanges, curIdx, selectedNamedRangeIds)
                  </code>{' '}
                  (see the examples for usage). The named ranges can each be
                  specified as a list of start and end dates in the format{' '}
                  <code>yyyy-mm-dd</code>, or a function can be passed that gets
                  all the currently selected ranges (from both calendars) and
                  returns a single range for the calendar corresponding to the
                  sidebar section.
                </p>
                <p>
                  There are two special named ranges: <code>custom</code> and{' '}
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
                  selectedRanges={reduxAppliedRanges}
                  selectedNamedRanges={reduxAppliedNamedRange}
                  onApply={(selectedRanges, selectedNamedRanges) => {
                    setReduxAppliedRange(selectedRanges);
                    setReduxAppliedNamedRange(selectedNamedRanges);
                  }}
                />
                <br />
                <dl>
                  <dt>Applied Range:</dt>
                  <dd>
                    <DateRangeDisplay ranges={reduxAppliedRanges} locale="en" />
                  </dd>
                  <dt>Applied Named Range:</dt>
                  <dd>
                    <div>{reduxAppliedNamedRange}</div>
                  </dd>
                </dl>
                <Snippet tag="s1" src={snippets} />
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
