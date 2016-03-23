import { lensPath, set } from 'ramda';
import { createAction, handleActions } from 'redux-actions';

const OPEN_DROPDOWN = '@cjdev/visual-stack/OPEN_DROPDOWN';
const CLOSE_DROPDOWN = '@cjdev/visual-stack/CLOSE_DROPDOWN';

export const openDropdown = createAction(OPEN_DROPDOWN, (menuBarName, dropDownName) => ({ menuBarName, dropDownName }));
export const closeDropdown = createAction(CLOSE_DROPDOWN, (menuBarName, dropDownName) => ({ menuBarName, dropDownName }));

export default handleActions({
  [OPEN_DROPDOWN]: (state, { payload: { menuBarName, dropDownName } }) =>
    set(lensPath(['menuBar', menuBarName, dropDownName, 'open']), true, state),

  [CLOSE_DROPDOWN]: (state, { payload: { menuBarName, dropDownName } }) =>
    set(lensPath(['menuBar', menuBarName, dropDownName, 'open']), false, state),
}, { menuBar: {} });
