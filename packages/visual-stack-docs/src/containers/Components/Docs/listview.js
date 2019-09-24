import React from 'react';
import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import { Demo, Snippet } from '../../../components/Demo';

/* s2:start */
import ListView from '@cjdev/visual-stack/lib/components/ListView';
/* s2:end */

export default () => (
  <Demo srcFile="/samples/src/containers/Components/Docs/listview.js">
    {snippets => {
      return (
        <div>
          <Panel>
            <Header>Basic List View</Header>
            <Body>
              <Snippet tag="s2" src={snippets} />
              {/* s1:start */}
              <ListView
                data={[
                  { firstName: 'Test', lastName: 'account' },
                  { firstName: 'Test2', lastName: 'account2' },
                  { firstName: 'Test3', lastName: 'account3' },
                ]}
                renderContent={item => (
                  <div>
                    <b>{item.firstName}</b>
                    <div>{item.lastName}</div>
                  </div>
                )}
              />
              {/* s1:end */}
              <Snippet tag="s1" src={snippets} />
            </Body>
          </Panel>
          <Panel>
            <Header>List View With OnClick Handler</Header>
            <Body>
              {/* s3:start */}
              <ListView
                data={[
                  { firstName: 'Test', lastName: 'account' },
                  { firstName: 'Test2', lastName: 'account2' },
                ]}
                renderContent={item => (
                  <div>
                    <b>{item.firstName}</b>
                    <div>{item.lastName}</div>
                  </div>
                )}
                onClick={item => {
                  // eslint-disable-next-line no-alert
                  window.alert(JSON.stringify(item));
                }}
              />
              {/* s3:end */}
              <Snippet tag="s3" src={snippets} />
            </Body>
          </Panel>
          <Panel>
            <Header>List View With Header and Footer</Header>
            <Body>
              {/* s4:start */}
              <ListView
                data={[{ firstName: 'Test', lastName: 'account' }]}
                renderContent={item => (
                  <div>
                    <b>{item.firstName}</b>
                    <div>{item.lastName}</div>
                  </div>
                )}
                renderHeader={() => <div>Header</div>}
                renderFooter={() => <div>Footer</div>}
              />
              {/* s4:end */}
              <Snippet tag="s4" src={snippets} />
            </Body>
          </Panel>
          <Panel>
            <Header>List View When Loading</Header>
            <Body>
              {/* s5:start */}
              <ListView
                isLoading
                renderHeader={() => <div>Header</div>}
                renderFooter={() => <div>Footer</div>}
              />
              {/* s5:end */}
              <Snippet tag="s5" src={snippets} />
            </Body>
          </Panel>
          <Panel>
            <Header>List View With Empty State</Header>
            <Body>
              {/* s6:start */}
              <ListView data={[]} />
              {/* s6:end */}
              <Snippet tag="s6" src={snippets} />
            </Body>
          </Panel>
          <Panel>
            <Header>List View With Custom Empty State</Header>
            <Body>
              {/* s7:start */}
              <ListView
                data={[]}
                renderHeader={() => <div>Header</div>}
                renderFooter={() => <div>Footer</div>}
                renderEmptyState={() => <div>There is no data.</div>}
              />
              {/* s7:end */}
              <Snippet tag="s7" src={snippets} />
            </Body>
          </Panel>
        </div>
      );
    }}
  </Demo>
);
