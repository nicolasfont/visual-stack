import React from 'react';
import { PageHeader, PageTitle } from '@cjdev/visual-stack/lib/components/PageHeader';
import PageContent from '@cjdev/visual-stack/lib/components/PageContent';


import ButtonDocs from './button';
import TopNavDocs from './topnav';

export const routeComponentMap = {
  topnav: { path: 'topnav', linkName: 'TopNav', component: <TopNavDocs /> },
  button: { path: 'button', linkName: 'Button', component: <ButtonDocs /> },
};

const ComponentDocs = ({ params }) => {
  const routeData = routeComponentMap[params.componentName];
  return (
    <div>
      <PageHeader>
        <PageTitle>{routeData.linkName}</PageTitle>
      </PageHeader>
      <PageContent>
        { routeData.component }
      </PageContent>
    </div>
  );
};

export default ComponentDocs;
