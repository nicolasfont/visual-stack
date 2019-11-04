import React from 'react';
import Popover from "../index";
import Enzyme, {mount} from 'enzyme';
import {Popper} from 'react-popper';

import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("Popover", () => {
  it("should render when told to show and default placement bottom", () => {
    const wrapper = mount(
      <Popover shown={true} />
    );

    expect(wrapper.find(".vs-popover-container").prop("hidden")).toBe(false);
    expect(wrapper.find(Popper).prop("placement")).toBe("bottom");
  });

  it("should be hidden when not shown", () => {
    const wrapper = mount(
      <Popover shown={false} />
    );

    expect(wrapper.find(".vs-popover-container").prop("hidden")).toBe(true);
  });

  it("should accept a placement prop to control default placement", () => {
    const wrapper = mount(
      <Popover shown={true} placement={"right"} />
    );

    expect(wrapper.find(Popper).prop("placement")).toBe("right");
  });

  it("should render children as the reference element", () => {
    const expectedChildElement = <div className={"test-target-element"}/>;
    const wrapper = mount(
      <Popover shown={false} >
        {expectedChildElement}
      </Popover>
    );

    expect(wrapper.find(".vs-popover-reference").find(".test-target-element")).toHaveLength(1);
    expect(wrapper.find(".vs-popover-reference").children().getElement()).toEqual(expectedChildElement);
  });

  it("should render content as the popover content", () => {
    const expectedContentElement = <div className={"test-target-content-element"}/>;
    const wrapper = mount(
      <Popover shown={false} content={expectedContentElement}>
        <div className={"test-target-element"}/>
      </Popover>
    );

    expect(wrapper.find(".vs-popover-container").find(".test-target-content-element")).toHaveLength(1);
    expect(wrapper.find(".vs-popover-container").children().at(0).getElement()).toEqual(expectedContentElement);
  });
});
