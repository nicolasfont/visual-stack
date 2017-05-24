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

export const LinkGroup = ({ label, icon, children, expanded, onClick }) => {
  const classes = 'sidenav-entry sidenav-container' + (expanded ? ' expanded' : '');
  return (
    <li className={classes}>
      <a className="sidenav-container-row" onClick={e => onClick(e, label)}>
        <div className="sidenav-container-row-left">
          { icon }
          <span className="sidenav-container-label">{ label }</span>
        </div>
        <i className="fa fa-chevron-right sidenav-container-chevron"></i>
      </a>
      <ul>
        { children }
      </ul>
    </li>
  );
};
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
          (matches) => {
            return (
              <SideNavP matches={matches} >
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
    this.state = {
      collapsed: this.props.matches,
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    const resizeSet = R.not(R.equals(this.props.matches, nextProps.matches));
    if (resizeSet) {
      this.setState({ collapsed: nextProps.matches });
    }
  }

  render() {
    return (
            <ul className={'sidenav' + (this.state.collapsed ? ' collapsed' : ' active')}>
              { this.props.children }
              <ul className="toggle-icon"><ToggleIcon onClick={() => this.setState({ collapsed: !this.state.collapsed } )}/></ul>
            </ul>
    );
  }
}

SideNav.propTypes = {
  active: PropTypes.bool,
};

