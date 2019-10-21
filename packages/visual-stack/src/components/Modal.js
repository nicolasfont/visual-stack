import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

export class Modal extends React.Component {

  constructor(props) {
    super(props);

    this.children = props.children;
    this.onBackgroundClick = props.onBackgroundClick;
    this.onEscapeKeyUp = props.onEscapeKeyUp;
  }

  backgroundClick = (event, onBackgroundClick) => {
    if (event.target.matches('.modal')) {
      onBackgroundClick();
    }
  };

  keyUpHandler = (onEscapeKeyUp, e) => {
    if (e.keyCode === 27) {
      if(onEscapeKeyUp) onEscapeKeyUp()
    }
  };

  keyUpListener = (e) => this.keyUpHandler(this.onEscapeKeyUp, e);

  componentDidMount = () => {
    if (this.onEscapeKeyUp) {
      document.addEventListener("keyup", this.keyUpListener);
    }
  };

  componentWillUnmount = () => {
    if (this.onEscapeKeyUp) {
      document.removeEventListener("keyup", this.keyUpListener);
    }
  };

  render() {
    return (<div
      className="modal"
      style={{display: 'block'}}
      onClick={event =>
        this.onBackgroundClick ? this.backgroundClick(event, this.onBackgroundClick) : {}
      }
    >
      {this.children}
    </div>);
  }
}

export const Header = ({ title, children }) => (
  <div className="modal-header">
    {title && <h1>{title}</h1>}
    {children}
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
};

export const Dialog = ({ children }) => (
  <div className="modal-dialog">{children}</div>
);

export const Content = ({ children }) => (
  <div className="modal-content">{children}</div>
);

export const Body = ({ children }) => (
  <div className="modal-body">{children}</div>
);

export const Footer = ({ children }) => (
  <div className="modal-footer">{children}</div>
);

export const Backdrop = () => <div className="modal-backdrop fade in" />;
