import React from 'react';
import { Demo, Snippet } from '../../../components/Demo';
import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
/* s1:start */
import {
  GaugeContainer,
  Gauge,
  GaugeTitle,
  GaugeValue,
  GaugeTrendContainer,
  GaugeTrend,
  GaugeTrendValue,
  GaugeTrendLabel,
  GaugeNegativeTrendValue,
  GaugePositiveTrendValue,
  GaugeValueUnit,
} from '@cjdev/visual-stack/lib/components/Gauge';
/* s1:end */

export default () => (
  <Demo srcFile="/samples/src/containers/Components/Docs/gauge.js">
    {snippets => {
      return (
        <div>
          <Panel>
            <Header>Gauges</Header>
            <Body>
              <Snippet tag="s1" src={snippets} />
              <Snippet tag="s2" src={snippets} />
              {/* s2:start */}
              <GaugeContainer>
                <Gauge>
                  <GaugeTitle># of total violations</GaugeTitle>
                  <GaugeValue>7</GaugeValue>
                  <GaugeTrendContainer>
                    <GaugeTrend>
                      <GaugeNegativeTrendValue>-3</GaugeNegativeTrendValue>
                      <GaugeTrendLabel>change</GaugeTrendLabel>
                    </GaugeTrend>
                    <GaugeTrend>
                      <GaugeTrendValue>10</GaugeTrendValue>
                      <GaugeTrendLabel>prev. period</GaugeTrendLabel>
                    </GaugeTrend>
                  </GaugeTrendContainer>
                </Gauge>
                <Gauge>
                  <GaugeTitle>High Severity Violations</GaugeTitle>
                  <GaugeValue>7</GaugeValue>
                  <GaugeTrendContainer>
                    <GaugeTrend>
                      <GaugeNegativeTrendValue>-2</GaugeNegativeTrendValue>
                      <GaugeTrendLabel>change</GaugeTrendLabel>
                    </GaugeTrend>
                    <GaugeTrend>
                      <GaugeTrendValue>4</GaugeTrendValue>
                      <GaugeTrendLabel>prev. period</GaugeTrendLabel>
                    </GaugeTrend>
                  </GaugeTrendContainer>
                </Gauge>
                <Gauge>
                  <GaugeTitle># of Total Violations</GaugeTitle>
                  <GaugeValue>16</GaugeValue>
                  <GaugeTrendContainer>
                    <GaugeTrend>
                      <GaugeNegativeTrendValue>-4</GaugeNegativeTrendValue>
                      <GaugeTrendLabel>change</GaugeTrendLabel>
                    </GaugeTrend>
                    <GaugeTrend>
                      <GaugeTrendValue>20</GaugeTrendValue>
                      <GaugeTrendLabel>prev. period</GaugeTrendLabel>
                    </GaugeTrend>
                  </GaugeTrendContainer>
                </Gauge>
                <Gauge>
                  <GaugeTitle>Average Resolution Time (hrs)</GaugeTitle>
                  <GaugeValue>
                    9.91 <GaugeValueUnit>hrs</GaugeValueUnit>
                  </GaugeValue>
                  <GaugeTrendContainer>
                    <GaugeTrend>
                      <GaugePositiveTrendValue>+7.11</GaugePositiveTrendValue>
                      <GaugeTrendLabel>change</GaugeTrendLabel>
                    </GaugeTrend>
                    <GaugeTrend>
                      <GaugeTrendValue>20</GaugeTrendValue>
                      <GaugeTrendLabel>prev. period</GaugeTrendLabel>
                    </GaugeTrend>
                  </GaugeTrendContainer>
                </Gauge>
              </GaugeContainer>
              {/* s2:end */}
            </Body>
          </Panel>
        </div>
      );
    }}
  </Demo>
);
