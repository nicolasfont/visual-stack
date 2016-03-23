# CJ Affiliate Visual Stack for Redux

[![Build Status](https://travis-ci.org/cjdev/visual-stack-redux.svg?branch=master)](https://travis-ci.org/cjdev/visual-stack-redux)

This package provides [Redux][redux] bindings around the React components provided in the [CJ Affiliate Visual Stack][visual-stack]. Not all components have wrapped counterparts—components that have no need to have stateful interactions do not need to be wrapped to be usefully consumed by a Redux application.

## Installation

```
$ npm install --save @cjdev/visual-stack-redux
```

## Usage

This package includes a set of components that are designed to be connected to a Redux store. In addition to the wrapped components, a Redux reducer is provided that should be mounted in the store under the `visualStack` key, along with actions that can be used to affect the application state.

### Example

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import '@cjdev/visual-stack/lib/global';

import visualStackReducer from '@cjdev/visual-stack-redux';
import { MenuBar, MenuBarItem, MenuBarDropdown, MenuBarDropdownItem } from '@cjdev/visual-stack-redux/lib/components/MenuBar';

const reducer = combineReducers({
  visualStack: visualStackReducer,
});
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <MenuBar title="My App" titleHref="/">
      <MenuBarItem to="/">Home</MenuBarItem>
      <MenuBarDropdown title="Content">
        <MenuBarDropdownItem to="/blog">Blog</MenuBarDropdownItem>
        <MenuBarDropdownItem to="/news">News Feed</MenuBarDropdownItem>
      </MenuBarDropdown>
    </MenuBar>
  </Provider>,
  document.getElementById('application')
);
```

## Contributing

To work on this project locally, use `npm link` to create a local link to your working package. Run `npm run watch` to automatically rebuild the project as the source changes, which will also copy assets.

[redux]: https://github.com/reactjs/redux
[visual-stack]: https://github.com/cjdev/visual-stack
