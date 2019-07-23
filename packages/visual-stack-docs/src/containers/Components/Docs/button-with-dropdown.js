import * as R from 'ramda';
import React from 'react';
import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import { Demo, Snippet } from '../../../components/Demo';
import { Button } from '@cjdev/visual-stack/lib/components/Button';

/* s1:start */
import { ButtonWithDropdown } from '@cjdev/visual-stack/lib/components/ButtonWithDropdown';
/* s1:end */

export default () => (
  <Demo srcFile="/samples/src/containers/Components/Docs/button-with-dropdown.js">
    {snippets => {
      return (
        <div>
          <Panel>
            <Header>Button with Dropdown</Header>
            <Body>
              <Snippet tag="s1" src={snippets} />
              <p>
                A component that associates a button control with an expansible
                content area. The button can be customized either by passing in
                the new text or passing in a component to use instead of the
                button.
              </p>
              {/* s3:start */}
              <DropdownContainer />
              {/* s3:end */}
              <Snippet tag="s3" src={snippets} />
              <Snippet tag="s2" src={snippets} />
            </Body>
          </Panel>
        </div>
      );
    }}
  </Demo>
);

/* s2:start */
const CustomButton = ({ children, expanded, ...props }) => (
  <Button {...props} type="inline-outline-secondary">
    {children}
    {!expanded ? ' >' : ' v'}
  </Button>
);
class DropdownContainer extends React.Component {
  state = {
    expanded: false,
  };

  doExpand() {
    this.setState(() => ({
      expanded: !this.state.expanded,
    }));
  }

  render() {
    return (
      <ButtonWithDropdown
        expanded={this.state.expanded}
        doExpand={() => this.doExpand()}
        renderButton={CustomButton}
        buttonContent="Expand"
        className="dropdown-demo"
        id="range-dropdown"
      >
        <div
          style={{
            width: '40em',
          }}
        >
          <ul>
            {R.map(
              v => (
                <li key={v}>Item {v}</li>
              ),
              R.range(0, 24)
            )}
          </ul>
        </div>
      </ButtonWithDropdown>
    );
  }
}
/* s2:end */
