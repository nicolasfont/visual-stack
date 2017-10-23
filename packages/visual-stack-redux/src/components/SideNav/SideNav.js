/** @prettier */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LogoutLink, SideNav as BaseSideNav, UserIcon } from '@cjdev/visual-stack/lib/components/SideNav';
import { LinkGroup } from './LinkGroup';
import { toggleSideNav } from '../../actions';

export const UserMenu = ({ onLogout, label, firstInitial, lastInitial, color }) => (
  <LinkGroup
    className="sidenav-user-menu"
    label={label}
    icon={<UserIcon firstInitial={firstInitial} lastInitial={lastInitial} color={color} />}
  >
    <LogoutLink onLogout={onLogout} />
  </LinkGroup>
);

export class InternalSideNav extends Component {
  static propTypes = {
    collapsed: PropTypes.bool,
  };
  constructor(props) {
    super(props);
  }
  render() {
    const userMenuWithColor =
      React.cloneElement(this.props.userMenu, {
        color: this.props.logoBackground,
      });
    return (
      <BaseSideNav
        collapsed={this.props.collapsed}
        onClick={this.props.toggleSideNav}
        logo={this.props.logo}
        userMenu={userMenuWithColor}
        {...this.props}
      >
        {this.props.children}
      </BaseSideNav>
    );
  }
}

export const SideNav = connect(
  state => ({
    collapsed: state.visualStack.sideNav.collapsed,
  }),
  {
    toggleSideNav,
  }
)(InternalSideNav);
