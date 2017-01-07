import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sidebar as Nav } from '@cjdev/visual-stack';
import { toggleNavGroup, createNavGroupKey } from '../actions.js';

export class InternalNavGroup extends Component {
  constructor(props) {
    super(props);
    this.props.registerNavGroup(this.props.name);
  }

  render() {
    const { toggleNavGroup, storeState, children, name } = this.props;
    return (
      <Nav.NavGroup onNavGroupClick={() => { toggleNavGroup(name); } }
        open={storeState[name]}
        {...this.props}>
        { children }
      </Nav.NavGroup>
    );
  }
}

export const NavItem = ({ label, grouped = false, expanded= false, linkTo }) => {
  return <Nav.NavItem label={label} grouped={grouped} expanded={expanded} linkTo={linkTo}/>;
};

const mapDispatchToProps = dispatch => {
  return {
    toggleNavGroup: name => dispatch(toggleNavGroup(name)),
    registerNavGroup: name => dispatch(createNavGroupKey(name)),
  };
};

const mapStateToProps = state => ({
  storeState: state.visualStack.navGroupDropdown,
});

export const NavGroup = connect(mapStateToProps, mapDispatchToProps)(InternalNavGroup);
export const Sidebar = Nav.Sidebar;
