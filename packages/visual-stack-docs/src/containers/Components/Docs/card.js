import React from 'react';
import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import { Demo, Snippet } from '../../../components/Demo';
/* s2:start */
import Card from '@cjdev/visual-stack/lib/components/Card';
/* s2:end */
/* s3:start */
import {
  AnalyticCardContainer,
  AnalyticCard,
  AnalyticCardTitle,
  AnalyticCardValue,
  AnalyticCardTrendContainer,
  AnalyticCardTrend,
  AnalyticCardTrendValue,
  AnalyticCardTrendLabel,
  AnalyticCardNegativeTrendValue,
  AnalyticCardPositiveTrendValue,
  AnalyticCardValueUnit,
  ViewDetailButton,
} from '@cjdev/visual-stack/lib/components/AnalyticCard';
/* s3:end */

export default () => (
  <Demo srcFile="/samples/src/containers/Components/Docs/card.js">
    {snippets => {
      return (
        <div>
          <h3>Basic Card</h3>
          {/* s1:start */}
          <Card href="https://cj.com" className="additional-classes">
            Go to cj.com
          </Card>
          {/* s1:end */}
          <Panel>
            <Header>Example Source</Header>
            <Body>
              <Snippet tag="s2" src={snippets} />
              <Snippet tag="s1" src={snippets} />
            </Body>
          </Panel>
          <h3>Analytic Cards</h3>
          {/* s4:start */}
          <AnalyticCardContainer>
            <AnalyticCard>
              <AnalyticCardTitle>Total Violations</AnalyticCardTitle>
              <AnalyticCardValue>7</AnalyticCardValue>
              <AnalyticCardTrendContainer>
                <AnalyticCardTrend>
                  <AnalyticCardNegativeTrendValue>
                    -3
                  </AnalyticCardNegativeTrendValue>
                  <AnalyticCardTrendLabel>change</AnalyticCardTrendLabel>
                </AnalyticCardTrend>
                <AnalyticCardTrend>
                  <AnalyticCardTrendValue>10</AnalyticCardTrendValue>
                  <AnalyticCardTrendLabel>prev. period</AnalyticCardTrendLabel>
                </AnalyticCardTrend>
              </AnalyticCardTrendContainer>
              <ViewDetailButton
                onClick={() => {
                  // eslint-disable-next-line no-alert
                  window.alert('onClick View Details');
                }}
              />
            </AnalyticCard>
            <AnalyticCard>
              <AnalyticCardTitle>High Severity Violations</AnalyticCardTitle>
              <AnalyticCardValue>7</AnalyticCardValue>
              <div className="vs-analytic-card-custom-text">Custom Text</div>
            </AnalyticCard>
            <AnalyticCard>
              <AnalyticCardTitle>Total Error Points</AnalyticCardTitle>
              <AnalyticCardValue>16</AnalyticCardValue>
              <AnalyticCardTrendContainer>
                <AnalyticCardTrend>
                  <AnalyticCardTrendLabel>change</AnalyticCardTrendLabel>
                  <AnalyticCardNegativeTrendValue>
                    -4
                  </AnalyticCardNegativeTrendValue>
                </AnalyticCardTrend>
                <AnalyticCardTrend>
                  <AnalyticCardTrendLabel>prev. period</AnalyticCardTrendLabel>
                  <AnalyticCardTrendValue>20</AnalyticCardTrendValue>
                </AnalyticCardTrend>
              </AnalyticCardTrendContainer>
            </AnalyticCard>
            <AnalyticCard
              onClick={() => {
                // eslint-disable-next-line no-alert
                window.alert('onClick alert!');
              }}
            >
              <AnalyticCardTitle>Clickable Card</AnalyticCardTitle>
              <AnalyticCardValue>
                4.2 <AnalyticCardValueUnit>hrs</AnalyticCardValueUnit>
              </AnalyticCardValue>
              <AnalyticCardTrendContainer>
                <AnalyticCardTrend>
                  <AnalyticCardPositiveTrendValue>
                    +1
                  </AnalyticCardPositiveTrendValue>
                  <AnalyticCardTrendLabel>change</AnalyticCardTrendLabel>
                </AnalyticCardTrend>
                <AnalyticCardTrend>
                  <AnalyticCardTrendValue>3.2</AnalyticCardTrendValue>
                  <AnalyticCardTrendLabel>prev. period</AnalyticCardTrendLabel>
                </AnalyticCardTrend>
              </AnalyticCardTrendContainer>
            </AnalyticCard>
          </AnalyticCardContainer>
          {/* s4:end */}

          <Panel>
            <Header>Example Source</Header>
            <Body>
              <Snippet tag="s3" src={snippets} />
              <Snippet tag="s4" src={snippets} />
            </Body>
          </Panel>
        </div>
      );
    }}
  </Demo>
);
