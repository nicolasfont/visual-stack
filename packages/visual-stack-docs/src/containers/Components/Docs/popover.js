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
              <div style={{margin: "75px 200px"}}>
                <Popover shown={true} placement={"right"} content={<span style={{color: "red"}}>This is the content</span>}>
                  <button type="button">
                    I'm the reference element
                  </button>
                </Popover>
              </div>
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
