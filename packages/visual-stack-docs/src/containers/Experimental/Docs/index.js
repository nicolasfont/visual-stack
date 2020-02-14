import React from 'react';
import {
  PageHeader,
  PageTitle,
} from '@cjdev/visual-stack/lib/components/PageHeader';
import PageContent from '@cjdev/visual-stack/lib/components/PageContent';

// 1. add an import for your demo
import TextDocs from './text';
import BoxDocs from './box';

const experimentalRouteMap = {};

const addComponentRoute = (path, linkName, component) => {
  experimentalRouteMap[path] = { path, linkName, component };
};

// 2. add your demo to the experimentalRouteMap
addComponentRoute('text', 'Text', <TextDocs />);
addComponentRoute('box', 'Box', <BoxDocs />);

const ExperimentalDocs = ({ params }) => {
  const routeData = experimentalRouteMap[params.componentName];
  return (
    <div>
      <PageHeader>
        <PageTitle>{routeData.linkName}</PageTitle>
      </PageHeader>
      <PageContent>{routeData.component}</PageContent>
    </div>
  );
};

export { experimentalRouteMap };
export default ExperimentalDocs;
