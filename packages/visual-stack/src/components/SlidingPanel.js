import React from 'react';
import classNames from 'classnames';
import './SlidingPanel.css';

export const ToggleIcon = ({ onClick }) => {
  return (
    <a className="sliding-panel-toggle-icon" onClick={onClick}>
      <i className="fa fa-sliders"></i>
    </a>
  );
};
ToggleIcon.propTypes = {
  onClick: React.PropTypes.func.isRequired,
};

export const SlidingPanelHeader = ({ children }) => {
  return (
    <li className="sliding-panel-header">
      { children }
    </li>
  );
};

export const SlidingPanelSection = ({ children }) => {
  return (
    <li className="sliding-panel-section">
      { children }
    </li>
  );
};

export const SlidingPanel = ({ children, active }) => {
  return (
    <div className={ classNames('sliding-panel', { active })}>
      <ul>
        { children }
      </ul>
    </div>
  );
};
SlidingPanel.propTypes = {
  active: React.PropTypes.bool,
};
