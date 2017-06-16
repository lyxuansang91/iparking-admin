import React, {Component} from 'react';

class PageHeader extends Component {
    render() {
        return (
            <div className="page-header navbar navbar-fixed-top">
                <div className="page-header-inner">
                    <div className="page-logo">
                        <a href="#">
                            <img
                                src={process.env.PUBLIC_URL + '/assets/admin/layout/img/logo.png'}
                                alt="logo"
                                className="logo-default"/>
                        </a>
                        <div className="menu-toggler sidebar-toggler hide"></div>
                    </div>
                    <a
                        href="javascript:;"
                        className="menu-toggler responsive-toggler"
                        data-toggle="collapse"
                        data-target=".navbar-collapse"></a>
                </div>
            </div>
        );
    }
}

export default PageHeader