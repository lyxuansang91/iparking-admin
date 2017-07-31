import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import Loading from '../assets/js/loading'
import axios from 'axios'
import moment from 'moment';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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

const timeRender = (time) => {
    return moment
        .unix(time)
        .format("hh:mm - DD/MM/YYYY");
}

const ticketDuration = (second) => {

    if (second === 0) {
        return "-"
    }

    var minute = second / 60

    var hour = minute / 60;
    var minute = minute - (hour * 60);

    if (hour === 0) {
        return minute + " phút"
    }

    if (minute === 0) {
        return hour + " giờ"
    }

    return hour + " giờ " + minute + " phút"
}

class SearchTicket extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rows: [],
            fromTime: moment(),
            toTime: moment(),
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

    handleChangeFromTime(date) {
        this.setState({fromTime: date});
    }

    handleChangeToTime(date) {
        this.setState({toTime: date});
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
        e.preventDefault()
        var url = "/p/ticket/search?is_monthly=false&from_time=" + moment(this.state.fromTime).unix() + "&to_time=" + moment(this.state.toTime).unix() + "&cpp_code=" + this.refs.cpp_code.value + "&number_plate=" + this.refs.numberplate.value + "&phone=" + this.refs.phonenumber.value

        axios
            .get(url)
            .then((response) => {
                const ticketList = response.data.Data
                this.setState({loading: false, rows: ticketList})
            })
            .catch((error) => {
                this.setState({loading: false})
            });
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
                        <div className="col-md-2 form-group">
                            <label for="numberPlate">Biển số xe</label>
                            <input
                                type="text"
                                ref="numberplate"
                                name="numberplate"
                                className="form-control"
                                placeholder="Biển số xe"/>
                        </div>

                        <div className="col-md-2 form-group">
                            <label for="phoneNumber">Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                ref="phonenumber"
                                placeholder="Số điện thoại"
                                name="phonenumber"/>
                        </div>

                        <div className="col-md-2 form-group">
                            <label for="company">Mã điểm đỗ</label>
                            <input
                                type="text"
                                name="car_parking_place"
                                ref="cpp_code"
                                className="form-control"/>
                        </div>

                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <label for="fromTime">Từ ngày</label>
                                    <br/>
                                    <DatePicker
                                        className="form-control"
                                        name="from_time"
                                        selected={this.state.fromTime}
                                        onChange={this.handleChangeFromTime}/>
                                </div>

                                <div className="col-md-6 form-group">
                                    <label for="toTime">Đến ngày</label>
                                    <br/>
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
                            <BootstrapTable data={this.state.rows} hover={true} bordered={true}>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    dataField='CppCode'
                                    width={100}
                                    isKey={true}>Mã điểm đỗ</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    dataField='PhoneNumber'>Số điện thoại</TableHeaderColumn>

                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    dataField='NumberPlate'>Biển số xe</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    dataFormat={ticketDuration}
                                    width={100}
                                    dataField='DifferentTime'>Thời gian</TableHeaderColumn>

                                <TableHeaderColumn
                                    dataSort={true}
                                    dataAlign='right'
                                    headerAlign='center'
                                    dataField='Amount'
                                    dataFormat={currencyFormat}>Số tiền (đ)</TableHeaderColumn>

                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataSort={true}
                                    dataFormat={timeRender}
                                    dataField='FromTime'
                                    dataAlign='center'>Từ</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataSort={true}
                                    dataFormat={timeRender}
                                    dataField='ToTime'
                                    dataAlign='center'>Đến</TableHeaderColumn>
                            </BootstrapTable>
                            {loading && <Loading/>}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default SearchTicket