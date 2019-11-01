import React from 'react';
import {Manager, Popper, Reference} from 'react-popper';
import "./Popover.css";

const Popover = () => {
  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <button type="button" ref={ref} style={{"margin": "300px"}}>
            Reference element
          </button>
        )}
      </Reference>
      <Popper placement={"bottom"}>
        {({ ref, style, placement, arrowProps }) => (
          <>
            <div className="vs-popover-container" ref={ref} style={style} data-placement={placement}>
              Popper element<br/>test
              <span className="vs-popover-arrow" ref={arrowProps.ref} style={arrowProps.style} data-placement={placement} />
            </div>
          </>
        )}
      </Popper>
    </Manager>
  );
};

export default Popover;
