import React, {Component} from 'react'
import Loading from '../assets/js/loading'
import DatePicker from 'react-datepicker'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import axios from 'axios';
import NumberFormat from 'react-number-format'
import {styles} from '../assets/css/grid.css'

const currencyFormat = (uv) => {

    if (Math.floor(uv) === 0) {
        return "0"
    }

    var price = Math.floor(uv)
    var priceString = ''
    var count = 0

    while (price > 0) {
        var number = price % 10;
        price = Math.floor(price / 10);
        count = count + 1

        priceString = number + priceString;

        if (count === 3 && price > 0) {
            priceString = "." + priceString;
            count = 0;
        }

    }

    return priceString
}

class ReportMonthlyRevenue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            totalCount: 0,
            loading: false,
            fromTime: moment(),
            toTime: moment()
        };

        this.loadData = this
            .loadData
            .bind(this)
        this.onSubmitForm = this
            .onSubmitForm
            .bind(this);

        this.changeCurrentPage = this
            .changeCurrentPage
            .bind(this)
        this.handleChangeFromTime = this
            .handleChangeFromTime
            .bind(this);
        this.handleChangeToTime = this
            .handleChangeToTime
            .bind(this);
    }

    loadData(currentPage) {}

    changeCurrentPage(currentPage) {
        this.loadData(currentPage)
    }

    onSubmitForm(e) {
        e.preventDefault()
        var url = "/p/report/revenue_by_month?from_time=" + moment(this.state.fromTime).unix() + "&to_time=" + moment(this.state.toTime).unix() + "&cpp_code=" + this.refs.cpp_code.value

        axios
            .get(url)
            .then((response) => {
                const revenueArr = response.data.Data
                this.setState({loading: false, rows: revenueArr})
            })
            .catch((error) => {
                this.setState({loading: false})
            });
        this.loadData(0)
    }

    handleChangeFromTime(date) {
        this.setState({fromTime: date});
    }

    handleChangeToTime(date) {
        this.setState({toTime: date});
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
            <div className="container-fluid detail">
                <div className="row">
                    <form
                        ref='report_monthly_revenue_form'
                        className="form-filter"
                        onSubmit={this.onSubmitForm}>
                        <div className="col-md-5">
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <label for="company">Công ty</label>
                                    <select className="form-control" name="company">
                                        <option value="1">Tất cả</option>
                                        <option value="2">Công Ty TNHH MTV Hà Nội</option>
                                        <option value="3">Đồng Xuân</option>
                                    </select>
                                </div>
                                <div className="col-md-6 form-group">
                                    <label for="company">Mã điểm đỗ</label>
                                    <input
                                        type="text"
                                        name="car_parking_place"
                                        ref="cpp_code"
                                        className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <label for="fromTime">Từ ngày</label>
                                    <DatePicker
                                        className="form-control"
                                        name="from_time"
                                        selected={this.state.fromTime}
                                        onChange={this.handleChangeFromTime}/>
                                </div>

                                <div className="col-md-6 form-group">
                                    <label for="toTime">Đến ngày</label>
                                    <DatePicker
                                        className="form-control"
                                        name="to_time"
                                        selected={this.state.toTime}
                                        onChange={this.handleChangeToTime}/>
                                </div>
                            </div>
                        </div>

                        <div
                            className="col-md-2"
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
                            <div className="caption">Doanh số điểm đỗ</div>
                            <div className="tools">
                                <a href="#" className="collapse"></a>
                            </div>
                        </div>
                        <div
                            className="portlet-body"
                            style={{
                            position: 'relative'
                        }}>
                            <BootstrapTable data={this.state.rows} bordered={true}>
                                <TableHeaderColumn dataField='CPPCode' isKey={true}>Mã điểm đỗ</TableHeaderColumn>
                                <TableHeaderColumn dataSort={true} dataField='Month'>Tháng</TableHeaderColumn>
                                <TableHeaderColumn dataSort={true} dataField='Capacity'>Sức chứa</TableHeaderColumn>
                                <TableHeaderColumn
                                    dataSort={true}
                                    dataField='RevenueByMonth'
                                    dataFormat={currencyFormat}>Doanh số tháng (đ)</TableHeaderColumn>
                                <TableHeaderColumn
                                    dataSort={true}
                                    dataFormat={currencyFormat}
                                    dataField='RevenueByDay'>Doanh số lượt (đ)</TableHeaderColumn>
                                <TableHeaderColumn
                                    dataSort={true}
                                    dataFormat={currencyFormat}
                                    dataField='RevenuePerUnit'>Doanh số trên ô (đ)</TableHeaderColumn>
                            </BootstrapTable>
                            {loading && <Loading/>}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default ReportMonthlyRevenue