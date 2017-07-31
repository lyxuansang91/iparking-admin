import React, {Component} from 'react';

class PageContentHeader extends Component {
    render() {
        return (
            <div>

                <div className="page-bar">
                    <ul className="page-breadcrumb">
                        <li>
                            <i className="fa fa-home"></i>
                            <a href="#">Trang chủ</a>
                            <i className="fa fa-angle-right"></i>
                        </li>
                        <li>
                            <a href="#">{this.props.content_title}</a>
                        </li>
                    </ul>
                </div>

            </div>
        );
    }
}

export default PageContentHeader