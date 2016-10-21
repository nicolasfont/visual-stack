import React from 'react';
import { connect } from 'react-redux';
import { Modal } from '@cjdev/visual-stack';
const Backdrop = Modal.Backdrop;

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
