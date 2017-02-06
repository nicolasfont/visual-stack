import React from 'react';
import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import { Button } from '@cjdev/visual-stack/lib/components/Button';
import { parse, trimLeadingWhiteSpace } from './snippetParser';

const Snippet = ({ tag, src }) => {
  if (!src[tag]) return null;
  return (
    <pre>
      { trimLeadingWhiteSpace(src[tag]).join('\n') }
    </pre>
  );
};

class ButtonDemo extends React.Component {

  constructor() {
    super();
    this.state = {
      src: {},
      srcFile: '/samples/button.js',
    };
  }

  componentDidMount() {
    fetch(this.state.srcFile)
      .then(res => res.text())
      .then(src => this.setState({
        src: parse(src),
      }));
  }

  render() {
    return (
      <div>
        <Panel>
          <Header>
            Default Buttons
          </Header>
          <Body>
            { /* s2:start */ }
              <Button type="solid-primary">Solid Primary</Button>
              <Button type="primary">Primary</Button>
              <Button type="success">Success</Button>
              <Button type="info">Info</Button>
              <Button type="default">Default</Button>
              <Button type="warning">Warning</Button>
              <Button type="danger">Danger</Button>
            { /* s2:end */ }
            <Snippet tag="s2" src={this.state.src} />
          </Body>
        </Panel>

        <Panel>
          <Header>
            Large Buttons
          </Header>
          <Body>
            { /* s1:start */ }
              <Button type="primary" large={true}>Primary</Button>
            { /* s1:end */ }
            <Snippet tag="s1" src={this.state.src} />
          </Body>
        </Panel>
      </div>
    );
  }
}

export default ButtonDemo;
