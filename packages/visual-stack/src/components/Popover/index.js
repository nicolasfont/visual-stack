import React from 'react';
import {Manager, Popper, Reference} from 'react-popper';
import "./Popover.css";

const Popover = ({shown, content, children, placement = "bottom"}) => {
  return (
    <Manager>
      <Reference>
        {({ref}) => (
          <span ref={ref} className="vs-popover-reference">
            {children}
          </span>
        )}
      </Reference>
      <Popper placement={placement}>
        {({ref, style, placement, arrowProps}) => (
          <div className="vs-popover-container" ref={ref} style={style} data-placement={placement} hidden={!shown}>
            {content}
            <span className="vs-popover-arrow" ref={arrowProps.ref} style={arrowProps.style} data-placement={placement}/>
          </div>
        )}
      </Popper>
    </Manager>
  );
};

export default Popover;
