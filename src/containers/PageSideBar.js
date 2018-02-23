import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import '../assets/css/pagesidebar.css'
import { logoutUser } from '../actions/auth'
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';

class PageSideBar extends Component {

    constructor(props) {
        super(props)
        this.onLogout = this
            .onLogout
            .bind(this)
        console.log("current type: " + this.props.type)
        this.state = {
            active: ""
        };
    }

    onLogout() {
        if (this.props.isAuthenticated) {
            this
                .props
                .logoutUser()
        }
    }

    _handleClick(menuItem) {
        console.log("aaaaa")
        this.setState({ active: menuItem });
    }


    render() {
        const activeStyle = {
            background: '#2c3542'
        };

        const inActiveStyle = {
            background: 'none'
        };

        return (
            // <div style={{ background: '#2c3e50', color: '#FFF', width: 220 }}>
            //     <SideNav highlightColor='#E91E63' highlightBgColor='#00bcd4' defaultSelected='sales'>
            //         <Nav id='dashboard'>
            //             <NavIcon></NavIcon>
            //             <NavText> Dashboard </NavText>
            //         </Nav>
            //         <Nav id='sales'>
            //             <NavIcon></NavIcon>
            //             <NavText> Sales </NavText>
            //         </Nav>
            //     </SideNav>
            // </div>
            <div className="page-sidebar navbar-toggler navbar-collapse collapse">
                <ul
                    className="page-sidebar-menu"
                    data-keep-expanded="false"
                    data-auto-scroll="true"
                    data-slide-speed="200">

                    <li className="" >
                        <Link to="/"
                            style={this.state.active == "Trang chủ" ? activeStyle : inActiveStyle}
                            onClick={this._handleClick.bind(this, "Trang chủ")}>
                            <i className="fa fa-home"></i>
                            <span className="title">Trang chủ</span>
                            <span className="arrow "></span>
                        </Link>
                    </li>
                    {/*Vé lượt*/}
                    <li className="">
                        <a href="javascript:;">
                            <i className="fa fa-ticket"></i>
                            <span className="title">Vé lượt</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu">
                            <li>
                                <NavLink to="/search/ticket"
                                    style={this.state.active == "Vé lượt" ? activeStyle : inActiveStyle}
                                    onClick={this._handleClick.bind(this, "Vé lượt")}>
                                    <i className="fa fa-search icon-space"></i>
                                    Tra cứu vé lượt
                                </NavLink>
                            </li>
                            <li>
                                <Link to="/ticket/detail" style={this.state.active == "CT Vé lượt" ? activeStyle : inActiveStyle}
                                    onClick={this._handleClick.bind(this, "CT Vé lượt")}>
                                    <i className="fa fa-ticket icon-space"></i>
                                    Chi tiết vé lượt
                                </Link>
                            </li>
                        </ul>
                    </li>
                    {/*Vé tháng*/}
                    <li className="">
                        <a href="javascript:;">
                            <i className="fa fa-ticket"></i>
                            <span className="title">Hợp đồng tháng</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu">

                            <li>
                                <Link to="/monthly_ticket/list" style={this.state.active == "Vé thang" ? activeStyle : inActiveStyle}
                                    onClick={this._handleClick.bind(this, "Vé thang")}>
                                    <i className="fa fa-search icon-space"></i>
                                    Tra cứu hợp đồng tháng
                                </Link>
                            </li>
                            <li>
                                <Link to="/monthly_ticket/detail" style={this.state.active == "CT Vé thang" ? activeStyle : inActiveStyle}
                                    onClick={this._handleClick.bind(this, "CT Vé thang")}>
                                    <i className="fa fa-ticket icon-space"></i>
                                    Chi tiết hợp đồng tháng
                                </Link>
                            </li>
                        </ul>
                    </li>
                    {/*Báo cáo*/}
                    <li>
                        <a href="javascript:;" className="open">
                            <i className="fa fa-bar-chart"></i>
                            <span className="title">Báo cáo</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu">
                            {/*<li>
                                <Link to="/report/revenue">
                                    <i className="fa fa-usd icon-space"></i>
                                    Doanh số vé lượt
                                </Link>
                            </li>*/}
                            <li>
                                <Link to="/report/all_revenue" style={this.state.active == "all_revenue" ? activeStyle : inActiveStyle}
                                    onClick={this._handleClick.bind(this, "all_revenue")}>
                                    <i className="fa fa-tag icon-space"></i>
                                    Tổng hợp doanh số
                                </Link>
                            </li>
                            <li>
                                <Link to="/report/monthly_revenue" style={this.state.active == "monthly_revenue" ? activeStyle : inActiveStyle}
                                    onClick={this._handleClick.bind(this, "monthly_revenue")}>
                                    <i className="fa fa-usd icon-space"></i>
                                    Tổng hợp doanh số theo tháng
                                </Link>
                            </li>
                            <li>
                                <Link to="/report/parking_status" style={this.state.active == "parking_status" ? activeStyle : inActiveStyle}
                                    onClick={this._handleClick.bind(this, "parking_status")}>
                                    <i className="fa fa-line-chart icon-space"></i>
                                    Tình trạng điểm đỗ tại thời điểm
                                </Link>
                            </li>
                            <li>
                                <Link to="/report/rate_revenue" style={this.state.active == "rate_revenue" ? activeStyle : inActiveStyle}
                                    onClick={this._handleClick.bind(this, "rate_revenue")}>
                                    <i className="fa fa-line-chart icon-space"></i>
                                    Đánh giá điểm đỗ
                                </Link>
                            </li>

                        </ul>
                    </li>

                    <li className="">
                        <a href="javascript:;" onClick={this.onLogout}>
                            <i className="fa fa-sign-out" aria-hidden="true"></i>
                            <span className="title">Đăng xuất</span>
                        </a>
                    </li>
                </ul>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return { isAuthenticated: state.auth.isAuthenticated, accessToken: state.auth.accessToken }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageSideBar);