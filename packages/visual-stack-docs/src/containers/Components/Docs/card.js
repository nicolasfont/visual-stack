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
} from '@cjdev/visual-stack/lib/components/AnalyticCard';
/* s3:end */
import './card.css';

export default () => (
  <Demo srcFile="/samples/src/containers/Components/Docs/card.js">
    {snippets => {
      return (
        <div>
          <Panel>
            <Header>Card</Header>
            <Body>
              <Snippet tag="s2" src={snippets} />
              {/* s1:start */}
              <Card href="https://cj.com" className="additional-classes">
                Go to cj.com
              </Card>
              {/* s1:end */}
              <Snippet tag="s1" src={snippets} />
            </Body>
          </Panel>

          <Panel>
            <Header>Analytic Cards</Header>
            <Body>
              <Snippet tag="s3" src={snippets} />
              <Snippet tag="s4" src={snippets} />
              {/* s4:start */}
              <AnalyticCardContainer>
                <AnalyticCard>
                  <AnalyticCardTitle># of total violations</AnalyticCardTitle>
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
                      <AnalyticCardTrendLabel>
                        prev. period
                      </AnalyticCardTrendLabel>
                    </AnalyticCardTrend>
                  </AnalyticCardTrendContainer>
                </AnalyticCard>
                <AnalyticCard>
                  <AnalyticCardTitle>
                    High Severity Violations
                  </AnalyticCardTitle>
                  <AnalyticCardValue>7</AnalyticCardValue>
                  <div>Custom Text</div>
                </AnalyticCard>
                <AnalyticCard>
                  <AnalyticCardValue>16</AnalyticCardValue>
                  <AnalyticCardTrendContainer>
                    <AnalyticCardTrend>
                      <AnalyticCardTrendLabel>change</AnalyticCardTrendLabel>
                      <AnalyticCardNegativeTrendValue>
                        -4
                      </AnalyticCardNegativeTrendValue>
                    </AnalyticCardTrend>
                    <AnalyticCardTrend>
                      <AnalyticCardTrendLabel>
                        prev. period
                      </AnalyticCardTrendLabel>
                      <AnalyticCardTrendValue>20</AnalyticCardTrendValue>
                    </AnalyticCardTrend>
                  </AnalyticCardTrendContainer>
                </AnalyticCard>
                <AnalyticCard className="make-it-different">
                  <AnalyticCardTitle>
                    Average Resolution Time (hrs)
                  </AnalyticCardTitle>
                  <AnalyticCardValue>
                    9.91 <AnalyticCardValueUnit>hrs</AnalyticCardValueUnit>
                  </AnalyticCardValue>
                  <AnalyticCardTrendContainer>
                    <AnalyticCardTrend>
                      <AnalyticCardPositiveTrendValue>
                        +7.11
                      </AnalyticCardPositiveTrendValue>
                      <AnalyticCardTrendLabel>change</AnalyticCardTrendLabel>
                    </AnalyticCardTrend>
                    <AnalyticCardTrend>
                      <AnalyticCardTrendValue>20</AnalyticCardTrendValue>
                      <AnalyticCardTrendLabel>
                        prev. period
                      </AnalyticCardTrendLabel>
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
                      <AnalyticCardTrendLabel>
                        prev. period
                      </AnalyticCardTrendLabel>
                    </AnalyticCardTrend>
                  </AnalyticCardTrendContainer>
                </AnalyticCard>
              </AnalyticCardContainer>
              {/* s4:end */}
            </Body>
          </Panel>
        </div>
      );
    }}
  </Demo>
);
