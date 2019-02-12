import React from 'react';
import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import { Demo, Snippet } from '../../../components/Demo';

/* s2:start */
import DatePickerDropdown from '@cjdev/visual-stack/lib/components/DatePicker/DatePickerDropdown';
/* s2:end */

export default () =>
    <Demo srcFile="/samples/src/containers/Components/Docs/datepicker.js">
        { snippets => {
            return (
                <div>
                    <Panel>
                        <Header>
                            Date Picker
                        </Header>
                        <Body>
                        <Snippet tag="s2" src={snippets} />
                        { /* s1:start */ }
                        <DatePickerDropdown startDate={new Date("2019-01-01T00:00:00+00:00")}  endDate={new Date("2020-01-01T00:00:00+00:00")}/>
                        { /* s1:end */ }
                        <Snippet tag="s1" src={snippets} />
                        </Body>
                    </Panel>
                </div>
            );
        }}
    </Demo>;
