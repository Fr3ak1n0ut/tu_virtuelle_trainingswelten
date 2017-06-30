import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Themeprovider from 'react-toolbox/lib/ThemeProvider';
import theme from './toolbox/theme.js';
import './toolbox/theme.css';

ReactDOM.render(
    <Themeprovider theme={theme}>< App/></Themeprovider>, document.getElementById('root'));
registerServiceWorker();