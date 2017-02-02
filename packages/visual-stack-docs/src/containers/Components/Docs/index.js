import React from 'react';

import ButtonDocs from './button';
import TopNavDocs from './topnav';

export const routeComponentMap = {
  topnav: { path: 'topnav', linkName: 'TopNav', component: <TopNavDocs /> },
  button: { path: 'button', linkName: 'Button', component: <ButtonDocs /> },
};

const ComponentDocs = ({ params }) => {
  return (
    <div>
      { routeComponentMap[params.componentName].component }
    </div>
  );
};

export default ComponentDocs;
