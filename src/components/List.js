import './List.css';

import { map } from 'ramda';
import React, { PropTypes } from 'react';

export const List = ({ children }) =>
  <div>{children}</div>;

export const Toolbar = ({ title }) =>
  <div className="list-toolbar toolbar-widget-header">
    {title && <span className="list-toolbar-title">{title}</span>}
  </div>;
Toolbar.propTypes = {
  title: PropTypes.string,
};

const renderHeaderCell = ({ width, alignment, text }) =>
  <Cell key={text} width={width}>
    <div className={`list-header-label text-${alignment || 'left'}`}>
      {text}
    </div>
  </Cell>;

export const Header = ({ labels }) =>
  <div className="list-header">
    <Row>{map(renderHeaderCell, labels)}</Row>
  </div>;
Header.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.shape({
    alignment: PropTypes.oneOf(['left', 'center', 'right']),
    width: PropTypes.number,
    text: PropTypes.string.isRequired,
  })).isRequired,
};

export const Rows = ({ children }) =>
  <div className="list-rows">
    {children}
  </div>;

export const Row = ({ children }) =>
  <div className="list-row">
    <div className="container-fluid">
      <div className="row">
        {children}
      </div>
    </div>
  </div>;

const ExpandedRowPanel = ({ children }) =>
  <div className="list-row-expanded">
    {children}
  </div>;

export const ExpandedRow = ({ children, expansion }) =>
  <div className="list-row">
    <div className="container-fluid">
      <div className="row">
        {children}
      </div>
      {expansion && <ExpandedRowPanel>{expansion}</ExpandedRowPanel>}
    </div>
  </div>;

export const Cell = ({ width, children }) =>
  <div className={`list-cell col-xs-${width || 1}`}>
    {children}
  </div>;
Cell.propTypes = {
  width: PropTypes.number,
};
