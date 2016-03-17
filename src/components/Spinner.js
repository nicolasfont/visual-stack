import React from "react";
import _ from "underscore";
import "./spinner.css";

const Spinner = (props) => {
    const propsToPassOn = _.omit(props, ["className"]);
    const className = "spinner spinner-" + (_.isUndefined(props.size)?"small":props.size);

    return (
        <span className={className} {...propsToPassOn}>
            <i className="fa fa-spinner cj-i-spin"></i>
        </span>
    );
};

Spinner.propTypes = {
    "size": React.PropTypes.oneOf(['small', 'large', 'extra-large', 'button'])
};

export default Spinner;
