import React from 'react';
import { PageHeader, PageTitle } from '@cjdev/visual-stack/lib/components/PageHeader';
import PageContent from '@cjdev/visual-stack/lib/components/PageContent';

const routeComponentMap = {};

const addComponentRoute = (path, linkName, component) => {
  routeComponentMap[path] = { path, linkName, component };
};

// 1. add an import for your demo
import ButtonDocs from './button';
import SpinnerDocs from './spinner';
import TopNavDocs from './topnav';


// 2. add your demo to the routeComponentMap
addComponentRoute('topnav', 'TopNav', <TopNavDocs />);
addComponentRoute('spinner', 'Spinner', <SpinnerDocs />);
addComponentRoute('button', 'Button', <ButtonDocs />);


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

export { routeComponentMap };
export default ComponentDocs;
