import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { connect } from 'react-redux';
import {
  SlidingPanel as BaseSlidingPanel,
  SlidingPanelHeader as BaseSlidingPanelHeader,
  SlidingPanelSection as BaseSlidingPanelSection,
  SlidingPanelDropdown as BaseSlidingPanelDropdown,
  ToggleIcon as BaseToggleIcon,
} from '@cjdev/visual-stack/lib/components/SlidingPanel';
import {
  toggleSlidingPanel,
  expandFilterDropdown,
  hideFilterDropdown,
  toggleFilterDropdown,
  setSlidingPanelActiveState,
} from '../actions';

const useFirstDefinedValue = (...values) =>
  R.reduce((acc, val) => (acc !== undefined ? acc : val), undefined, values);

export const slidingPanelLens = R.lensPath(['visualStack', 'slidingPanel']);
export const slidingPanelActiveLens = R.compose(
  slidingPanelLens,
  R.lensPath(['active'])
);

export class InternalSlidingPanel extends Component {
  constructor(props) {
    super(props);
    if (this.props.syncStateToOpen) {
      this.props.setSlidingPanelActiveState(true);
    }
  }

  render() {
    const { active = false, children, ...restProps } = this.props;
    return (
      <div className="vs-internal-sliding-panel">
        <BaseSlidingPanel active={active} {...restProps}>
          {children}
        </BaseSlidingPanel>
      </div>
    );
  }
}

InternalSlidingPanel.propTypes = {
  active: PropTypes.bool,
  initialActive: PropTypes.bool,
  children: PropTypes.any,
  toggleSlidingPanel: PropTypes.func,
  setSlidingPanelActiveState: PropTypes.func,
};

export const slidingPanelStateToProps = (state, ownProps) => {
  const initialActive = ownProps.initialActive;
  const activeState = R.view(slidingPanelActiveLens, state);
  const active = useFirstDefinedValue(activeState, initialActive);
  const syncStateToOpen = !!(activeState === undefined && initialActive);

  return { active, syncStateToOpen };
};

export const SlidingPanel = connect(
  slidingPanelStateToProps,
  { toggleSlidingPanel, setSlidingPanelActiveState }
)(InternalSlidingPanel);

export class InternalToggleIcon extends Component {
  constructor(props) {
    super(props);
    const eventSupportsPropagation = R.view(
      R.lensPath(['nativeEvent', 'stopImmediatePropagation'])
    );
    this.handleClick = e => {
      if (eventSupportsPropagation(e)) e.nativeEvent.stopImmediatePropagation();
      this.props.toggleSlidingPanel();
    };
  }

  render() {
    return (
      <BaseToggleIcon
        {...R.dissoc('toggleSlidingPanel', this.props)}
        onClick={e => this.handleClick(e)}
      />
    );
  }
}

InternalToggleIcon.propTypes = {
  toggleSlidingPanel: PropTypes.func,
};

const makeExpandedLens = ({ id }) => R.lensPath([id, 'expanded']);

export class InternalSlidingPanelDropdown extends Component {
  constructor(props) {
    super(props);
    if (props.syncStateToOpen) {
      this.props.expandFilterDropdown();
    }
  }
  render() {
    const { children, ...restProps } = this.props;
    return (
      <BaseSlidingPanelDropdown {...restProps}>
        {children}
      </BaseSlidingPanelDropdown>
    );
  }
}

InternalSlidingPanelDropdown.propTypes = {
  slidingPanel: PropTypes.object,
  id: PropTypes.string.isRequired,
  initialActive: PropTypes.bool,
  label: PropTypes.any,
  children: PropTypes.any,
  toggleFilterDropdown: PropTypes.func,
  styles: PropTypes.object,
  expandFilterDropdown: PropTypes.func,
  hideFilterDropdown: PropTypes.func,
};

export const slidingPanelDropdownStateToProps = (state, ownProps) => {
  const initialActive = ownProps.initialActive;
  const expandedState = R.view(
    R.compose(
      slidingPanelLens,
      makeExpandedLens(ownProps)
    ),
    state
  );
  const expanded = useFirstDefinedValue(expandedState, initialActive);
  const syncStateToOpen = !!(expandedState === undefined && initialActive);

  return { expanded, syncStateToOpen };
};

export const SlidingPanelDropdown = connect(
  slidingPanelDropdownStateToProps,
  (dispatch, { id }) => ({
    expandFilterDropdown() {
      dispatch(expandFilterDropdown(id));
    },
    hideFilterDropdown() {
      dispatch(hideFilterDropdown(id));
    },
    onClick() {
      dispatch(toggleFilterDropdown(id));
    },
  })
)(InternalSlidingPanelDropdown);

export const ToggleIcon = connect(
  state => ({ toggleIconState: R.view(slidingPanelActiveLens, state) }),
  { toggleSlidingPanel }
)(InternalToggleIcon);

export const SlidingPanelHeader = BaseSlidingPanelHeader;
export const SlidingPanelSection = BaseSlidingPanelSection;
