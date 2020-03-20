/** @prettier */
import React from 'react';
import { Link, LinkContentWrapper } from './Link';
import { LogoutIcon } from './Icons';

export const UserIcon = ({ firstInitial, lastInitial, ...restProps }) => (
  <div className="vs-user-icon-circle" {...restProps}>
    <span className="vs-user-icon-first">{firstInitial}</span>
    <span className="vs-user-icon-last">{lastInitial}</span>
  </div>
);

export const LogoutLink = ({ onLogout, label, ...restProps }) => {
  return (
    <Link {...restProps}>
      <a onClick={onLogout}>
        <LinkContentWrapper icon={<LogoutIcon />} label={label || 'Logout'} />
      </a>
    </Link>
  );
};

export const UserMenuLink = ({
  onClicked,
  linkIcon,
  linkLabel,
  ...restProps
}) => {
  return (
    <Link {...restProps}>
      <a onClick={onClicked}>
        <LinkContentWrapper icon={linkIcon} label={linkLabel} />
      </a>
    </Link>
  );
};
