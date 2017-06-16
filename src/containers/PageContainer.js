import React, {Component} from 'react';
import PageSideBar from './PageSideBar';
import PageContainerWrapper from './PageContentWrapper';
import PageFooter from './PageFooter';
import {renderRoutes} from 'react-router-config'
import {routes} from '../routes/RoutesMap'

class PageContainer extends Component {
    render() {
        return (
            <div className="page-container">
                <PageSideBar/>
                <PageContainerWrapper route={routes.routes}/>
                <PageFooter/>
            </div>
        )
    }
}

export default PageContainer