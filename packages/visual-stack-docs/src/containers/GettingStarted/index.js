import React from 'react';

import PageContent from '@cjdev/visual-stack/lib/components/PageContent';
import { PageHeader, PageTitle, PageDescription } from '@cjdev/visual-stack/lib/components/PageHeader';
import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import './styles.css';
import { Demo, Snippet } from '../../components/Demo';

export default () =>
<Demo srcFile="/samples/src/containers/GettingStarted/democode.js">
  {
    snippets => {
      return (
        <div>
          <PageHeader>
            <PageTitle>
              Getting Started
              <PageDescription>Integrating With Visual Stack</PageDescription>
            </PageTitle>
          </PageHeader>
          <PageContent>
            <Panel>
              <Header>
                <div className="header-text">New Application with Visual Stack Integration</div>
              </Header>
              <Body>
                <div className="body-formatting">
                  <p>If you have a pre-existing area application you want to integrate Visual Stack into, skip down below to instructions about that.</p>
                  <p>This guide uses the 'create-react-app' as the boiler-plate and set up for a react application.</p>
                  <p>Depending on your areas needs, this may be enough. However each area needs to take into consideration future functionality when picking an infrastructure boiler-plate.</p>
                  <p>If you have questions about which way would be best for your team, get in touch with a FEC member today!</p>

                  <div className="instruction-text">
                    <b>Necessary preinstall's</b>
                    <p>Node version 4 or higher</p>
                    <p><code>brew install node // node install give you npm for free</code></p>
                  </div>
                  <div className="border"/>
                  <p>With node and npm install, you can now set up your boiler-plate and get started with you area's application</p>
                  <div className="instruction-text">
                    <b>Create React App install</b>
                    <p>See <a href="https://reactjs.org/docs/add-react-to-a-new-app.html#create-react-app">create-react-app documentation</a> for additional info </p>
                    <p><b>WARNING: Create-React-App allows you to use yarn OR npm. NOT BOTH.</b></p>
                    <p><b>If you run <code>npm install</code> then <code>yarn start</code> you're going to have a bad time.</b></p>
                    <p><code>npm/yarn install -g create-react-app // install it globally, so you can create react app anywhere</code></p>
                    <p><code>cd [WHERE_YOU_WANT_YOUR_APP_TO_LIVE] </code></p>
                    <p><code>create-react-app name_of_your_application// create-react-app makes a directory with all the goodies you want </code></p>
                    <p><code>cd name_of_your_application && npm/yarn start</code></p>
                  </div>
                  <div className="border"/>
                  <p>Your application should be up and running. Cool! But you're only half way there. Now to add our flavor to the mix</p>
                  <p>You'll need <code>redux</code>, <code>react-redux</code>, <code>visual-stack</code>, and <code>visual-stack-redux</code> next.</p>
                  <p>Exit the current running server and npm install those!</p>
                  <div className="instruction-text">
                    <b>Installing the Fun Stuff</b>
                    <p>See
                      <a href="https://github.com/cjdev/visual-stack"> the visual-stack</a>,
                      <a href="https://redux.js.org/"> redux</a>,
                      and <a href="https://redux.js.org/basics/usage-with-react"> react-redux</a> docs, for additional info </p>
                    <p><code>npm install --save redux react-redux @cjdev/visual-stack @cjdev/visual-stack-redux </code></p>
                  </div>
                  <div className="border"/>
                  <p>So you've downloaded all the stuff you need. You're ready to rock and roll! Write some code! Kick some butt!</p>
                  <p>But...how...?</p>
                  <p>An excellent question! A good place to get started is to set up your Application Layout, and SideNav.</p>
                  <p>What is a single page application without navigation!</p>
                  <div className="instruction-text">
                    <b>Setting Up You Page</b>
                    <p>Here's a really simple copy pasta! Wow! So easy!</p>
                    <p>Just fill in what you need, and you get a responsive SideNav, Header, Title and Description</p>
                    <Snippet tag="s1" src={snippets} />
                    <Snippet tag="s2" src={snippets} />
                  </div>
                  <div className="border"/>
                  TODO: Add information for React-Router
                </div>
              </Body>
            </Panel>
            <Panel>
              <Header>
                Using Visual Stack in a pre-existing application
              </Header>
              <Body>
                <div className="body-formatting">
                  <div>Pre-existing Application Visual-Stack Integration</div>

                  <div className="instruction-text"> </div>
                </div>
              </Body>
            </Panel>
          </PageContent>
        </div>
      );
    }
  }
</Demo>;
