import React from 'react';
import { Manager, Popper, Reference } from 'react-popper';
import cn from 'classnames';
import './Popover.css';

const Popover = ({
  shown,
  content,
  children,
  placement = 'bottom',
  className,
  eventsEnabled,
  modifiers,
  positionFixed,
  ...restProps
}) => {
  return (
    <Manager>
      <div className="vs-popover-wrapper" {...restProps}>
        <Reference>
          {({ ref }) => (
            <div ref={ref} className="vs-popover-reference">
              {children}
            </div>
          )}
        </Reference>
        {shown ? (
          <Popper
            placement={placement}
            eventsEnabled={eventsEnabled}
            modifiers={modifiers}
            positionFixed={positionFixed}
          >
            {({ ref, style, placement, arrowProps }) => (
              <div
                className={cn('vs-popover-container', className)}
                ref={ref}
                style={style}
                data-placement={placement}
              >
                <div className="vs-popover-content">{content}</div>
                <span
                  className="vs-popover-arrow"
                  ref={arrowProps.ref}
                  style={arrowProps.style}
                  data-placement={placement}
                />
              </div>
            )}
          </Popper>
        ) : null}
      </div>
    </Manager>
  );
};

export class HoverPopover extends React.Component {
  state = {
    shown: false,
  };

  constructor(props) {
    super(props);
  }

  onMouseOver() {
    this.setState({ shown: true });
  }

  onMouseLeave() {
    this.setState({ shown: false });
  }

  render() {
    return (
      <Popover
        shown={this.state.shown}
        onMouseOver={() => {
          this.onMouseOver();
        }}
        onMouseLeave={() => {
          this.onMouseLeave();
        }}
        {...this.props}
      >
        {this.props.children}
      </Popover>
    );
  }
}

export default Popover;
