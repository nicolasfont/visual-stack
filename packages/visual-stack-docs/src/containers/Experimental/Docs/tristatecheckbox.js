import React from 'react';
import { Demo, Snippet } from '../../../components/Demo';
import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import Text from '@cjdev/visual-stack/lib/experimental/Text';
/* s0:start */
import { TriStateCheckbox } from '@cjdev/visual-stack/lib/experimental/TriStateCheckbox';
/* s0:end */

export default () => {
  return (
    <Demo srcFile="/samples/src/containers/Experimental/Docs/tristatecheckbox.js">
      {snippets => (
        <div>
          <Panel>
            <Body>
              <Text>
                Checkboxes with 3 states: selected, unselected, and undefined.
                The state can be set with a single <code>value</code> property.
                Setting <code>value</code> to <code>0</code> unselects the
                checkbox. Setting <code>value</code> to <code>1</code> selects
                it. Setting <code>value</code> to any other value, shows it as
                undefined.
              </Text>
            </Body>
          </Panel>
          <Panel>
            <Header>Importing</Header>
            <Body>
              <Snippet tag="s0" src={snippets} />
            </Body>
          </Panel>
          <Panel>
            <Header>value property</Header>
            <Body>
              {/* s1:start */}
              <TriStateCheckbox value={1}></TriStateCheckbox> Selected
              {/* s1:end */}
              <Snippet tag="s1" src={snippets} />
              {/* s2:start */}
              <TriStateCheckbox value={-1}></TriStateCheckbox> Undefined
              {/* s2:end */}
              <Snippet tag="s2" src={snippets} />
              {/* s3:start */}
              <TriStateCheckbox value={0}></TriStateCheckbox> Unselected
              {/* s3:end */}
              <Snippet tag="s3" src={snippets} />
            </Body>
          </Panel>
          <Panel>
            <Header>Events</Header>
            <Body>
              {/* s4:start */}
              <TriStateCheckbox
                value={1}
                onClick={() => alert('Clicked!')}
              ></TriStateCheckbox>
              onClick
              {/* s4:end */}
              <Snippet tag="s4" src={snippets} />
            </Body>
          </Panel>
        </div>
      )}
    </Demo>
  );
};
