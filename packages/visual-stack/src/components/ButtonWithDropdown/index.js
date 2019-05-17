import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export const ButtonWithDropdown = ({
  expanded,
  doExpand,
  buttonContent,
  children,
  className = '',
  ButtonComponent,
  ...rest
}) => (
  <div className="vs-dropdown-with-button">
    <ButtonComponent
      {...rest}
      expanded={expanded}
      className={className}
      onClick={doExpand}
    >
      {buttonContent}
    </ButtonComponent>

    <div className={['vs-dropdown', expanded ? 'vs-visible' : ''].join(' ')}>
      {children}
    </div>
  </div>
);
ButtonWithDropdown.propTypes = {
  expanded: PropTypes.bool,
  doExpand: PropTypes.func,
  buttonContent: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  ButtonComponent: PropTypes.node,
};
ButtonWithDropdown.defaultProps = {
  ButtonComponent: 'button',
};
