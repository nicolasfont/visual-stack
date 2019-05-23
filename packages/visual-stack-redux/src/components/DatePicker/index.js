import * as R from 'ramda';
import { connect } from 'react-redux';

import DatePicker from '@cjdev/visual-stack/lib/components/DatePicker';

import {
  datepickerLensForId,
  updateCalendarRanges,
  updateNamedCalendarRanges,
  resetCalendarSelection,
  forDatepicker,
} from '../../actions';

const mapDispatchToProps = (dispatch, { id, onCancel = () => {} }) =>
  R.map(
    actionCreator =>
      R.compose(
        dispatch,
        forDatepicker(id),
        actionCreator
      ),
    {
      updateCalendarRanges,
      updateNamedCalendarRanges,
      onCancel(...args) {
        onCancel(...args);
        return resetCalendarSelection(...args);
      },
    }
  );

const mapStateToProps = (
  state,
  { id, selectedRanges, selectedNamedRanges = ['custom', 'custom'] }
) => ({
  selectedRanges:
    R.view(
      R.compose(
        datepickerLensForId(id),
        R.lensProp('selectedRanges')
      ),
      state
    ) || selectedRanges,
  selectedNamedRanges:
    R.view(
      R.compose(
        datepickerLensForId(id),
        R.lensProp('selectedNamedRanges')
      ),
      state
    ) || selectedNamedRanges,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatePicker);
