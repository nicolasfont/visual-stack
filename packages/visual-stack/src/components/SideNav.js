import React, { PropTypes } from 'react';
import MediaQuery from 'react-responsive';
import R from 'ramda';
import './SideNav.css';

export const ToggleIcon = ({ onClick }) => {
  return (
    <a className=" sidenav-toggle-icon" onClick={onClick}>
      <i className="fa fa-bars"></i>
    </a>
  );
};

export const Header = ({ children }) =>
  <li className="sidenav-entry sidenav-header">{children}</li>;
Header.propTypes = {
  children: PropTypes.string.isRequired,
};

export class LinkGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideNavState: this.props.matches,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expanded === false) {
      this.setState({ sideNavState: nextProps.matches });
    }
  }

  render() {
    const classes = 'sidenav-entry sidenav-container' + (this.props.expanded ? ' expanded' : '');
    const expandRow = e => {
      this.props.onClick(e, this.props.label);
      if (this.props.expanded === false) {
        this.props.toggleSideNav(this.props.expanded);
      } else {
        this.props.toggleSideNav(this.state.sideNavState);
      }
    };
    return (
      <li className={classes}>
        <a className="sidenav-container-row" onClick={expandRow}>
          <div className="sidenav-container-row-left">
            { this.props.icon }
            <span className="sidenav-container-label">{ this.props.label }</span>
          </div>
          <i className="fa fa-chevron-right sidenav-container-chevron"></i>
        </a>
        <ul>
          { this.props.children }
        </ul>
      </li>
    );
  }
}
LinkGroup.propTypes = {
  expanded: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export const Link = ({ children }) => {
  return (
    <li className="sidenav-entry sidenav-link">
      {children}
    </li>
  );
};

export const SideNavIcon = ({ type }) => {
  return <i className={`fa fa-${type} sidenav-icon`}></i>;
};


export class SideNav extends React.Component {
  render() {
    return (
      <MediaQuery maxWidth={640} minDeviceWidth={640}>
        {
          matches => {
            return (
              <SideNavP
                matches={matches}
                onClick={this.props.onClick}
                collapsed={this.props.collapsed}
                >
                {this.props.children}
              </SideNavP>
            );
          }
        }
      </MediaQuery>
      );
  }

}

class SideNavP extends React.Component {
  constructor(props) {
    super(props);
    this.props.onClick(this.props.matches);
  }

  componentWillReceiveProps(nextProps) {
    const resizeSet = R.not(R.equals(this.props.matches, nextProps.matches));
    if (resizeSet) {
      this.props.onClick(nextProps.matches);
    }
  }

  render() {
    const toggle = () => this.props.onClick(!this.props.collapsed);
    const mappedChildren =
      React.Children.map(this.props.children, child => React.cloneElement(child, { matches: this.props.collapsed }));
    return (
            <ul className={'sidenav' + (this.props.collapsed ? ' collapsed' : ' active')}>
              { mappedChildren }
              <ul className="toggle-icon"><ToggleIcon onClick={toggle}/></ul>
            </ul>
    );
  }
}

SideNav.propTypes = {
  active: PropTypes.bool,
};

