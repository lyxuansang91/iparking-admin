import React, {Component} from 'react';
import {PageContentHeader} from './PageContentHeader';

export class PageContainerWrapper extends Component {
    render() {
        return (
            <div className="page-content-wrapper">
                <div className="page-content">
                    {/*BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM*/}
                    <PageContentHeader/>
                </div>
            </div>
        );
    }
}
