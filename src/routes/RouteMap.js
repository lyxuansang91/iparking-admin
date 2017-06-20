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
                        component: () => <PageContentWrapper content_title="Trang chủ"/>,
                        exact: true,
                        path: '/'
                    }, {
                        component: () => <PageContentWrapper content_title="Địa điểm đỗ xe"/>,
                        path: '/cpp'
                    }, {
                        component: () => <PageContentWrapper content_title="Tra cứu phiếu gửi xe"/>,
                        path: '/search/ticket'
                    }, {
                        component: () => <PageContentWrapper content_title="Báo cáo doanh số"/>,
                        path: '/report/revenue'
                    }, {
                        component: () => <PageContentWrapper content_title="Quản lý vé tháng"/>,
                        path: '/management/monthly_ticket'
                    }, {
                        component: () => <PageContentWrapper content_title="Chương trình khuyến mãi"/>,
                        path: '/management/promotion'
                    }, {
                        component: () => <PageContentWrapper content_title="Quản lý người dùng"/>,
                        path: '/management/user'
                    }
                ]
            }
        ]
    }
]
export {routes}