import React from 'react';
import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import { Demo, Snippet } from '../../../components/Demo';

/* s2:start */
import DatePicker from '@cjdev/visual-stack/lib/components/DatePicker/DatePicker';

const onApplyHandler = (startDate, endDate) => {
    alert("start: " + startDate + "end: " + endDate);
};
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
                        <DatePicker startDate={"2019-01-01"}
                                    endDate={"2020-01-01"}
                                    onApply={onApplyHandler}
                                    showDP={true}/>
                        { /* s1:end */ }
                        <Snippet tag="s1" src={snippets} />
                        </Body>
                    </Panel>
                </div>
            );
        }}
    </Demo>;
