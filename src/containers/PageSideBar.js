import React, {Component} from 'react';
import {Link} from 'react-router-dom'
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

                    <li className="">
                        <Link to="/cpp">
                            <i className="fa fa-car"></i>
                            <span className="title">Điểm đỗ xe</span>
                            <span className="arrow "></span>
                        </Link>
                    </li>

                    <li className="">
                        <a href="javascript:;">
                            <i className="fa fa-search"></i>
                            <span className="title">Tra cứu</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu">
                            <li>
                                <a href="#">
                                    <i className="fa fa-car"></i>
                                    Tra cứu phiếu gửi xe</a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-search"></i>
                                    Tra cứu giao dịch</a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-road"></i>
                                    Tra cứu bãi đỗ xe</a>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="javascript:;">
                            <i className="icon-graph"></i>
                            <span className="title">Báo cáo</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu">
                            <li>
                                <a href="#">
                                    <i className="fa fa-usd"></i>
                                    Doanh số
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-usd"></i>
                                    Đánh giá doanh số theo tháng
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="icon-tag"></i>
                                    Danh sách các điểm đỗ khai thác không hiệu quả</a>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="javascript:;">
                            <i className="icon-graph"></i>
                            <span className="title">Quản lý vé tháng</span>
                            <span className="arrow "></span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <i className="fa fa-usd"></i>
                            <span className="title">CT khuyến mãi</span>
                            <span className="arrow "></span>
                        </a>
                    </li>

                    <li>
                        <a href="javascript:;">
                            <i className="icon-user"></i>
                            <span className="title">Quản lý người dùng</span>
                            <span className="arrow "></span>
                        </a>
                    </li>

                    <li>
                        <a href="javascript:;">
                            <i className="icon-graph"></i>
                            <span className="title">Biểu đồ</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu">
                            <li>
                                <a href="#">
                                    Doanh số
                                    <span className="arrow "></span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    Hiệu quả khai thác</a>
                            </li>
                            <li>
                                <a href="#">
                                    Cổng thanh toán</a>
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