import React from 'react';
import R from 'ramda';
import { Link } from 'react-router';
import { SideNav, Link as SideNavLink, LinkGroup } from '@cjdev/visual-stack-redux/lib/components/SideNav';
import { routeComponentMap } from '../Components/Docs/';

export default () =>
  <SideNav>
    <LinkGroup label="Components">
      {
        R.pipe(
          R.mapObjIndexed((val, key) => ({ key, ...val })),
          R.values,
          R.sortBy(R.prop('linkName')),
          R.map(val =>
            <SideNavLink key={val.key}>
              <Link to={`/components/${val.key}`}>
                { val.linkName }
              </Link>
            </SideNavLink>)
        )(routeComponentMap)
      }
    </LinkGroup>
    <SideNavLink><Link to="/icons">Icons</Link></SideNavLink>
    <SideNavLink><Link to="/layouts">Layouts</Link></SideNavLink>
  </SideNav>;


