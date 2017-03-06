import React from 'react';
import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import { Demo, Snippet } from './Demo';

import { SlidingPanel, SlidingPanelSection, SlidingPanelHeader, ToggleIcon } from '@cjdev/visual-stack/lib/components/SlidingPanel';

class SlidingPanelDemo extends React.Component {
  constructor() {
    super();
    /* s1:start */
    this.state = {
      panelActive: false,
    };
    /* s1:end */
  }

  render() {
    return (
      <Demo srcFile="/samples/slidingpanel.js">
        { snippets => {
          return (
            <div>
              <Panel>
                <Header>
                  <div>
                    The SlidingPanel displays and hides based on the <code>active</code> prop.
                  </div>
                </Header>
                <Body>

                  { /* s2:start */ }
                  <ToggleIcon
                    onClick={() => {
                      this.setState({ panelActive: !this.state.panelActive });
                    }}
                  />
                  { /* s2:end */ }
                  { /* s3:start */ }
                  <SlidingPanel active={this.state.panelActive}>
                    <SlidingPanelHeader>
                      sliding panel header
                    </SlidingPanelHeader>
                    <SlidingPanelSection>
                      <div>
                        Section #2 in div
                      </div>
                    </SlidingPanelSection>
                    <SlidingPanelSection>
                      <div>
                        Section #3 in div
                      </div>
                    </SlidingPanelSection>
                  </SlidingPanel>
                  { /* s3:end */ }
                  <Snippet tag="s1" src={snippets} />
                  <Snippet tag="s2" src={snippets} />
                  <Snippet tag="s3" src={snippets} />
                </Body>
              </Panel>
            </div>
          );
        }}
      </Demo>
    );
  }
}

export default SlidingPanelDemo;

