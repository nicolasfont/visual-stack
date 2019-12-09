import React from 'react';
import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import { Demo, Snippet } from '../../../components/Demo';

/* s2:start */
import { Loader } from '@cjdev/visual-stack/lib/components/Loader';
/* s2:end */

export default () => (
  <Demo srcFile="/samples/src/containers/Components/Docs/loader.js">
    {snippets => {
      return (
        <div>
          <Panel>
            <Header>Basic List View</Header>
            <Body>
              <Snippet tag="s2" src={snippets} />
              {/* s1:start */}
              <Loader />
              {/* s1:end */}
              <Snippet tag="s1" src={snippets} />
            </Body>
          </Panel>
        </div>
      );
    }}
  </Demo>
);
