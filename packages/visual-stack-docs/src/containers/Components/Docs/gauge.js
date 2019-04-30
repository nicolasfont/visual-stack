import React from 'react';
import { Demo, Snippet } from '../../../components/Demo';
/* s1:start */
import {
  GaugeContainer,
  Gauge,
} from '@cjdev/visual-stack/lib/components/Gauge';
/* s1:end */

export default () => (
  <Demo srcFile="/samples/src/containers/Components/Docs/gauge.js">
    {snippets => {
      return (
        <div>
          <Snippet tag="s1" src={snippets} />
          <GaugeContainer>
            <Gauge>Hello</Gauge>
            <Gauge>CJ</Gauge>
            <Gauge>Is</Gauge>
            <Gauge>Here</Gauge>
          </GaugeContainer>
        </div>
      );
    }}
  </Demo>
);
