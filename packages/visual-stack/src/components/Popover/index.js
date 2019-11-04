import React from 'react';
import {Manager, Popper, Reference} from 'react-popper';
import "./Popover.css";

const Popover = ({shown, content, children, placement = "bottom", onMouseOver, onMouseLeave}) => {
  return (
    <Manager>
      <div className="vs-popover-wrapper"
           onMouseOver={onMouseOver}
           onMouseLeave={onMouseLeave}>
        <Reference>
          {({ref}) => (
            <div ref={ref} className="vs-popover-reference">
              {children}
            </div>
          )}
        </Reference>
        <Popper placement={placement}>
          {({ref, style, placement, arrowProps}) => (
            <div className="vs-popover-container" ref={ref} style={style} data-placement={placement} hidden={!shown}>
              <div className="vs-popover-content">
                {content}
              </div>
              <span className="vs-popover-arrow" ref={arrowProps.ref} style={arrowProps.style}
                    data-placement={placement}/>
            </div>
          )}
        </Popper>
      </div>
    </Manager>
  );
};

export default Popover;
