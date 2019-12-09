import React from 'react';
import { Body, Header, Panel } from '@cjdev/visual-stack/lib/components/Panel';
import { Demo, Snippet } from '../../../components/Demo';
import InformationOutlineIcon from 'mdi-react/InformationOutlineIcon';
import './popover.css';
/* s1:start */
import Popover, {
  HoverPopover,
} from '@cjdev/visual-stack/lib/components/Popover';
/* s1:end */

export default () => (
  <Demo srcFile="/samples/src/containers/Components/Docs/popover.js">
    {snippets => {
      return (
        <div>
          <Panel>
            <Header>Popover</Header>
            <Body>
              {/* s2:start */}
              <div style={{ margin: '75px 200px' }}>
                <Popover
                  shown={true}
                  placement={'top'}
                  content={
                    <span style={{ color: 'red' }}>This is the content</span>
                  }
                  onMouseOver={() => console.log('mouseOver')}
                  onMouseLeave={() => console.log('mouseLeave')}
                >
                  <div className="popover-demo-bordered-div">
                    I'm the reference element
                  </div>
                </Popover>
              </div>
              {/* s2:end */}
              <Snippet tag="s1" src={snippets} />
              <Snippet tag="s2" src={snippets} />
            </Body>
          </Panel>
          <Panel>
            <Header>Hover Popover</Header>
            <Body>
              {/* s3:start */}
              <div style={{ margin: '75px 200px' }}>
                <HoverPopover
                  placement={'bottom'}
                  content={
                    <span style={{ color: 'blue' }}>This is the content</span>
                  }
                >
                  <div className="popover-demo-bordered-div">
                    I'm the reference element
                  </div>
                </HoverPopover>
              </div>
              {/* s3:end */}
              <Snippet tag="s3" src={snippets} />
            </Body>
          </Panel>
          <Panel>
            <Header>Popover for some text</Header>
            <Body>
              {/* s4:start */}
              <div style={{ margin: '75px 200px' }}>
                <HoverPopover
                  placement={'bottom'}
                  content={
                    <span style={{ color: 'green' }}>This is the content</span>
                  }
                >
                  <InformationOutlineIcon />
                  <span className="popover-demo-dashed-underline">
                    I am some text
                  </span>
                </HoverPopover>
              </div>
              {/* s4:end */}
              <Snippet tag="s4" src={snippets} />
            </Body>
          </Panel>
        </div>
      );
    }}
  </Demo>
);
