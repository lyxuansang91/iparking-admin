import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'
import {routes} from './routes/RouteMap'

ReactDOM.render(
    <BrowserRouter>
    {renderRoutes(routes)}
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();