import React, { Component } from 'react';
import PageContentHeader from './PageContentHeader';
import { renderRoutes } from 'react-router-config'
import PageContentMain from './PageContentMain'
import SearchTicket from '../components/Ticket/SearchDailyTicket'
import { types } from '../routes/RouteMap'
import ReportRevenue from '../components/ReportRevenue'
import ReportMonthlyRevenue from '../components/Report/ReportMonthlyRevenue'
import ReportAllRevenue from '../components/Report/ReportAllRevenue'
import ListMonthlyTicket from '../components/Ticket/ListMonthlyTicket'
import CPPRevenueRate from '../components/Report/CPPRevenueRate'
import DailyTicket from '../components/Ticket/DailyTicket'
import MonthlyTicket from '../components/Ticket/MonthlyTicket'
import ReportParkingStatus from '../components/Report/ReportParkingStatus'

class PageContainerWrapper extends Component {
    render() {
        let _view = null;
        console.log("type:", this.props.type)
        switch (this.props.type) {
            case types.home:
                _view = <PageContentMain />;
                break;
            case types.searchTicket:
                _view = <SearchTicket />;
                break;
            case types.reportRevenue:
                _view = <ReportRevenue />;
                break;
            case types.reportMonthlyRevenue:
                _view = <ReportMonthlyRevenue />;
                break;
            case types.reportAllRevenue:
                _view = <ReportAllRevenue />;
                break;
            case types.reportRateRevenue:
                _view = <CPPRevenueRate />;
                break;
            case types.monthlyTicketList:
                _view = <ListMonthlyTicket />;
                break;
            case types.dailyTicket:
                _view = <DailyTicket />;
                break;
            case types.monthlyTicket:
                _view = <MonthlyTicket />;
                break;
            case types.reportParkingStatus:
                _view = <ReportParkingStatus />;
                break;
            default:
                _view = <PageContentMain />;
                break;
        }
        return (
            <div className="page-content-wrapper">
                <div className="page-content">
                    {/*BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM*/}
                    {console.log('routes:', this.props)}
                    <PageContentHeader content_title={this.props.content_title} /> {/*<PageContentMain/>*/}
                    {_view}
                </div>
            </div>
        )
    }
}

export default PageContainerWrapper
