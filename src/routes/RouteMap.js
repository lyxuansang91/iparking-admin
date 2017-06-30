import React from 'react'
import App from '../App'
import Root from '../components/Root'
import Login from '../components/Login'
import PageContentWrapper from '../containers/PageContentWrapper'
// import Dashboard from './components/Dashboard' import CarParkingPlace from
// './components/CarParkingPlace'

const types = {
    home: '1',
    cpp: '2',
    searchTicket: '3',
    reportRevenue: '4',
    reportMonthlyRevenue: '5',
    managementMonthlyTicket: '6',
    managementPromotion: '7',
    managementUser: '8',
    reportRateRevenue: '9',
    monthlyTicketList: '10'
}

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
                        component: () => <PageContentWrapper content_title="Trang chủ" type={types.home}/>,
                        exact: true,
                        path: '/'
                    }, {
                        component: () => <PageContentWrapper content_title="Địa điểm đỗ xe" type={types.cpp}/>,
                        path: '/cpp'
                    }, {
                        component: () => <PageContentWrapper
                            content_title="Tra cứu phiếu gửi xe"
                            type={types.searchTicket}/>,
                        path: '/search/ticket'
                    }, {
                        component: () => <PageContentWrapper
                            content_title="Doanh số đơn vị khai thác"
                            type={types.reportRevenue}/>,
                        path: '/report/revenue'
                    }, {
                        component: () => <PageContentWrapper
                            content_title="Doanh số điểm đỗ"
                            type={types.reportMonthlyRevenue}/>,
                        path: '/report/monthly_revenue'
                    }, {
                        component: () => <PageContentWrapper
                            content_title="Đánh giá điểm đỗ"
                            type={types.reportRateRevenue}/>,
                        path: '/report/rate_revenue'
                    }, {
                        component: () => <PageContentWrapper
                            content_title="Quản lý vé tháng"
                            type={types.managementMonthlyTicket}/>,
                        path: '/management/monthly_ticket'
                    }, {
                        component: () => <PageContentWrapper
                            content_title="Chương trình khuyến mãi"
                            type={types.managementPromotion}/>,
                        path: '/management/promotion'
                    }, {
                        component: () => <PageContentWrapper
                            content_title="Quản lý người dùng"
                            type={types.managementUser}/>,
                        path: '/management/user'
                    }, {
                        component: () => <PageContentWrapper
                            content_title="Danh sách hợp đồng vé tháng"
                            type={types.monthlyTicketList}/>,
                        path: '/monthly_ticket/list'
                    }
                ]
            }
        ]
    }
]
export {routes, types}