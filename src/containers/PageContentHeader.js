import React, {Component} from 'react';

class PageContentHeader extends Component {
    render() {
        return (
            <div>
                <h3 className="page-title">
                    {this.props.content_title}
                </h3>
                <div className="page-bar">
                    <ul className="page-breadcrumb">
                        <li>
                            <i className="fa fa-home"></i>
                            <a href="#">Home</a>
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