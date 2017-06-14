import React, {Component} from 'react';

export class PageSideBar extends Component {
    render() {
        return (
            <div className="page-sidebar navbar-collapse collapse">
                <ul
                    className="page-sidebar-menu"
                    data-keep-expanded="false"
                    data-auto-scroll="true"
                    data-slide-speed="200">
                    <li className="sidebar-toggler-wrapper">
                        {/* BEGIN SIDEBAR TOGGLER BUTTON */}
                        <div className="sidebar-toggler"></div>
                        {/*END SIDEBAR TOGGLER BUTTON */}
                    </li>

                    <li className="sidebar-search-wrapper">
                        <form className="sidebar-search" action="#" method="POST">
                            <a href="javascript:;" className="remove">
                                <i className="icon-close"></i>
                            </a>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search..."/>
                                <span className="input-group-btn">
                                    <a href="javascript:;" className="btn submit">
                                        <i className="icon-magnifier"></i>
                                    </a>
                                </span>
                            </div>
                        </form>
                    </li>

                    <li className="active">
                        <a href="javascript:;">
                            <i className="icon-home"></i>
                            <span className="title">Trang chủ</span>
                        </a>
                    </li>

                    <li className="">
                        <a href="javascript:;">
                            <i className="icon-home"></i>
                            <span className="title">Điểm đỗ xe</span>
                        </a>
                    </li>

                    <li className="start open">
                        <a href="javascript:;">
                            <i className="icon-home"></i>
                            <span className="title">Tra cứu</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="active">
                                <a href="#">
                                    <i className="icon-bar-chart"></i>
                                    Tra cứu biển số xe</a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="icon-bulb"></i>
                                    Tra cứu giao dịch</a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="icon-graph"></i>
                                    Tra cứu bãi đỗ xe</a>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="javascript:;">
                            <i className="icon-basket"></i>
                            <span className="title">Báo cáo</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu">
                            <li>
                                <a href="#">
                                    <i className="icon-home"></i>
                                    Doanh số
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="icon-basket"></i>
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
                            <i className="icon-rocket"></i>
                            <span className="title">Biểu đồ</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu">
                            <li>
                                <a href="#">
                                    Doanh số
                                    <span className="arrow "></span>
                                </a>
                                <ul className="sub-menu">
                                    <li>
                                        <a href="#">#1</a>
                                    </li>
                                    <li>
                                        <a href="#">#2</a>
                                    </li>
                                    <li>
                                        <a href="#">#3</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">
                                    Hiệu quả khai thác</a>
                            </li>
                            <li>
                                <a href="#">
                                    Cổng thanh toán</a>
                            </li>
                            {/*<li>
                                <a href="#">
                                    Horizontal Mega Menu 2</a>
                            </li>
                            <li>
                                <a href="#">
                                    <span className="badge badge-roundless badge-danger">new</span>Layout with Fontawesome Icons</a>
                            </li>
                            <li>
                                <a href="#">
                                    Layout with Glyphicon</a>
                            </li>
                            <li>
                                <a href="#">
                                    <span className="badge badge-roundless badge-success">new</span>Full Height Portlet</a>
                            </li>
                            <li>
                                <a href="#">
                                    <span className="badge badge-roundless badge-warning">new</span>Full Height Content</a>
                            </li>
                            <li>
                                <a href="#">
                                    Search Box On Header 1</a>
                            </li>
                            <li>
                                <a href="#">
                                    Search Box On Header 2</a>
                            </li>
                            <li>
                                <a href="#">
                                    Sidebar Search Option 1</a>
                            </li>
                            <li>
                                <a href="#">
                                    Sidebar Search Option 2</a>
                            </li>
                            <li>
                                <a href="#">
                                    <span className="badge badge-roundless badge-warning">new</span>Right Sidebar Page</a>
                            </li>
                            <li>
                                <a href="#">
                                    Sidebar Fixed Page</a>
                            </li>
                            <li>
                                <a href="#">
                                    Sidebar Closed Page</a>
                            </li>
                            <li>
                                <a href="#">
                                    Content Loading via Ajax</a>
                            </li>
                            <li>
                                <a href="#">
                                    Disabled Menu Links</a>
                            </li>
                            <li>
                                <a href="#">
                                    Blank Page</a>
                            </li>
                            <li>
                                <a href="#">
                                    Boxed Page</a>
                            </li>
                            <li>
                                <a href="#">
                                    Language Switch Bar</a>
                            </li> */}
                        </ul>
                    </li>

                    <li className="heading">
                        <h3 className="uppercase">More</h3>
                    </li>

                    <li className="">
                        <a href="javascript:;">
                            <i className="icon-plus"></i>
                            <span className="title">Create</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu">
                            <li>
                                <a href="#">Task</a>
                            </li>
                            <li>
                                <a href="#">Email</a>
                            </li>
                            <li>
                                <a href="#">Contact</a>
                            </li>
                            <li>
                                <a href="#">Lead</a>
                            </li>
                        </ul>

                    </li>
                </ul>
            </div>
        );
    }
}

export default PageSideBar