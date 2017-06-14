import React, {Component} from 'react';
import {PageSideBar} from './PageSideBar';
import {PageContainerWrapper} from './PageContentWrapper';
import {PageFooter} from './PageFooter';

export class PageContainer extends Component {
    render() {
        return (
            <div className="page-container">
                <PageSideBar/>
                <PageContainerWrapper/>
                <PageFooter/>
            </div>
        )
    }
}