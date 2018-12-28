import React from 'react';
import './Card.css';

import * as R from 'ramda';

const isPropEmpty = (prop) => (R.isNil(prop) || R.isEmpty(prop));

export default (props) => (isPropEmpty(props.href)) ? 
  <div {...props} className={`vs-card ${ props.className ? props.className : '' }`} >{props.children}</div> :
  <a {...props} className={`vs-card-clickable ${ props.className ? props.className : '' }`}>{props.children}</a>;
