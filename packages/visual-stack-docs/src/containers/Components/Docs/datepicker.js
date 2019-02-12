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
                            Spinner
                        </Header>
                        <Body>
                        <Snippet tag="s2" src={snippets} />
                        { /* s1:start */ }
                        <DatePickerDropdown />
                        { /* s1:end */ }
                        <Snippet tag="s1" src={snippets} />
                        </Body>
                    </Panel>
                </div>
            );
        }}
    </Demo>;
