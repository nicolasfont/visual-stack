/** @prettier */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { toggleSideNavLinkGroup, toggleSideNav } from '../../actions';

import { LinkGroup as BaseLinkGroup } from '@cjdev/visual-stack/lib/components/SideNav';

export class InternalLinkGroup extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    if (this.props.initialActive) {
      this.props.toggleSideNavLinkGroup(
        this.props.initialActive,
        this.props.label
      );
    }
  }

  render() {
    const expanded =
      R.view(
        R.lensPath([this.props.label, 'expanded']),
        this.props.linkGroups
      ) || false;
    return (
      <BaseLinkGroup
        expanded={expanded}
        onClick={this.props.toggleSideNavLinkGroup}
        {...this.props}
      >
        {this.props.children}
      </BaseLinkGroup>
    );
  }
}

const mapState = state => ({
  linkGroups: state.visualStack.sideNav.linkGroups,
  collapsed: state.visualStack.sideNav.collapsed,
});

export const LinkGroup = connect(
  mapState,
  {
    toggleSideNav,
    toggleSideNavLinkGroup,
  }
)(InternalLinkGroup);
