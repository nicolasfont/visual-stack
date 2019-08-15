import React from 'react';
import { Body, Header, Panel } from '@cjdev/visual-stack/lib/components/Panel';
import { Demo, Snippet } from '../../../components/Demo';
import { ExpandingInputButton } from '@cjdev/visual-stack/lib/components/ExpandingInputButton';

/* s1:start */
class CustomButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
      value: '',
    };
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.onInputClear = this.onInputClear.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputFocus() {
    this.setState(() => ({
      expanded: true,
    }));
  }

  onInputBlur() {
    this.state.value ||
      this.setState(() => ({
        expanded: false,
      }));
  }

  onInputClear() {
    this.setState(() => ({
      expanded: false,
      value: '',
    }));
  }

  onInputChange(event) {
    this.setState({ value: event.target.value });
  }
  /* s1:end */

  render() {
    return (
      <ExpandingInputButton
        expanded={this.state.expanded}
        onFocus={this.onInputFocus}
        onBlur={this.onInputBlur}
        onClear={this.onInputClear}
        onChange={this.onInputChange}
        placeholder={(this.state.expanded && 'Enter search query') || ''}
        value={this.state.value}
      />
    );
  }
}

export default () => (
  <Demo srcFile="/samples/src/containers/Components/Docs/expanding-input-button.js">
    {snippets => {
      return (
        <div>
          <Panel>
            <Header>
              <b>New</b> Expanding input button
            </Header>
            <Body>
              {/* s3:start */}
              <CustomButton />
              {/* s3:end */}
              The Expanding Input Button is a stateless component. Wrap it in a
              class component in order to use it:
              <Snippet tag="s1" src={snippets} />
              <Snippet tag="s3" src={snippets} />
            </Body>
          </Panel>
        </div>
      );
    }}
  </Demo>
);
