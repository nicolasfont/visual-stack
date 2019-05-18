import React from 'react';
import * as R from 'ramda';
import { parse, trimLeadingWhiteSpace } from './snippetParser';
import './styles.css';
import Highlight, { defaultProps } from 'prism-react-renderer';
import vsDark from 'prism-react-renderer/themes/vsDark';
import { format } from 'prettier/standalone';
import jsParser from 'prettier/parser-babylon';
import cssParser from 'prettier/parser-postcss';

export const InlineSnippet = ({ tag, src }) => {
  const srcTag = R.view(R.lensPath([tag]))(src);
  if (!srcTag) return null;
  return (
    <pre className="inline-snippet">
      {trimLeadingWhiteSpace(src[tag]).join(' ')}
    </pre>
  );
};

export const Snippet = ({ tag, src, suffix = '', lang = 'jsx' }) => {
  const srcTag = R.view(R.lensPath([tag]))(src);
  if (!srcTag) return null;
  return (
    <div className="snippet">
      <Highlight
        {...defaultProps}
        code={
          lang === 'jsx-fragment'
            ? src[tag].join('\n')
            : format(src[tag].join('\n') + `\n${suffix}`, {
                parser: lang === 'css' ? 'postcss' : 'babel',
                plugins: [jsParser, cssParser],
              })
        }
        language={lang === 'jsx-fragment' ? 'jsx' : lang}
        theme={vsDark}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: {},
      srcFile: props.srcFile,
    };
  }

  componentDidMount() {
    fetch(this.state.srcFile)
      .then(res => res.text())
      .then(src =>
        this.setState({
          src: parse(src),
        })
      );
  }

  render() {
    return this.props.children(this.state.src);
  }
}
