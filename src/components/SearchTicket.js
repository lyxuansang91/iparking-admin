import React, {Component} from 'react'
import DataGridDemo from './DataGridDemo'

import {PagingState} from '@devexpress/dx-react-grid';
import {Grid, TableView, TableHeaderRow, PagingPanel} from '@devexpress/dx-react-grid-bootstrap3';
import Loading from '../assets/js/loading'
import axios from 'axios'

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
                    title: 'PT thanh toán'
                }, {
                    name: 'Status',
                    title: 'Trạng thái'
                }
            ],
            rows: [],
            totalCount: 0,
            pageSize: 10,
            loading: false,
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
        var {pageSize} = this.state;

        axios
            .get("http://ngoisaoteen.net/test/search_ticket.php")
            .then((response) => {
                const data = response.data;
                this.setState({loading: false, rows: data.items, totalCount: data.totalCount})

            })
            .catch((error) => {
                console.log("error:", error)
                this.setState({loading: false})
            })
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
                                <option value="1">001</option>
                                <option value="2">002</option>
                                <option value="3">003</option>
                                <option value="4">004</option>
                                <option value="5">005</option>
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
                    <div className="portlet box blue">
                        <div className="portlet-title">
                            <div className="caption">Tra cứu giao dịch</div>
                            <div className="tools">
                                <a href="#" className="collapse"></a>
                            </div>
                        </div>
                        <div
                            className="portlet-body"
                            style={{
                            position: 'relative'
                        }}>
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
                            {loading && <Loading/>}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default SearchTicket