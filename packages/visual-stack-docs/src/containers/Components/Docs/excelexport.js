import React from 'react';
import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import { ExcelExportButton } from '@cjdev/visual-stack/lib/components/ExcelExport';
import { Demo, Snippet } from '../../../components/Demo';

export default () =>
  <Demo srcFile="/samples/src/containers/Components/Docs/excelexport.js">
    { snippets => {
      return (
        <div>
          <Panel>
            <Header>
              Excel Export
            </Header>
            <Body>
              { /* s1:start */ }
              <ExcelExportButton
                label="Export Excel"
                items={[{ website: 'cj.com', status: 'green' }, { website: 'cj.com/main', status: 'green' }]}
                headers={['website', 'status']}
                sheetName="website status"
                fileName="website.xlsx"
              />
              { /* s1:end */ }
              <Snippet tag="s1" src={snippets} />
            </Body>
          </Panel>
        </div>
      );
    }}
  </Demo>;
