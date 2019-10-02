import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button';
import './BlankSlate.css';
import IconExample from 'mdi-react/BlurIcon';

export const BlankSlate = ({
  children,
  title = 'You do not have any content.',
  headerGraphic = <IconExample />,
  className = '',
  ...restProps
}) => {
  return (
    <div {...restProps} className={`vs-bs-container ${className}`}>
      <div className="vs-bs-img">{headerGraphic}</div>
      <h1 className="vs-bs-title">{title}</h1>
      {children}
    </div>
  );
};

BlankSlate.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  headerGraphic: PropTypes.string,
};

export const Description = ({ children }) => (
  <p className="vs-bs-description-text">{children}</p>
);

export const PrimaryActionButton = ({
  label,
  handler = clickEvent => clickEvent,
  className = '',
  ...restProps
}) => {
  return (
    <div>
      <Button
        {...restProps}
        type="solid-primary"
        className={`vs-bs-button-primary ${className}`}
        onClick={handler}
      >
        {label}
      </Button>
    </div>
  );
};

PrimaryActionButton.propTypes = {
  label: PropTypes.string,
  handler: PropTypes.func,
};

export const SecondaryActionButton = ({
  label,
  handler = clickEvent => clickEvent,
  className = '',
  ...restProps
}) => {
  return (
    <div>
      <Button
        {...restProps}
        type="text"
        className={`vs-bs-button-secondary ${className}`}
        onClick={handler}
      >
        {label}
      </Button>
    </div>
  );
};

SecondaryActionButton.propTypes = {
  label: PropTypes.string,
  handler: PropTypes.func,
};
