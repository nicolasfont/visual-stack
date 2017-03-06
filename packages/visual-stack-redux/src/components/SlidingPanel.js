import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  SlidingPanel as BaseSlidingPanel,
  SlidingPanelHeader as BaseSlidingPanelHeader,
  SlidingPanelSection as BaseSlidingPanelSection,
  ToggleIcon as BaseToggleIcon,
} from '@cjdev/visual-stack/lib/components/SlidingPanel';
import { toggleSlidingPanel } from '../actions';

export class InternalSlidingPanel extends Component {
  static propTypes = {
    active: PropTypes.bool,
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BaseSlidingPanel active={this.props.active || false} >
        { this.props.children }
      </BaseSlidingPanel>
    );
  }
}
export const SlidingPanel = connect(
  state => ({ active: state.visualStack.slidingPanel.active }),
)(InternalSlidingPanel);

export class InternalToggleIcon extends Component {
  render() {
    return (
      <BaseToggleIcon onClick={this.props.toggleSlidingPanel} />
    );
  }
}

export const ToggleIcon = connect(
  null,
  { toggleSlidingPanel }
)(InternalToggleIcon);

export const SlidingPanelHeader = BaseSlidingPanelHeader;
export const SlidingPanelSetion = BaseSlidingPanelSection;


