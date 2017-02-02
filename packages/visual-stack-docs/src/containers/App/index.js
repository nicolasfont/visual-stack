import React, { Component } from 'react';
import { Link } from 'react-router';
import { TopNav } from '@cjdev/visual-stack/lib/components/TopNav';
import { SideNav, Link as SideNavLink, LinkGroup } from '@cjdev/visual-stack-redux/lib/components/SideNav';

import Layout from '@cjdev/visual-stack/lib/layouts/ApplicationLayout/index.js';

import './styles.css';

const AppTopNav = () =>
  <TopNav appName="VISUAL STACK" />;

const AppSideNav = () =>
  <SideNav>
    <LinkGroup label="Components">
      <SideNavLink><Link to="components/button">Button</Link></SideNavLink>
    </LinkGroup>
    <SideNavLink><Link to="icons">Icons</Link></SideNavLink>
    <SideNavLink><Link to="layouts">Layouts</Link></SideNavLink>
  </SideNav>;

class App extends Component {
  render() {
    return (
      <Layout
        topNav={<AppTopNav />}
        sideNav={<AppSideNav/>}
      >
        { this.props.children }
      </Layout>
    );
  }
}

export default App;

