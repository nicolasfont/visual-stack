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
  ...restProps
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
      `vs-box-padding-right-${
        paddingRight === true ? 'default' : paddingRight
      }`,
    paddingTop &&
      `vs-box-padding-top-${paddingTop === true ? 'default' : paddingTop}`,
    alignItems && `vs-box-align-items-${alignItems}`,
    justifyContent && `vs-box-justify-content-${justifyContent}`,
    grow && 'vs-box-grow',
    className
  );
  return (
    <div {...restProps} className={classes}>
      {children}
    </div>
  );
};

Box.defaultProps = {
  direction: 'row',
};

Box.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  direction: PropTypes.oneOf(['column', 'row']),
  alignItems: PropTypes.oneOf(['start', 'center', 'end']),
  justifyContent: PropTypes.oneOf([
    'start',
    'center',
    'end',
    'space-around',
    'space-between',
    'space-evenly',
  ]),
  border: PropTypes.bool,
  gap: PropTypes.oneOf([true, 'small', 'large']),
  grow: PropTypes.bool,
  padding: PropTypes.oneOf([true, 'small', 'large']),
  paddingBottom: PropTypes.oneOf([true, 'small', 'large']),
  paddingLeft: PropTypes.oneOf([true, 'small', 'large']),
  paddingRight: PropTypes.oneOf([true, 'small', 'large']),
  paddingTop: PropTypes.oneOf([true, 'small', 'large']),
};

export default Box;
