import React from 'react';

import PageContent from '@cjdev/visual-stack/lib/components/PageContent';
import {
  PageHeader,
  PageTitle,
  PageDescription,
} from '@cjdev/visual-stack/lib/components/PageHeader';
import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import './styles.css';
import { Demo, Snippet } from '../../components/Demo';

export default () => {
  return (
    <Demo srcFile="/samples/src/containers/GettingStarted/democode.js">
      {snippets => {
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
                  <div className="header-text">
                    New Application with Visual Stack Integration
                  </div>
                </Header>
                <Body>
                  <div className="body-formatting">
                    {/*  <p>If you have a pre-existing area application you want to integrate Visual Stack into, skip down below to instructions about that.</p> */}
                    <p>
                      This guide uses{' '}
                      <a href="https://github.com/facebook/create-react-app">
                        create-react-app
                      </a>{' '}
                      as a boiler-plate and base for a React application.
                    </p>
                    <p>
                      Depending on your areas needs, this may be enough. However
                      every team/person needs to take into consideration future
                      functionality when picking an infrastructure boiler-plate.
                    </p>
                    <p>
                      If you have questions about which way would be best for
                      your team, get in touch with a FEC member today!
                    </p>
                    <div className="instruction-text">
                      <h5>Necessary preinstalls</h5>
                      <p>Node version 5 or higher.</p>
                      <p>Assuming you have homebrew installed.</p>
                    </div>
                    <pre>
                      <code className="language-javascript">
                        brew install node // node install gives you npm for free
                      </code>
                    </pre>
                    <div className="border" />
                    <p>
                      With node and npm, you can now set up your boiler-plate
                      and get started with your area's application
                    </p>
                    <div className="instruction-text">
                      <h4>Create React App install</h4>
                      <p>
                        See{' '}
                        <a href="https://reactjs.org/docs/add-react-to-a-new-app.html#create-react-app">
                          create-react-app documentation
                        </a>{' '}
                        for additional info{' '}
                      </p>
                      <pre>
                        <code className="language-javascript">
                          npx create-react-app my-app //this will temporarily
                          install an instance create-react-app then run it
                        </code>
                        <br />
                        <code className="language-javascript">
                          cd name_of_your_application && yarn start
                        </code>
                        <br />
                      </pre>
                    </div>
                    <div className="border" />
                    <p>
                      Your application should be up and running. Cool! But
                      you're only half way there. Now to add our flavor to the
                      mix.
                    </p>
                    <div className="instruction-text">
                      <h4>Installing the Fun Stuff</h4>
                      <p>
                        You'll need <code>redux</code>, <code>react-redux</code>
                        , <code>visual-stack</code>, and{' '}
                        <code>visual-stack-redux</code> next.
                      </p>
                      <p>
                        See
                        <a href="https://github.com/cjdev/visual-stack">
                          {' '}
                          the visual-stack
                        </a>
                        ,<a href="https://redux.js.org/"> redux</a>, and{' '}
                        <a href="https://redux.js.org/basics/usage-with-react">
                          {' '}
                          react-redux
                        </a>{' '}
                        docs, for additional info{' '}
                      </p>
                      <pre>
                        <code className="language-javascript">
                          yarn add redux react-redux @cjdev/visual-stack
                          @cjdev/visual-stack-redux --dev
                        </code>
                      </pre>
                    </div>
                    <div className="border" />
                    <p>
                      So you've downloaded all the stuff you need. You're ready
                      to rock and roll! Write some code! Kick some butt!
                    </p>
                    <p>But...how...?</p>
                    <p>
                      An excellent question! A good place to get started is to
                      set up your Application Layout, and SideNav.
                    </p>
                    <p>What is a single page application without navigation!</p>
                    <div className="instruction-text">
                      <h4>Setting Up Your Page</h4>
                      <p>Here's a really simple copy pasta! Wow! So easy!</p>
                      <p>In src/App.js, add the following code</p>
                      <p>
                        Just fill in what you need, and you get a responsive
                        SideNav, Header, Title and Description.
                      </p>
                      <Snippet tag="s1" src={snippets} />
                      <Snippet tag="s2" src={snippets} />
                    </div>
                    <div className="border" />
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
      }}
    </Demo>
  );
};
