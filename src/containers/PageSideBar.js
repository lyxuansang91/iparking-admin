import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import '../assets/css/pagesidebar.css'
class PageSideBar extends Component {
    render() {
        return (
            <div className="page-sidebar navbar-collapse collapse">
                <ul
                    className="page-sidebar-menu"
                    data-keep-expanded="false"
                    data-auto-scroll="true"
                    data-slide-speed="200">

                    <li className="">
                        <Link to="/">
                            <i className="icon-home"></i>
                            <span className="title">Trang chủ</span>
                            <span className="arrow "></span>
                        </Link>
                    </li>
                    {/*Vé lượt*/}
                    <li className="">
                        <Link to="/search/ticket">
                            <i className="fa fa-ticket"></i>
                            <span className="title">Vé lượt</span>
                            <span className="arrow "></span>
                        </Link>
                    </li>
                    {/*Vé tháng*/}
                    <li className="">
                        <a href="javascript:;">
                            <i className="fa fa-ticket"></i>
                            <span className="title">Vé tháng</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu">
                            <li>
                                <Link to="/management/monthly_ticket">
                                    <i className="fa fa-car"></i>
                                    <span className="icon-space">Đăng ký vé tháng</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/monthly_ticket/list">
                                    <i className="fa fa-search"></i>
                                    <span className="icon-space">
                                        Danh sách vé tháng
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    {/*Báo cáo*/}
                    <li>
                        <a href="javascript:;">
                            <i className="icon-graph"></i>
                            <span className="title">Báo cáo</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu">
                            <li>
                                <Link to="/report/revenue">
                                    <i className="fa fa-usd"></i>
                                    <span className="icon-space">
                                        Doanh số đơn vị khai thác
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/report/monthly_revenue">
                                    <i className="fa fa-usd"></i>
                                    <span className="icon-space">Doanh số điểm đỗ</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/report/rate_revenue">
                                    <i className="icon-tag"></i>
                                    <span className="icon-space">Đánh giá điểm đỗ</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    {/*Cấu hình*/}
                    <li className="">
                        <a href="javascript:;">
                            <i className="fa fa-list"></i>
                            <span className="title">Cấu hình</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu">
                            <li>
                                <Link to="/cpp">
                                    <i className="fa fa-car"></i>
                                    <span className="icon-space">Điểm đỗ xe</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/management/promotion">
                                    <i className="fa fa-usd"></i>
                                    <span className="icon-space">CT Khuyến mãi</span>
                                </Link>
                            </li>

                            <li>
                                <a href="#">
                                    <i className="icon-user"></i>
                                    <span className="title">Quản lý người dùng</span>
                                    <span className="arrow "></span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li className="heading">
                        <h3 className="uppercase">More</h3>
                    </li>

                    <li className="">
                        <Link to="/login">
                            <i className="fa fa-sign-out" aria-hidden="true"></i>
                            <span className="title">Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default PageSideBar