import React from 'react';
import { connect } from 'react-redux';

import { Backdrop } from '@cjdev/visual-stack/lib/components/Modal';

const ModalMountPointPure = ({ component: Component, props }) =>
  Component
    ? <div>
        <Component {...props} />
        <Backdrop />
      </div>
    : <div />;

export const ModalMountPoint = connect(state => ({
  component: state.visualStack.modal.component,
  props: state.visualStack.modal.props,
}))(ModalMountPointPure);
