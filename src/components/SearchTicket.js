import React, {Component} from 'react'
import DataGridDemo from './DataGridDemo'

import {PagingState} from '@devexpress/dx-react-grid';
import {Grid, TableView, TableHeaderRow, PagingPanel} from '@devexpress/dx-react-grid-bootstrap3';
import Loading from '../assets/js/loading'

class SearchTicket extends Component {

    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {
                    name: 'NumberPlate',
                    title: 'Xe'
                }, {
                    name: 'CarParkingPlace',
                    title: 'Điểm đỗ'
                }, {
                    name: 'FromTime',
                    title: 'Từ giờ'
                }, {
                    name: 'ToTime',
                    title: 'Đến giờ'
                }, {
                    name: 'Amount',
                    title: 'Tổng tiền'
                }, {
                    name: 'PaymentChan',
                    title: 'Phương thức thanh toán'
                }, {
                    name: 'Status',
                    title: 'Trạng thái'
                }
            ],
            rows: [],
            totalCount: 0,
            pageSize: 3,
            loading: true,
            errors: {}
        };
        this.onSubmitForm = this
            .onSubmitForm
            .bind(this)

        this.loadData = this
            .loadData
            .bind(this)

        this.changeCurrentPage = this
            .changeCurrentPage
            .bind(this)

        this.queryString = this
            .queryString
            .bind(this)
    }

    loadData(currentPage) {
        this.setState({loading: true})
        console.log("current page:", currentPage)
        var {pageSize} = this.state;
        var _rows = [
            {
                'NumberPlate': '30A-12345',
                'CarParkingPlace': '001',
                'FromTime': '10/05/2017 8:00',
                'ToTime': '10/05/2017 10:00',
                'Amount': (currentPage * pageSize + 1) * 30000.0,
                'PaymentChan': 'SMS',
                'Status': currentPage * pageSize
            }, {
                'NumberPlate': '30A-12345',
                'CarParkingPlace': '001',
                'FromTime': '10/05/2017 8:00',
                'ToTime': '10/05/2017 10:00',
                'Amount': (currentPage * pageSize + 2) * 30000.0,
                'PaymentChan': 'Nội địa',
                'Status': currentPage * pageSize + 1
            }, {
                'NumberPlate': '30A-12345',
                'CarParkingPlace': '001',
                'FromTime': '10/05/2017 8:00',
                'ToTime': '10/05/2017 10:00',
                'Amount': (currentPage * pageSize + 3) * 30000.0,
                'PaymentChan': 'Quốc tế',
                'Status': currentPage * pageSize + 2
            }
        ];

        this.setState({loading: false, rows: _rows, totalCount: 9})
    }

    changeCurrentPage(currentPage) {
        this.loadData(currentPage)
    }

    queryString(currentPage) {
        return "";
    }

    _validate() {
        var errors = {};
        //handle error in here
        return errors;
    }

    onSubmitForm(e) {
        e.preventDefault();
        console.log("e:", e)
        var errors = this._validate();
        if (Object.keys(errors).length != 0) {
            this.setState({errors: errors});
            return;
        }
        this.loadData(0)
    }

    render() {
        const {
            rows,
            columns,
            pageSize,
            currentPage,
            totalCount,
            loading
        } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <form ref='search_ticket_form' className="" onSubmit={this.onSubmitForm}>
                        <div className="col-md-3 form-group">
                            <label for="numberPlate">Biển số xe</label>
                            <input
                                type="text"
                                name="numberplate"
                                className="form-control"
                                placeholder="Biển số xe"/>
                        </div>

                        <div className="col-md-3 form-group">
                            <label for="phoneNumber">Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Số điện thoại"
                                name="phonenumber"/>
                        </div>

                        <div className="col-md-2 form-group">
                            <label for="carParkingPlace">Điểm đỗ</label>
                            <select className="form-control" name="carparkingplace">
                                <option value="1">1</option>
                                <option value="1">2</option>
                                <option value="1">3</option>
                                <option value="1">4</option>
                                <option value="1">5</option>
                            </select>
                        </div>
                        <div
                            className="col-md-4"
                            style={{
                            marginTop: '24px'
                        }}>
                            <button type="submit" className="btn btn-primary">Tra cứu</button>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <Grid rows={rows} columns={columns}>
                        <PagingState
                            currentPage={currentPage}
                            onCurrentPageChange={this.changeCurrentPage}
                            pageSize={pageSize}
                            totalCount={totalCount}/>

                        <TableView/>
                        <TableHeaderRow/>
                        <PagingPanel/>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default SearchTicket