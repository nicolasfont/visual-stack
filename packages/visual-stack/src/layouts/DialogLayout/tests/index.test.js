import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import DialogLayout from '../';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('DialogLayout', () => {
  test('should render', () => {
    const component = mount(
      <DialogLayout
        title="titleFromTest"
        cancelButtonText="testCancelButtonText"
        submitButtonText="testSubmitButtonText"
        logo={<div id="test-logo">I am a logo</div>}
      >
        <div id="test-children">I am a child</div>
      </DialogLayout>
    );

    expect('titleFromTest').toEqual(
      component.find('.vs-dialog-layout-title').prop('children')
    );
    expect('testCancelButtonText').toEqual(
      component.find('#vs-dialog-layout-cancel button').prop('children')
    );
    expect('testSubmitButtonText').toEqual(
      component.find('#vs-dialog-layout-submit button').prop('children')
    );
    expect('I am a child').toEqual(
      component.find('#test-children').prop('children')
    );
    expect('I am a logo').toEqual(
      component.find('#test-logo').prop('children')
    );
    expect(
      component
        .find('#vs-dialog-layout-submit')
        .find('button')
        .prop('disabled')
    ).toEqual(false);
  });

  test('should render submit as disabled button when disableSubmit is true', () => {
    const component = shallow(
      <DialogLayout disableSubmit={true} submitButtonText="Submit" />
    );

    const submitButton = component.find('#vs-dialog-layout-submit');

    expect(submitButton.prop('disabled')).toEqual(true);
  });

  test('should not render submit button when not configured', () => {
    const component = shallow(<DialogLayout />);

    const submitButton = component.find('#vs-dialog-layout-submit');

    expect(submitButton).toHaveLength(0);
  });

  test('should not render cancel button when not configured', () => {
    const component = shallow(<DialogLayout />);

    const cancelButton = component.find('#vs-dialog-layout-cancel');

    expect(cancelButton).toHaveLength(0);
  });

  test('should show the X button when neither of the other buttons shown', () => {
    const component = shallow(<DialogLayout />);

    const closeIconButton = component.find('.vs-dialog-layout-icon-close');

    expect(closeIconButton).toHaveLength(1);
  });

  test('should call cancel handler when cancel button is clicked', () => {
    let onCancel = false;
    const onClickFake = () => {
      onCancel = true;
    };

    const component = shallow(
      <DialogLayout onCancel={onClickFake} cancelButtonText="Cancel" />
    );

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

    const component = shallow(
      <DialogLayout onSubmit={onClickFake} submitButtonText="Submit" />
    );

    const submitButton = component.find('#vs-dialog-layout-submit');

    submitButton.simulate('click');

    expect(onSubmitCalled).toEqual(true);
  });

  test('should show spinner on isSubmitting', () => {
    const submitButtonText = 'test submit text';

    const component = mount(
      <DialogLayout
        showSubmitButtonSpinner={true}
        submitButtonText={submitButtonText}
      />
    );

    const submitButton = component.find('#vs-dialog-layout-submit');

    expect(submitButton.find('Spinner').length).toEqual(1);
    expect(submitButton.at(0).text()).toEqual(' ' + submitButtonText);
  });

  test('should have wide content when contentSize is wide', () => {
    const component = mount(<DialogLayout contentSize={'wide'} />);

    const content = component.find('.vs-dialog-layout-content');

    expect(content.hasClass('vs-dialog-layout-content-wide')).toBe(true);
  });

  test('should have normal content when contentSize is normal', () => {
    const component = mount(<DialogLayout contentSize={'normal'} />);

    const content = component.find('.vs-dialog-layout-content');

    expect(content.hasClass('vs-dialog-layout-content-normal')).toBe(true);
  });

  test('should have normal content when contentSize is not passed', () => {
    const component = mount(<DialogLayout />);

    const content = component.find('.vs-dialog-layout-content');

    expect(content.hasClass('vs-dialog-layout-content-normal')).toBe(true);
  });
});
