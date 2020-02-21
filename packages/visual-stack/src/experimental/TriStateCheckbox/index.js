import React from 'react';
import PropTypes from 'prop-types';

export class TriStateCheckbox extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this._updateInnerCheckBoxState();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this._updateInnerCheckBoxState();
    }
  }

  onBoxClick(ev) {
    return this.props.onClick ? this.props.onClick(ev) : null;
  }

  render() {
    return (
      <input
        className={this.props.className}
        type="checkbox"
        onClick={ev => this.onBoxClick(ev)}
        ref={this.inputRef}
      />
    );
  }

  _updateInnerCheckBoxState() {
    if (!this.inputRef.current) {
      return;
    }
    const checkbox = this.inputRef.current;

    switch (this.props.value) {
      case 0:
        checkbox.checked = false;
        checkbox.indeterminate = false;
        break;
      case 1:
        checkbox.checked = true;
        checkbox.indeterminate = false;
        break;
      default:
        checkbox.checked = false;
        checkbox.indeterminate = true;
        break;
    }
  }
}

TriStateCheckbox.propTypes = {
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};
