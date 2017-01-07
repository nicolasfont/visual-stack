import chai from 'chai';
chai.use(require('sinon-chai'));
chai.use(require('chai-enzyme')());

global.expect = chai.expect;

import $ from 'jquery';
global.mountPoint = $('<div id="mount">').appendTo(document.body)[0];
