import React, {Component} from 'react';
import PageContentHeader from './PageContentHeader';
import {renderRoutes} from 'react-router-config'
import PageContentMain from './PageContentMain'
import DataGridDemo from '../components/DataGridDemo'
import SearchTicket from '../components/SearchTicket'
import {types} from '../routes/RouteMap'
import ReportRevenue from '../components/ReportRevenue'
import ReportMonthlyRevenue from '../components/ReportMonthlyRevenue'
import ReportRateRevenue from '../components/ReportRateRevenue'
import ManagementMonthlyTicket from '../components/ManagementMonthlyTicket'
import ManagementPromotion from '../components/ManagementPromotion'
import ListMonthlyTicket from '../components/ListMonthlyTicket'
import CPPRevenueRate from '../components/CPPRevenueRate'
import ItemList from '../components/ItemList'

class PageContainerWrapper extends Component {
    render() {
        let _view = null;
        console.log("type:", this.props.type)
        switch (this.props.type) {
            case types.home:
                _view = <PageContentMain/>;
                break;
            case types.cpp:
                _view = <DataGridDemo/>;
                break;
            case types.searchTicket:
                _view = <SearchTicket/>;
                break;
            case types.reportRevenue:
                _view = <ReportRevenue/>;
                break;
            case types.reportMonthlyRevenue:
                _view = <ReportMonthlyRevenue/>;
                break;
            case types.reportAllRevenue:
                _view = <ReportRateRevenue/>;
                break;
            case types.reportRateRevenue:
                _view = <CPPRevenueRate/>;
                break;
            case types.managementMonthlyTicket:
                _view = <ManagementMonthlyTicket/>;
                break;
            case types.managementPromotion:
                _view = <ManagementPromotion/>;
                break;
            case types.monthlyTicketList:
                _view = <ListMonthlyTicket/>;
                break;
            case types.testItemRedux:
                _view = <ItemList/>;
                break;
            default:
                _view = <PageContentMain/>;
                break;
        }
        return (
            <div className="page-content-wrapper">
                <div className="page-content">
                    {/*BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM*/}
                    {console.log('routes:', this.props)}
                    <PageContentHeader content_title={this.props.content_title}/> {/*<PageContentMain/>*/}
                    {_view}
                </div>
            </div>
        )
    }
}

export default PageContainerWrapper
