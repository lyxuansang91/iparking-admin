import React, {Component} from 'react';

class PageHeader extends Component {
    render() {
        return (
            <div className="page-header navbar navbar-fixed-top">
                <div className="page-header-inner">
                    <div className="page-logo">
                        <a href="#">
                            <img
                                src={process.env.PUBLIC_URL + '/assets/admin/layout/img/logo_iparking.png'}
                                alt="logo"
                                className="logo-default"/>
                        </a>
                        <div className="menu-toggler sidebar-toggler hide"></div>
                    </div>
                    <span
                        style={{
                        float: 'right',
                        lineHeight: '54px',
                        color: '#fff',
                        fontFamily: 'helvetica-light',
                        fontSize: '25px',
                        marginRight: '100px'
                    }}>Trung Tâm Dữ Liệu iParking</span>

                    <i
                        className="fa fa-arrows-alt go-full-screen"
                        aria-hidden="true"
                        style={{
                        position: 'absolute',
                        top: '20px',
                        right: '35px',
                        fontSize: '20px',
                        color: '#ccc',
                        cursor: 'pointer',
                        zIndex: '500000'
                    }}></i>
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