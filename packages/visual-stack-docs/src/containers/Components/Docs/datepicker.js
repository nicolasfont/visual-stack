import React, { useState } from 'react';

import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import { Demo, Snippet } from '../../../components/Demo';

/* s0:start */
import DatePicker, {
  sidebarSection,
  sectionTitle,
  sectionRange,
} from '@cjdev/visual-stack/lib/components/DatePicker'; // DatePickerButton,
import { DateTime } from 'luxon';
/* s0:end */

const TwoCalendarDemo = ({
  selectedRanges,
  setSelectedRanges,
  selectedSidebarRanges,
  setSidebarRanges,
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
      onCalendarRangeSelect={v => setSelectedRanges(v)}
      selectedSidebarRanges={selectedSidebarRanges}
      onSidebarRangeSelect={v => setSidebarRanges(v)}
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
          sectionRange('custom', 'Custom', null)
        ),
      ]}
    />
  </div>
  /* s2:end */
);

const OneCalendarDemo = ({
  selectedRanges,
  setSelectedRanges,
  selectedSidebarRanges,
  setSidebarRanges,
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
      onCalendarRangeSelect={v => setSelectedRanges(v)}
      selectedSidebarRanges={selectedSidebarRanges}
      onSidebarRangeSelect={v => setSidebarRanges(v)}
      onApply={setAppliedRanges}
      onCancel={() => setSelectedRanges(appliedRanges)}
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
      ]}
    />
  </div>
  /* s3:end */
);

export default () => {
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
  const [selectedRanges, setSelectedRanges] = useState(() => appliedRanges);
  const [selectedSidebarRanges, setSidebarRanges] = useState([
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
              <Header>Simple DatePicker</Header>
              <Body>
                <Snippet tag="s0" src={snippets} />
                {/* <DatePickerButton selectedRanges={selectedRanges} locale="en" /> */}
                <br />
                <OneCalendarDemo
                  {...{
                    selectedRanges: oneCalendarSelectedRanges,
                    setSelectedRanges: setOneCalendarSelectedRanges,
                    selectedSidebarRanges: oneCalendarSelectedSidebarRanges,
                    setSidebarRanges: setOneCalendarSidebarRanges,
                    setAppliedRanges: setOneCalendarAppliedRanges,
                    appliedRanges: oneCalendarAppliedRanges,
                  }}
                />
                <br />
                <h4>Applied: {oneCalendarAppliedRanges[0].join('–')}</h4>
                <Snippet tag="s5" src={snippets} />
                <Snippet tag="s2" src={snippets} />
              </Body>
            </Panel>
            <Panel>
              <Header>Two Calendar DatePicker</Header>
              <Body>
                <Snippet tag="s0" src={snippets} />
                {/* <DatePickerButton selectedRanges={selectedRanges} locale="en" /> */}
                <br />
                <TwoCalendarDemo
                  {...{
                    selectedRanges,
                    setSelectedRanges,
                    selectedSidebarRanges,
                    setSidebarRanges,
                    setAppliedRanges,
                  }}
                />
                <br />
                <h4>
                  Applied: {appliedRanges[0].join('–')} vs.{' '}
                  {appliedRanges[1].join('–')}
                </h4>
                <Snippet tag="s1" src={snippets} />
                <Snippet tag="s2" src={snippets} />
              </Body>
            </Panel>
          </div>
        );
      }}
    </Demo>
  );
};
