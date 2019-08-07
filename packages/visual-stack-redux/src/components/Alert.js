import React from 'react';
import { connect } from 'react-redux';

const AlertMountPointPure = ({ component: Component, props }) =>
  Component ? (
    <div>
      <Component {...props} />
    </div>
  ) : (
    <div />
  );

export const AlertMountPoint = connect(state => ({
  component: state.visualStack.alert.component,
  props: state.visualStack.alert.props,
}))(AlertMountPointPure);
