import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {routes} from './routes/RoutesMap'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'

ReactDOM.render(
    <BrowserRouter>
    <App/>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();