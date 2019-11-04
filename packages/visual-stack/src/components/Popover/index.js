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
        {
          shown ?
            <Popper placement={placement}>
              {({ref, style, placement, arrowProps}) => (
                <div className="vs-popover-container" ref={ref} style={style} data-placement={placement}>
                  <div className="vs-popover-content">
                    {content}
                  </div>
                  <span className="vs-popover-arrow" ref={arrowProps.ref} style={arrowProps.style}
                        data-placement={placement}/>
                </div>
              )}
            </Popper>
            : null
        }
      </div>
    </Manager>
  );
};

export class HoverPopover extends React.Component {
  state = {
    shown: false
  };

  constructor(props) {
    super(props);
  }

  onMouseOver = () => {
    this.setState({shown: true});
  };

  onMouseLeave = () => {
    this.setState({shown: false});
  };

  render() {
    return (
      <Popover shown={this.state.shown}
               content={this.props.content}
               placement={this.props.placement}
               onMouseOver={this.onMouseOver}
               onMouseLeave={this.onMouseLeave}>
        {this.props.children}
      </Popover>
    );
  }
}

export default Popover;
