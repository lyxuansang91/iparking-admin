import React, {Component} from 'react';

export class PageContentHeader extends Component {
    render() {
        return (
            <div>
                <h3 className="page-title">
                    Dashboard
                </h3>
                <div className="page-bar">
                    <ul className="page-breadcrumb">
                        <li>
                            <i className="fa fa-home"></i>
                            <a href="#">Home</a>
                            <i className="fa fa-angle-right"></i>
                        </li>
                        <li>
                            <a href="#">Dashboard</a>
                        </li>
                    </ul>
                </div>

            </div>
        );
    }
}