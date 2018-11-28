import React from 'react';
import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import { Demo, Snippet } from '../../../components/Demo';

/* s2:start */
import Card from '@cjdev/visual-stack/lib/components/Card';
/* s2:end */

export default () =>
  <Demo srcFile="/samples/src/containers/Components/Docs/card.js">
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
              <Card href="https://cj.com" styles="additional-classes">Go to cj.com</Card>
              { /* s1:end */ }
              <Snippet tag="s1" src={snippets} />
            </Body>
          </Panel>
        </div>
      );
    }}
  </Demo>;
