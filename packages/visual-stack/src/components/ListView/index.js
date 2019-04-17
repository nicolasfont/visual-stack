import React from 'react';
import { isNil } from 'ramda';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withErrorBoundary } from '../ErrorBoundary';

import './style.css';

const ListView = ({
  data,
  renderContent,
  onClick,
  renderHeader,
  renderFooter,
}) => {
  const isClickable = !isNil(onClick);
  return (
    <div className="vs-list-view-container">
      {renderHeader && (
        <div className="vs-list-view-header">{renderHeader()}</div>
      )}
      <div className="vs-list-view">
        {data.map((item, index) => (
          <div
            key={item.id || index}
            className={classNames({
              'vs-list-item': true,
              'vs-list-item-clickable': isClickable,
            })}
            onClick={isClickable ? () => onClick(item) : undefined}
          >
            {renderContent(item)}
          </div>
        ))}
      </div>
      {renderFooter && (
        <div className="vs-list-view-footer">{renderFooter()}</div>
      )}
    </div>
  );
};

ListView.propTypes = {
  data: PropTypes.array.isRequired,
  renderContent: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  renderHeader: PropTypes.func,
  renderFooter: PropTypes.func,
};

export default withErrorBoundary(ListView);
