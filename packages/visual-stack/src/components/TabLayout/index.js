/* eslint-disable no-unused-vars */
import React from 'react';
import * as R from 'ramda';
import './TabLayout.css';

const toArray = maybeArray => R.flatten([maybeArray]);

export class TabLayout extends React.Component {
  constructor(props) {
    super(props);
    this.isSelected = this.isSelected.bind(this);
  }

  isSelected(index) {
    return index === this.props.selectedIndex;
  }

  render() {
    const { floatingHeader, headerHeight, headerWidth } = this.props;
    const children = toArray(this.props.children);
    const tabs = R.filter(R.identity, children);
    const labelMap = tabs.map((tab, index) => {
      return (
        <TabLabel
          {...tab.props}
          key={index}
          tabIndex={index}
          themeColor={this.props.themeColor}
          onTabClick={this.props.onTabClick}
          onSelectClick={this.props.selectTab}
          isSelected={this.isSelected}
        >
          {tab.props.label}
        </TabLabel>
      );
    });
    const contentMap = tabs.map((tab, index) => {
      return (
        <div key={index} hidden={!this.isSelected(index)}>
          {tab.props.content}
        </div>
      );
    });
    return (
      <div>
        <TabHeader floatingHeader={floatingHeader} headerWidth={headerWidth}>
          {labelMap}
        </TabHeader>
        <TabBody floatingHeader={floatingHeader} headerHeight={headerHeight}>
          {contentMap}
        </TabBody>
      </div>
    );
  }
}

export const Tab = ({ label, content, disabled }) => {};

class TabLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseOver() {
    this.setState({ hover: true });
  }

  onMouseLeave() {
    this.setState({ hover: false });
  }

  render() {
    const {
      children,
      disabled,
      tabIndex,
      onTabClick,
      onSelectClick,
      isSelected,
      themeColor,
      ...restProps
    } = this.props;
    const selected = isSelected(tabIndex);

    const labelStateClassName = disabled
      ? 'vs-tab-label-disabled'
      : selected
      ? 'vs-tab-label-clicked'
      : '';
    const labelClassName = `vs-tab-label ${labelStateClassName}`;

    const accentColor = themeColor || '#49c5b1';

    const hoverStyle = disabled
      ? {}
      : selected
      ? {}
      : this.state.hover
      ? { color: accentColor, cursor: 'pointer' }
      : { color: '#888' };

    const labelStyle = selected
      ? { borderBottom: `4px solid ${accentColor}` }
      : {};

    return (
      <div
        {...restProps}
        className={labelClassName}
        onClick={event => {
          if (!disabled) {
            onSelectClick(event, tabIndex);
            if (onTabClick) onTabClick();
          }
        }}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
        style={hoverStyle}
      >
        <div style={labelStyle}>{children}</div>
      </div>
    );
  }
}

export const TabLabelContent = props => (
  <div className="vs-tab-label-content standard">{props.children}</div>
);

const TabHeader = ({ children, floatingHeader, headerWidth, ...restProps }) => {
  const floatingClassName = floatingHeader ? 'vs-tab-header-floating' : '';
  const headerClassName = `vs-tab-header ${floatingClassName}`;
  const headerCss = floatingHeader ? { width: `${headerWidth}` } : {};
  return (
    <div {...restProps} className={headerClassName} style={headerCss}>
      {children}
    </div>
  );
};

const TabBody = ({ children, floatingHeader, headerHeight, ...restProps }) => {
  const headerHeightCss = floatingHeader
    ? { paddingTop: `${headerHeight}` }
    : {};
  return (
    <div {...restProps} className="vs-tab-body" style={headerHeightCss}>
      {children}
    </div>
  );
};

export const TabContent = props => (
  <div className="vs-tab-content standard">{props.children}</div>
);
