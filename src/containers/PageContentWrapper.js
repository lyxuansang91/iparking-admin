import React, {Component} from 'react';
import PageContentHeader from './PageContentHeader';
import {renderRoutes} from 'react-router-config'
import PageContentMain from './PageContentMain'
import DataGridDemo from '../components/DataGridDemo'
import SearchTicket from '../components/SearchTicket'

class PageContainerWrapper extends Component {
    render() {
        let _view = null;
        console.log("type:", this.props.type)
        switch (this.props.type) {
            case '1':
                _view = <PageContentMain/>;
                break;
            case '2':
                _view = <DataGridDemo/>;
                break;
            case '3':
                _view = <SearchTicket/>;
                break;
            default:
                _view = <PageContentMain/>
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
