import { lensPath, lensProp, set } from 'ramda';
import { createAction, handleActions } from 'redux-actions';

const OPEN_DROPDOWN = '@cjdev/visual-stack-redux/OPEN_DROPDOWN';
const CLOSE_DROPDOWN = '@cjdev/visual-stack-redux/CLOSE_DROPDOWN';

export const openDropdown = createAction(OPEN_DROPDOWN, (menuBarName, dropDownName) => ({ menuBarName, dropDownName }));
export const closeDropdown = createAction(CLOSE_DROPDOWN, (menuBarName, dropDownName) => ({ menuBarName, dropDownName }));

const OPEN_MODAL = '@cjdev/visual-stack-redux/OPEN_MODAL';
const CLOSE_MODAL = '@cjdev/visual-stack-redux/CLOSE_MODAL';

export const openModal = createAction(OPEN_MODAL, (component, props) => ({ component, props }));
export const closeModal = createAction(CLOSE_MODAL);

const emptyModalState = { component: undefined, props: undefined };

export default handleActions({
  [OPEN_DROPDOWN]: (state, { payload: { menuBarName, dropDownName } }) =>
    set(lensPath(['menuBar', menuBarName, dropDownName, 'open']), true, state),

  [CLOSE_DROPDOWN]: (state, { payload: { menuBarName, dropDownName } }) =>
    set(lensPath(['menuBar', menuBarName, dropDownName, 'open']), false, state),

  [OPEN_MODAL]: (state, { payload }) =>
    set(lensProp('modal'), payload, state),

  [CLOSE_MODAL]: state =>
    set(lensProp('modal'), emptyModalState, state),
}, { menuBar: {}, modal: emptyModalState });
