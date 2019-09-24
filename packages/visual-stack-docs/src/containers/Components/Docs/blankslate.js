import React from 'react';
import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import { Demo, Snippet } from '../../../components/Demo';
import IconExample from 'mdi-react/BlurIcon';

import {
  BlankSlate,
  PrimaryActionButton,
  SecondaryActionButton,
  Description,
} from '@cjdev/visual-stack/lib/components/BlankSlate';

export default () => (
  <Demo srcFile="/samples/src/containers/Components/Docs/blankslate.js">
    {snippets => {
      return (
        <div>
          <Panel>
            <Header>Blank Slate - Basic Example</Header>
            <Body>
              {/* s0:start */}
              <BlankSlate />
              {/* s0:end */}
              <Snippet tag="s0" src={snippets} />
            </Body>
          </Panel>
          <Panel>
            <Header>Blank Slate - Full Example</Header>
            <Body>
              {/* s1:start */}
              <BlankSlate
                title="Start adding your promotional properties to build your network."
                headerGraphic={<IconExample />}
              >
                <Description>
                  Promotional properties are websites and social media accounts
                  that you’d like to promote on the network.
                </Description>
                <PrimaryActionButton
                  label="Add New Property"
                  handler={clickEvent => clickEvent}
                />
                <SecondaryActionButton
                  label="Need Help?"
                  handler={clickEvent => clickEvent}
                />
              </BlankSlate>
              {/* s1:end */}
              <Snippet tag="s1" src={snippets} />
            </Body>
          </Panel>
          <Panel>
            <Header>
              Blank Slate - No Interaction, Default Title, Long Description
            </Header>
            <Body>
              {/* s3:start */}
              <BlankSlate headerGraphic={<IconExample />}>
                <Description>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Description>
              </BlankSlate>
              {/* s3:end */}
              <Snippet tag="s3" src={snippets} />
            </Body>
          </Panel>
        </div>
      );
    }}
  </Demo>
);
