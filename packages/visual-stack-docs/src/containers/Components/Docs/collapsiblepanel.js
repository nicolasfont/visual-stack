import * as React from 'react';
import {Body, Panel} from "@cjdev/visual-stack/lib/components/Panel";
import {Button} from "@cjdev/visual-stack/lib/components/Button";
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import "./collapsiblepanel.css";

class CollapsiblePanel extends React.Component {
  constructor(props) {
    super(props);

    const collapsed = props.collapsed === undefined ? true : props.collapsed;
    this.state = {collapsed};

    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed() {
    this.setState({collapsed: !this.state.collapsed});
  }

  render() {
    return (
      <div>
        <div className="vs-collapsible-panel-header">
          <Button type="icon" onClick={this.toggleCollapsed}>
            {this.state.collapsed
              ? <ChevronRightIcon/>
              : <ChevronDownIcon/>}
          </Button>

          <span className="vs-collapsible-panel-header-title" onClick={this.toggleCollapsed}>
            {this.props.title}
          </span>
        </div>
        <div className="vs-collapsible-panel-item">
          {
            !this.state.collapsed &&
            this.props.children
          }
        </div>
      </div>
    );
  }
}

export default () => {
  return (
    <Panel>
      <Body>
      <CollapsiblePanel title={<h3 className="inline-remove-margin">Collapsible Panel title</h3>}>
        <div>Collapsible Panel item</div>
        <div>Collapsible Panel item 2</div>
      </CollapsiblePanel>

      <CollapsiblePanel title={<h3 className="inline-remove-margin">Collapsible Panel 2</h3>}>
        <div>Collapsible Panel item</div>
        <div>Collapsible Panel item 2</div>
      </CollapsiblePanel>
      </Body>
    </Panel>
  );
};
