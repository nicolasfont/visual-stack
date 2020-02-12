import React from 'react';
import { Demo, Snippet } from '../../../components/Demo';
import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import Text from '@cjdev/visual-stack/lib/components/Text';

export default () => {
  return (
    <Demo srcFile="/samples/src/containers/Components/Docs/text.js">
        {snippets =>
            <div>
              <Panel>
                <Body>
                  <p>
                      Renders text with the correct font and styles without relying on globals.
                  </p>
                </Body>
              </Panel>
              <Panel>
                <Header>Text types</Header>
                <Body>
                  {/* s1:start */}
                  <Text>Default</Text>
                  {/* s1:end */}
                  <Snippet tag="s1" src={snippets} />

                  {/* s2:start */}
                  <Text type="light">Light</Text>
                  {/* s2:end */}
                  <Snippet tag="s2" src={snippets} />

                  {/* s3:start */}
                  <Text type="bold">Bold</Text>
                  {/* s3:end */}
                  <Snippet tag="s3" src={snippets} />

                  {/* s4:start */}
                  <Text type="small">Small</Text>
                  {/* s4:end */}
                  <Snippet tag="s4" src={snippets} />

                  {/* s5:start */}
                  <Text type="small-light">Small Light</Text>
                  {/* s5:end */}
                  <Snippet tag="s5" src={snippets} />

                  {/* s6:start */}
                  <Text type="h1">Heading 1</Text>
                  {/* s6:end */}
                  <Snippet tag="s6" src={snippets} />

                  {/* s7:start */}
                  <Text type="h2">Heading 2</Text>
                  {/* s7:end */}
                  <Snippet tag="s7" src={snippets} />

                  {/* s8:start */}
                  <Text type="h3">Heading 3</Text>
                  {/* s8:end */}
                  <Snippet tag="s8" src={snippets} />

                  {/* s9:start */}
                  <Text type="h4">Heading 4</Text>
                  {/* s9:end */}
                  <Snippet tag="s9" src={snippets} />

                  {/* s10:start */}
                  <Text type="h5">Heading 5</Text>
                  {/* s10:end */}
                  <Snippet tag="s10" src={snippets} />

                  {/* s11:start */}
                  <Text type="h6">Heading 6</Text>
                  {/* s11:end */}
                  <Snippet tag="s11" src={snippets} />

                  {/* s12:start */}
                  <Text type="subheading">Subheading</Text>
                  {/* s12:end */}
                  <Snippet tag="s12" src={snippets} />

                  {/* s13:start */}
                  <a href="http://cj.com"><Text type="link">Link</Text></a>
                  {/* s13:end */}
                  <Snippet tag="s13" src={snippets} />
                </Body>
              </Panel>
              <Panel>
                <Header>Italic</Header>
                <Body>
                  {/* s14:start */}
                  <Text italic>Italic</Text>
                  {/* s14:end */}
                  <Snippet tag="s14" src={snippets} />

                  {/* s15:start */}
                  <Text italic type="h4">Italic Heading 4</Text>
                  {/* s15:end */}
                  <Snippet tag="s15" src={snippets} />
                </Body>
              </Panel>
            </div>
        }
    </Demo>
  );
};
