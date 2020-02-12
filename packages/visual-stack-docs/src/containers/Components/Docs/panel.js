import React from 'react';
import {
  Panel,
  Body,
  Header,
  Footer,
} from '@cjdev/visual-stack/lib/components/Panel';
import { Demo, Snippet } from '../../../components/Demo';

export default () => (
  <Demo srcFile="/samples/src/containers/Components/Docs/panel.js">
    {snippets => {
      return (
        <div>
          {/* s1:start */}
          <Panel>
            <Header>Panel Header</Header>
            <Body>
              This is the Panel Body.
              <Snippet tag="s1" src={snippets} />
            </Body>
            <Footer>Panel Footer</Footer>
          </Panel>
          {/* s1:end */}
          <Panel>
            <Header>Body padding</Header>
            {/* s2:start */}
            <Body padding="large">
              This is the Panel Body with 32px padding.
              <Snippet tag="s2" src={snippets} />
            </Body>
            {/* s2:end */}
            {/* s3:start */}
            <Body>
              This a normal Panel Body.
              <Snippet tag="s3" src={snippets} />
            </Body>
            {/* s3:end */}
            {/* s4:start */}
            <Body padding="none">
              This is the Panel Body with no padding.
              <Snippet tag="s4" src={snippets} />
            </Body>
            {/* s4:end */}
          </Panel>
        </div>
      );
    }}
  </Demo>
);
