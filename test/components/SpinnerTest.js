import React from "react";
import { shallow } from "enzyme";
import { equal, ok, deepEqual } from "assert";
import Spinner from "../../src/components/Spinner";

describe("Spinner", ()=>{
    it("should render with default small size", () =>{
       const shallowWrapper = shallow(<Spinner />);
       equal(shallowWrapper.hasClass("spinner"), true);
       equal(shallowWrapper.hasClass("spinner-small"), true);
    });

    it("should render with large size", ()=>{
        const shallowWrapper = shallow(<Spinner size="large" />);
        equal(shallowWrapper.hasClass("spinner"), true);
        equal(shallowWrapper.hasClass("spinner-large"), true);
    });

    it("should render with extra-large size", ()=>{
        const shallowWrapper = shallow(<Spinner size="extra-large" />);
        equal(shallowWrapper.hasClass("spinner"), true);
        equal(shallowWrapper.hasClass("spinner-extra-large"), true);
    });
});

