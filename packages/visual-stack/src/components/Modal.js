import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const backgroundClick = (event, onBackgroundClick) => {
  if (event.target.matches('.modal')) {
    onBackgroundClick();
  }
};

export const Modal = ({ children, onBackgroundClick, ...restProps }) => (
  <div
    {...restProps}
    className="modal"
    style={{ display: 'block' }}
    onClick={event =>
      onBackgroundClick ? backgroundClick(event, onBackgroundClick) : {}
    }
  >
    {children}
  </div>
);

export const Header = ({ title, children, ...restProps }) => (
  <div {...restProps} className="modal-header">
    {title && <h1>{title}</h1>}
    {children}
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
};

export const Dialog = ({ children, ...restProps }) => (
  <div {...restProps} className="modal-dialog">
    {children}
  </div>
);

export const Content = ({ children, ...restProps }) => (
  <div {...restProps} className="modal-content">
    {children}
  </div>
);

export const Body = ({ children, ...restProps }) => (
  <div {...restProps} className="modal-body">
    {children}
  </div>
);

export const Footer = ({ children, ...restProps }) => (
  <div {...restProps} className="modal-footer">
    {children}
  </div>
);

export const Backdrop = props => (
  <div {...props} className="modal-backdrop fade in" />
);
