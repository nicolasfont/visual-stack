import * as React from 'react';
import {Button} from './Button';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import './CollapsiblePanel.css';

export default class CollapsiblePanel extends React.Component {
  constructor(props) {
    super(props);

    const collapsed = props.initializedCollapsed === undefined ? true : props.initializedCollapsed;
    this.state = {collapsed};

    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed() {
    this.setState({collapsed: !this.state.collapsed});
  }

  render() {
    return (
      <div className="vs-collapsible-panel">
        <div className="vs-collapsible-panel-header">
          <Button type="icon"
                  className="vs-collapsible-panel-header-button"
                  onClick={this.toggleCollapsed}>
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
