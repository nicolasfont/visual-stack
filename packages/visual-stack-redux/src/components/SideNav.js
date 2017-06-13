import React, { Component, PropTypes } from 'react';
import R from 'ramda';
import { connect } from 'react-redux';
import {
  SideNav as BaseSideNav,
  Header as BaseHeader,
  SideNavIcon as BaseIcon,
  Link as BaseLink,
  LinkGroup as BaseLinkGroup,
} from '@cjdev/visual-stack/lib/components/SideNav';
import { toggleSideNavLinkGroup, toggleSideNav } from '../actions';

export class InternalSideNav extends Component {
  static propTypes = {
    collapsed: PropTypes.bool,
  };
  constructor(props) {
    super(props);
  }
  render() {
    const mapWithChildren = React.Children.map(this.props.children, (child) => React.cloneElement(child, {something: this.props.toggleSideNav}));
    return (
      <BaseSideNav
        collapsed={this.props.collapsed}
        onClick={this.props.toggleSideNav}
        >
        { mapWithChildren }
      </BaseSideNav>
    );
  }
}
export const SideNav = connect(
  state => ({ collapsed: state.visualStack.sideNav.collapsed }),
    { toggleSideNav },
    (ownProps, stateProps, dispatchProps) => Object.assign({}, ownProps, stateProps, dispatchProps),
    {pure: false}
)(InternalSideNav);

export class InternalLinkGroup extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
  }
  render() {
    const expanded = R.view(R.lensPath([this.props.label, 'expanded']), this.props.linkGroups) || false;
    return (
      <BaseLinkGroup
        icon={this.props.icon}
        label={this.props.label}
        expanded={expanded}
        something={this.props.toggleSideNav}
        onClick={() => this.props.toggleSideNavLinkGroup(this.props.label) }
      >
        { this.props.children }
      </BaseLinkGroup>
    );
  }
}
const mapState = state => ({ linkGroups: state.visualStack.sideNav.linkGroups });

export const LinkGroup = connect(mapState,
                                { toggleSideNavLinkGroup, toggleSideNav },
                                (ownProps, stateProps, dispatchProps) => Object.assign({}, ownProps, stateProps, dispatchProps),
                                {pure: false}
                                )(InternalLinkGroup);


export const Header = BaseHeader;
export const Link = BaseLink;
export const SideNavIcon = BaseIcon;

