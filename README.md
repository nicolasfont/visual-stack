# CJ Affiliate Visual Stack

[![Build Status](https://travis-ci.org/cjdev/visual-stack.svg?branch=master)](https://travis-ci.org/cjdev/visual-stack)

This package includes a set of React components with a consistent visual style that can be consumed in other React applications. The components are unbiased and generally stateless, composed primarily of visual styles rather than functionality.

## Installation

```
$ npm install --save @cjdev/visual-stack bootstrap-loader bootstrap-sass
```

## Usage

This package includes both a set of components and a global stylesheet composed of global styles. To include the global styles, require the `@cjdev/visual-stack/lib/global` module, or add it as a webpack entry point or similar.

The individual components are provided under the `@cjdev/visual-stack/lib/components/` path. It may be worthwhile to add a shorter alias for this require path to keep imports short.


### Example

```js
import React from 'react';
import ReactDOM from 'react-dom';

import '@cjdev/visual-stack/lib/global';

import { Button } from '@cjdev/visual-stack/lib/components/Button';
import { Panel, Body } from '@cjdev/visual-stack/lib/components/Panel';

ReactDOM.render(
  <Panel>
    <Body>
      <h1>Hello, world!</h1>
      <Button type="primary" onClick={() => console.log('clicked!')}>Click Me</Button>
    </Body>
  </Panel>,
  document.getElementById('application')
);
```

## Contributing

Initial scripts to start: 
`npm install`
`npm run bootstrap`

To run Visual Stack Documentation site:

`cd packages/visual-stack-docs/`
`npm run docs`

A new server should run and open the site

Watch scripts for visual-stack and visual-stack-redux 
- While developing, these scripts will automatically build and update your code on the visual-stack-docs site

`cd packages/visual-stack/`
`npm run watch`

`cd packages/visual-stack-redux/`
`npm run watch`

Publishing

To publish, you must have lerna installed globally
`npm install lerna -g`

Publish steps:
- Update CHANGELOG.md with notes and version number
- Push/merge into master 
- `lerna publish`


