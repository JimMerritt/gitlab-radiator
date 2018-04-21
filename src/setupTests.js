/* eslint-disable import/no-extraneous-dependencies */

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { JSDOM } from 'jsdom';

configure({ adapter: new Adapter() });

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce(
      (result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop)
      }),
      {}
    );
  Object.defineProperties(target, props);
}

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js'
};

copyProps(window, global);
