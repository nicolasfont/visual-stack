import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './Box.css';

const Box = ({
  alignItems,
  border,
  children,
  className,
  direction,
  gap,
  grow,
  justifyContent,
  padding,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
}) => {
  const classes = classNames(
    'vs-box',
    `vs-box-direction-${direction}`,
    border && 'vs-box-border',
    gap && `vs-box-gap-${gap === true ? 'default' : gap}`,
    padding && `vs-box-padding-${padding === true ? 'default' : padding}`,
    paddingBottom &&
      `vs-box-padding-bottom-${
        paddingBottom === true ? 'default' : paddingBottom
      }`,
    paddingLeft &&
      `vs-box-padding-left-${paddingLeft === true ? 'default' : paddingLeft}`,
    paddingRight &&
      `vs-box-padding-right-${paddingRight == true ? 'default' : paddingRight}`,
    paddingTop &&
      `vs-box-padding-top-${paddingTop === true ? 'default' : paddingTop}`,
    alignItems && `vs-box-align-items-${alignItems}`,
    justifyContent && `vs-box-justify-content-${justifyContent}`,
    grow && 'vs-box-grow',
    className
  );
  return <div className={classes}>{children}</div>;
};

Box.defaultProps = {
  direction: 'row',
};

Box.propTypes = {
  alignItems: PropTypes.oneOf(['center']),
  border: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  direction: PropTypes.oneOf(['column', 'row']),
  gap: PropTypes.oneOf([true, 'small', 'large']),
  grow: PropTypes.bool,
  justifyContent: PropTypes.oneOf(['center']),
  padding: PropTypes.oneOf([true, 'small', 'large']),
  paddingBottom: PropTypes.oneOf([true, 'small', 'large']),
  paddingLeft: PropTypes.oneOf([true, 'small', 'large']),
  paddingRight: PropTypes.oneOf([true, 'small', 'large']),
  paddingTop: PropTypes.oneOf([true, 'small', 'large']),
};

export default Box;
