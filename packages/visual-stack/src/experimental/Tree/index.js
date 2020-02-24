import React from 'react';
import PropTypes from 'prop-types';
import { TriStateCheckbox } from '../TriStateCheckbox';
import './Tree.css';
import { withErrorBoundary } from '../../components/ErrorBoundary';

export class Tree extends React.Component {
  shouldComponentUpdate(nextProps) {
    const ts = nextProps.treeStructure;
    const nodeId = this.props.nodeId;
    if (nodeId === undefined || nodeId === ts.rootId()) return true;
    let parentId = ts.parent(nodeId);
    if (parentId === undefined) return true;
    if (!nextProps.expansion[parentId]) return false;
    if (nextProps.filterOut[parentId]) return false;
    return true;
  }

  render() {
    const props = this.props;
    const {
      treeStructure,
      rootVisible,

      expansion,
      selection,
      filterOut,
      highlight,

      onSelectionToggle,
      onExpansionToggle,
    } = props;

    const _nodeId = props._nodeId || props.treeStructure.rootId();
    const labelContent = props.labelContent || treeStructure.name;
    const children = (id, context) => treeStructure.children(id, context) || [];
    const onSelectionClick = event => {
      event.stopPropagation();
      if (onSelectionToggle) onSelectionToggle(_nodeId);
    };

    const onDetailsClick = event => {
      if (onExpansionToggle) {
        event.preventDefault();
        event.stopPropagation();
        onExpansionToggle(_nodeId);
      }
    };

    return (
      <div
        className={`${
          _nodeId === props.treeStructure.rootId() ? 'vs-tree' : ''
        } ${
          filterOut && filterOut[_nodeId]
            ? `vs-hidden ${props.className}`
            : props.className
        }`}
      >
        {rootVisible ? (
          children(_nodeId).length > 0 ? (
            <details open={expansion[_nodeId]} onClick={onDetailsClick}>
              <summary className={'vs-summary'}>
                <div className={'vs-labelContent'}>
                  <div>{labelContent(_nodeId, highlight)}</div>
                  <TriStateCheckbox
                    className={'vs-treecheckbox'}
                    value={selection[_nodeId]}
                    onClick={onSelectionClick}
                  />
                </div>
              </summary>
              <div className={'vs-treeChildren'}>
                {children(_nodeId).map(_nodeId => (
                  <Tree
                    {...{ ...props, _nodeId }}
                    key={_nodeId}
                    rootVisible={true}
                  />
                ))}
              </div>
            </details>
          ) : (
            <div className={'vs-leafContent'}>
              <div onClick={onSelectionClick}>
                {labelContent(_nodeId, highlight)}
              </div>
              <TriStateCheckbox
                className={'vs-treecheckbox'}
                value={selection[_nodeId]}
                onClick={onSelectionClick}
              />
            </div>
          )
        ) : (
          <div>
            {children(_nodeId).map(_nodeId => (
              <Tree
                {...{ ...props, _nodeId }}
                key={_nodeId}
                rootVisible={true}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

Tree.defaultProps = {
  rootVisible: false,
};

Tree.propTypes = {
  rootVisible: PropTypes.bool,
  labelContent: PropTypes.func,

  treeStructure: PropTypes.shape({
    rootId: PropTypes.func.isRequired,
    parent: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
    name: PropTypes.func,
  }).isRequired,

  selection: PropTypes.object.isRequired,
  expansion: PropTypes.object.isRequired,
  filterOut: PropTypes.object,
  highlight: PropTypes.string,

  onSelectionToggle: PropTypes.func,
  onExpansionToggle: PropTypes.func,
};

export default withErrorBoundary(Tree);
