import React, {Component} from 'react';
import PageContentHeader from './PageContentHeader';
import {renderRoutes} from 'react-router-config'
import PageContentMain from './PageContentMain'

class PageContainerWrapper extends Component {
    render() {
        return (
            <div className="page-content-wrapper">
                <div className="page-content">
                    {/*BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM*/}
                    {console.log('routes:', this.props)}
                    <PageContentHeader content_title={this.props.content_title}/>
                    <PageContentMain/>
                </div>
            </div>
        )
    }
}

export default PageContainerWrapper
