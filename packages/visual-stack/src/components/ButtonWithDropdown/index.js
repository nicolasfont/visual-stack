import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button.js';

import './styles.css';

export const ButtonWithDropdown = ({
  expanded,
  doExpand,
  buttonContent,
  children,
  className = '',
  renderButton = props => <Button {...props} />,
  ...rest
}) => (
  <div {...rest} className={`vs-dropdown-with-button ${className}`}>
    {renderButton({
      expanded,
      className: `vs-dropdown-with-button-button ${className}-button`,
      onClick: doExpand,
      children: buttonContent,
    })}

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
  renderButton: PropTypes.func,
};
