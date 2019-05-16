import React, { useState } from 'react';

import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import { Demo, Snippet } from '../../../components/Demo';

/* s0:start */
import DatePicker, {
  DatePickerButton,
} from '@cjdev/visual-stack/lib/components/DatePicker';
import { DateTime } from 'luxon';
/* s0:end */

const DemoComponent = ({
  selectedRanges,
  setSelectedRanges,
  selectedSidebarRanges,
  setSidebarRanges,
}) => (
  /* s2:start */
  <div
    style={{
      border: 'thin solid black',
      display: 'inline-block',
    }}
  >
    <div>{selectedRanges[0]}</div>
    <div>{selectedRanges[1]}</div>
    <DatePicker
      selectedRanges={selectedRanges}
      onCalendarRangeSelect={v => setSelectedRanges(v)}
      selectedSidebarRanges={selectedSidebarRanges}
      onSidebarRangeSelect={v => setSidebarRanges(v)}
      locale="de"
      selectableRange={[new Date('2016-01-01'), new Date('2020-01-01')]}
      cancelButtonText="Cancel"
      applyButtonText="Apply"
      sidebarConfig={[
        {
          title: 'First Range',
          ranges: [
            {
              id: 'today',
              label: 'Today',
              range: [
                DateTime.fromJSDate(new Date()).toFormat('yyyy-MM-dd'),
                DateTime.fromJSDate(new Date()).toFormat('yyyy-MM-dd'),
              ],
            },
            {
              id: 'tomorrow',
              label: 'Tomorrow',
              range: [
                DateTime.fromJSDate(new Date())
                  .plus({ days: 1 })
                  .toFormat('yyyy-MM-dd'),
                DateTime.fromJSDate(new Date())
                  .plus({ days: 1 })
                  .toFormat('yyyy-MM-dd'),
              ],
            },
            {
              id: 'custom',
              label: 'Custom',
            },
          ],
        },
        {
          title: 'Comparison Range',
          ranges: [
            {
              id: 'yesterday',
              label: 'Yesterday',
              range: [
                DateTime.fromJSDate(new Date())
                  .minus({ days: 1 })
                  .toFormat('yyyy-MM-dd'),
                DateTime.fromJSDate(new Date())
                  .minus({ days: 1 })
                  .toFormat('yyyy-MM-dd'),
              ],
            },
            {
              id: 'previous-year',
              label: 'Previous Year',
              range(previousCalendarRanges) {
                const [baseStart, baseEnd] = previousCalendarRanges[0];
                return [
                  DateTime.fromFormat(baseStart, 'yyyy-MM-dd')
                    .minus({ years: 1 })
                    .toFormat('yyyy-MM-dd'),
                  DateTime.fromFormat(baseEnd, 'yyyy-MM-dd')
                    .minus({ years: 1 })
                    .toFormat('yyyy-MM-dd'),
                ];
              },
            },
          ],
        },
      ]}
    />
  </div>
  /* s2:end */
);

export default () => {
  /* s1:start */
  const [selectedRanges, setSelectedRanges] = useState([
    ['2017-01-01', '2017-01-03'],
    ['2016-04-01', '2016-04-03'],
  ]);
  const [selectedSidebarRanges, setSidebarRanges] = useState(['custom', '']);
  /* s1:end */

  return (
    <Demo srcFile="/samples/src/containers/Components/Docs/datepicker.js">
      {snippets => {
        return (
          <div>
            <Panel>
              <Header>Blank Slate</Header>
              <Body>
                <Snippet tag="s0" src={snippets} />
                {/* <DatePickerButton selectedRanges={selectedRanges} locale="en" /> */}
                <br />
                <DemoComponent
                  {...{
                    selectedRanges,
                    setSelectedRanges,
                    selectedSidebarRanges,
                    setSidebarRanges,
                  }}
                />
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
