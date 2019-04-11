import React from 'react';
import { isNil } from 'ramda';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './style.css';

const ListView = ({
  data,
  renderContent,
  onClick,
  renderHeader: Header,
  renderFooter: Footer,
}) => {
  const isClickable = !isNil(onClick);
  return (
    <div className="vs-list-view-container">
      {Header && (
        <div className="vs-list-view-header">
          <Header />
        </div>
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
      {Footer && (
        <div className="vs-list-view-footer">
          <Footer />
        </div>
      )}
    </div>
  );
};

ListView.propTypes = {
  data: PropTypes.array,
  renderContent: PropTypes.func,
  onClick: PropTypes.func,
  renderHeader: PropTypes.func,
  renderFooter: PropTypes.func,
};

export default ListView;
