import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import {renderRoutes} from 'react-router-config'
import {routes} from './routes/RouteMap'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'

const store = configureStore() // you can also pass in

let unsubscribe = store.subscribe(() => console.log("state:", store.getState()))

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        {renderRoutes(routes)}
    </BrowserRouter>
</Provider>, document.getElementById('root'));

registerServiceWorker();