import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button';
import './BlankSlate.css';
import IconExample from 'mdi-react/BlurIcon';

export const BlankSlate = ({ children, title, headerGraphic }) => {
  const img = headerGraphic || <IconExample />;
  const titleText = title || 'You do not have any content.';
  return (
    <div className="vs-bs-container">
      <div className="vs-bs-img">{img}</div>
      <h1 className="vs-bs-title">{titleText}</h1>
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
}) => {
  return (
    <div>
      <Button
        type="solid-primary"
        className="vs-bs-button-primary"
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
}) => {
  return (
    <div>
      <Button type="text" onClick={handler}>
        {label}
      </Button>
    </div>
  );
};

SecondaryActionButton.propTypes = {
  label: PropTypes.string,
  handler: PropTypes.func,
};
