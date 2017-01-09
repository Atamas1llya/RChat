import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
require('./less/main.less');
require('./less/chat.less');
require('./less/message.less');
require('./less/Sign.less');


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
