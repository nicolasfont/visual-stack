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
    className="modal"
    style={{ display: 'block' }}
    onClick={event =>
      onBackgroundClick ? backgroundClick(event, onBackgroundClick) : {}
    }
    {...restProps}
  >
    {children}
  </div>
);

export const Header = ({ title, children, ...restProps }) => (
  <div className="modal-header" {...restProps}>
    {title && <h1>{title}</h1>}
    {children}
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
};

export const Dialog = ({ children, ...restProps }) => (
  <div className="modal-dialog" {...restProps}>
    {children}
  </div>
);

export const Content = ({ children, ...restProps }) => (
  <div className="modal-content" {...restProps}>
    {children}
  </div>
);

export const Body = ({ children, ...restProps }) => (
  <div className="modal-body" {...restProps}>
    {children}
  </div>
);

export const Footer = ({ children, ...restProps }) => (
  <div className="modal-footer" {...restProps}>
    {children}
  </div>
);

export const Backdrop = props => (
  <div className="modal-backdrop fade in" {...props} />
);
