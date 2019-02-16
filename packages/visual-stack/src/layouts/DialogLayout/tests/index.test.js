import React from 'react';
import { mount, shallow } from 'enzyme';
import DialogLayout from '../';

describe('DialogLayout', () => {
  test('should render', () => {
    let onClickCalled = false;
    const onClickFake = () => {
      onClickCalled = true;
    };

    const component = mount(<DialogLayout
            title="titleFromTest"
            cancelButtonText="testCancelButtonText"
            submitButtonText="testSubmitButtonText"
            logo={<div id="test-logo">I am a logo</div>}
            onCancel={onClickFake}>

            <div id="test-children">I am a child</div>

        </DialogLayout>);

    expect('titleFromTest').toEqual(component.find('.vs-dialog-layout-title').prop('children'));
    expect('testCancelButtonText').toEqual(component.find('#vs-dialog-layout-cancel button').prop('children'));
    expect('testSubmitButtonText').toEqual(component.find('#vs-dialog-layout-submit button').prop('children'));
    expect('I am a child').toEqual(component.find('#test-children').prop('children'));
    expect('I am a logo').toEqual(component.find('#test-logo').prop('children'));
  });

  test('should call cancel handler when cancel button is clicked', () => {
    let onCancel = false;
    const onClickFake = () => {
      onCancel = true;
    };

    const component = shallow(<DialogLayout onCancel={onClickFake} />);

    const cancelButton = component.find('#vs-dialog-layout-cancel');

    cancelButton.simulate('click');

    expect(onCancel).toEqual(true);
  });

  test('should call cancel handler when cancel logo is clicked', () => {
    let onCancelCalled = false;
    const onClickFake = () => {
      onCancelCalled = true;
    };

    const component = shallow(<DialogLayout onCancel={onClickFake} />);

    const closeIcon = component.find('.vs-dialog-layout-icon-close');

    closeIcon.simulate('click');

    expect(onCancelCalled).toEqual(true);
  });

  test('should call submit handler when submit button is clicked', () => {
    let onSubmitCalled = false;
    const onClickFake = () => {
      onSubmitCalled = true;
    };

    const component = shallow(<DialogLayout onSubmit={onClickFake} />);

    const submitButton = component.find('#vs-dialog-layout-submit');

    submitButton.simulate('click');

    expect(onSubmitCalled).toEqual(true);
  });
});
