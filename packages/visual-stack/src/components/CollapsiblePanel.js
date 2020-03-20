import * as React from 'react';
import { Button } from './Button';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import classnames from 'classnames';
import './CollapsiblePanel.css';
import PropTypes from 'prop-types';

const paddingSize = {
  LARGE: 'large',
};

export class CollapsiblePanel extends React.Component {
  constructor(props) {
    super(props);

    const collapsed =
      props.initializedCollapsed === undefined
        ? true
        : props.initializedCollapsed;
    this.state = { collapsed };

    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const displayLargePadding = this.props.padding === paddingSize.LARGE;

    const panelClassNames = classnames({
      'vs-collapsible-panel': true,
      'vs-collapsible-panel-padding-large': displayLargePadding,
    });

    return (
      <div
        className={`${panelClassNames} ${
          this.props.className ? this.props.className : ''
        }`}
        {...this.props}
      >
        <div className="vs-collapsible-panel-header">
          <Button
            type="icon"
            className="vs-collapsible-panel-header-button"
            onClick={this.toggleCollapsed}
          >
            {this.state.collapsed ? <ChevronRightIcon /> : <ChevronDownIcon />}
          </Button>
          <div className="vs-collapsible-panel-icon-container">
            {this.props.titleIcon}
          </div>
          <span
            className="vs-collapsible-panel-header-title"
            onClick={this.toggleCollapsed}
          >
            {this.props.title}
          </span>
        </div>
        {!this.state.collapsed && (
          <div className="vs-collapsible-panel-item">
            {this.props.titleIcon && (
              <div className="vs-collapsible-panel-icon-placeholder" />
            )}
            <div className="vs-collapsible-panel-item-content">
              {this.props.children}
            </div>
          </div>
        )}
      </div>
    );
  }
}

CollapsiblePanel.prototypes = {
  padding: PropTypes.oneOf([paddingSize.LARGE]),
};

export default CollapsiblePanel;
