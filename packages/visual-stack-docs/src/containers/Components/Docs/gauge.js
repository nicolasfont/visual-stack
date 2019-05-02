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
                <Gauge>CJ</Gauge>
                <Gauge>Is</Gauge>
                <Gauge>Here</Gauge>
              </GaugeContainer>
              {/* s2:end */}
            </Body>
          </Panel>
        </div>
      );
    }}
  </Demo>
);
