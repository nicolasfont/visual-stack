import React, { Component } from 'react';
import { Link as RRLink } from 'react-router';
import { TopNav } from '@cjdev/visual-stack/lib/components/TopNav';
import { SideNav, Link } from '@cjdev/visual-stack/lib/components/SideNav';
import Layout from '@cjdev/visual-stack/lib/layouts/ApplicationLayout';

import './styles.css';

const AppTopNav = () =>
  <TopNav appName="VISUAL STACK" />;

const AppSideNav = () =>
  <SideNav>
    <Link><RRLink to="components">Components</RRLink></Link>
    <Link><RRLink to="icons">Icons</RRLink></Link>
    <Link><RRLink to="layouts">Layouts</RRLink></Link>
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

