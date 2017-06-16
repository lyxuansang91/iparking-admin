import React from 'react'
import App from '../App'
import PageContentHeader from '../containers/PageContentHeader'
import PageContentWrapper from '../containers/PageContentWrapper'
// import Dashboard from './components/Dashboard' import CarParkingPlace from
// './components/CarParkingPlace'

const routes = {
    routes: [
        {
            exact: true,
            path: '/',
            component: () => <PageContentHeader content_title="Dash Board"/>
        }, {
            path: '/cpp',
            component: () => <PageContentHeader content_title="Car Parking Place"/>
        }
    ]
}
export {routes}