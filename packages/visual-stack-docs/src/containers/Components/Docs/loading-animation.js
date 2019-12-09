import React from 'react';
import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import { Demo, Snippet } from '../../../components/Demo';
/* s1:start */
import LoadingAnimation from '@cjdev/visual-stack/lib/components/LoadingAnimation';
/* s1:end */

export default () => (
  <Demo srcFile="/samples/src/containers/Components/Docs/loading-animation.js">
    {snippets => {
      return (
        <div>
          <Panel>
            <Header>Loading Animation</Header>
            <Body>
              {/* s2:start */}
              <LoadingAnimation loadingMessage={'Loading Data...'} />
              {/* s2:end */}
              <Snippet tag="s1" src={snippets} />
              <Snippet tag="s2" src={snippets} />
            </Body>
          </Panel>
        </div>
      );
    }}
  </Demo>
);
