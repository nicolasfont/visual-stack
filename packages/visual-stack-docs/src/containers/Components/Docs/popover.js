import React from 'react';
import {Body, Header, Panel} from '@cjdev/visual-stack/lib/components/Panel';
import {Demo, Snippet} from '../../../components/Demo';
/* s1:start */
import Popover from "@cjdev/visual-stack/lib/components/Popover";
/* s1:end */

export default () => (
  <Demo srcFile="/samples/src/containers/Components/Docs/popover.js">
    {snippets => {
      return (
        <div>
          <Panel>
            <Header>Popover</Header>
            <Body>
              {/* s2:start */}
              <Popover/>
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
