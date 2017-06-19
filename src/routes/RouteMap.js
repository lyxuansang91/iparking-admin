import React from 'react'
import App from '../App'
import Root from '../components/Root'
import Login from '../components/Login'
import PageContentWrapper from '../containers/PageContentWrapper'
// import Dashboard from './components/Dashboard' import CarParkingPlace from
// './components/CarParkingPlace'

const routes = [
    {
        component: Root,
        routes: [
            {
                path: '/login',
                component: Login
            }, {
                component: App,
                routes: [
                    {
                        component: () => <PageContentWrapper content_title="Dash board"/>,
                        exact: true,
                        path: '/'
                    }, {
                        component: () => <PageContentWrapper content_title="Car Parking Place"/>,
                        path: '/cpp'
                    }
                ]
            }
        ]
    }
]
export {routes}