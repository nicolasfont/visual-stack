import React from 'react';
import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import { Demo, Snippet } from '../../../components/Demo';
import IconExample from 'mdi-react/BlurIcon';

import {
  BlankSlate,
  PrimaryActionButton,
  SecondaryActionButton,
  Description,
  SubTitle,
} from '@cjdev/visual-stack/lib/components/BlankSlate';

export default () => (
  <Demo srcFile="/samples/src/containers/Components/Docs/blankslate.js">
    {snippets => {
      return (
        <div>
          <Panel>
            <div className="vs-bs-container vs-bs-leftalign">
              <div className="vs-bs-img">
                <IconExample />
              </div>
              <div className="vs-bs-content">
                <h1 className="vs-bs-title">
                  New, Lapsed, Return Customer Analysis
                </h1>
                <div className="vs-bs-subtitle">
                  <p>
                    What percent of my affiliate transactions came from my new,
                    lapsed, and return customer segments?
                  </p>
                  <p>
                    Which of my publisher partners are driving the most new
                    customers?
                  </p>
                  <p>
                    Are specific links in my program driving more of one
                    customer segment than another?
                  </p>
                </div>
                <div className="vs-bs-description-text">
                  <p>
                    The New, Lapsed, Return Affiliate Customer Analysis
                    dashboard enables you to answer these questions and more in
                    real-time and on-demand. In order to access the Affiliate
                    Customer Analysis dashboard powered by your CJ integration,
                    your account must be enabled to pass customer recency
                    parameters.
                  </p>
                </div>
                <div>
                  <button
                    type="button"
                    className="vs-btn-d vs-solid-primary-btn vs-bs-button-primary"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </Panel>
          <Panel>
            <Header>Blank Slate - Basic Example</Header>
            <Body>
              {/* s0:start */}
              <BlankSlate />
              {/* s0:end */}
              <Snippet tag="s0" src={snippets} />
            </Body>
          </Panel>
          <Panel>
            <Header>Blank Slate - Full Example</Header>
            <Body>
              {/* s1:start */}
              <BlankSlate title="Title" headerGraphic={<IconExample />}>
                <SubTitle>
                  <p>Sub Title 1</p>
                  <p>Sub Title 2</p>
                  <p>Sub Title 3</p>
                </SubTitle>
                <Description>Descriptive Content</Description>
                <PrimaryActionButton
                  label="Learn More"
                  handler={clickEvent => clickEvent}
                />
                <SecondaryActionButton
                  label="Need Help?"
                  handler={clickEvent => clickEvent}
                />
              </BlankSlate>{' '}
              {/* s1:end */}
              <Snippet tag="s1" src={snippets} />
            </Body>
          </Panel>
          <Panel>
            <Header>Blank Slate - Left Alignment</Header>
            <Body>
              {/* s2:start */}
              <BlankSlate
                alignment="left-side"
                title="Title"
                headerGraphic={<IconExample />}
              >
                <SubTitle>
                  <p>Sub Title 1</p>
                  <p>Sub Title 2</p>
                  <p>Sub Title 3</p>
                </SubTitle>
                <Description>Descriptive Content</Description>
                <PrimaryActionButton
                  label="Learn More"
                  handler={clickEvent => clickEvent}
                />
              </BlankSlate>
              {/* s2:end */}
              <Snippet tag="s2" src={snippets} />
            </Body>
          </Panel>
        </div>
      );
    }}
  </Demo>
);
