import React from 'react';
import { Alert } from '../index';
import Enzyme, { shallow } from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import IconSuccess from '../../IconSuccess';
import IconInfo from '../../IconInfo';
import IconWarning from '../../IconWarning';
Enzyme.configure({ adapter: new Adapter() });

describe('Alert', () => {
  it('should render', () => {
    const onClose = () => {};

    const wrapper = shallow(
      <Alert type="info" closeType="icon" onClose={onClose}>
        You have completed the form.
      </Alert>
    );
    const alert = wrapper.find('.vs-info-alert');

    expect(alert).toHaveLength(1);
    expect(
      alert.contains(
        <div className="vs-alert-content">You have completed the form.</div>
      )
    ).toEqual(true);
  });

  it('should render an info icon when the info type is passed in', () => {
    const onClose = () => {};

    const wrapper = shallow(
      <Alert type="info" closeType="icon" onClose={onClose}>
        You have completed the form.
      </Alert>
    );
    const alert = wrapper.find('.vs-info-alert');

    expect(alert.contains(<IconInfo className="vs-alert-icon" />)).toEqual(
      true
    );

    wrapper.unmount();
  });

  it('should render a success icon when the success type is passed in', () => {
    const onClose = () => {};

    const wrapper = shallow(
      <Alert type="success" closeType="icon" onClose={onClose}>
        You have completed the form.
      </Alert>
    );
    const alert = wrapper.find('.vs-success-alert');

    expect(alert.contains(<IconSuccess className="vs-alert-icon" />)).toEqual(
      true
    );

    wrapper.unmount();
  });

  it('should render a warning icon when the warning type is passed in', () => {
    const onClose = () => {};

    const wrapper = shallow(
      <Alert type="warning" closeType="icon" onClose={onClose}>
        You have completed the form.
      </Alert>
    );
    const alert = wrapper.find('.vs-warning-alert');

    expect(alert.contains(<IconWarning className="vs-alert-icon" />)).toEqual(
      true
    );

    wrapper.unmount();
  });

  it('should render a close icon when the icon closeType is passed in', () => {
    const onClose = () => {};

    const wrapper = shallow(
      <Alert type="info" closeType="icon" onClose={onClose}>
        You have completed the form.
      </Alert>
    );
    const alert = wrapper.find('.vs-info-alert');

    expect(
      alert
        .debug()
        .indexOf(
          '<CloseIcon className="vs-alert-close-icon" onClick={[Function: onClick]} />'
        ) > -1
    ).toEqual(true);

    wrapper.unmount();
  });

  it('should render a close button when the button closeType is passed in', () => {
    const onClose = () => {};

    const wrapper = shallow(
      <Alert type="info" closeType="button" onClose={onClose}>
        You have completed the form.
      </Alert>
    );
    const alert = wrapper.find('.vs-info-alert');

    expect(
      alert
        .debug()
        .indexOf(
          '<Component type="outline-secondary" className="vs-alert-close-button" onClick={[Function: onClick]} />'
        ) > -1
    ).toEqual(true);

    wrapper.unmount();
  });
});
