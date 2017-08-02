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
        return "-"
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

    return priceString + " đ"
}

const timeRender = (time) => {
    return moment
        .unix(time)
        .format("HH:mm");
}
const dateRender = (time) => {
    return moment
        .unix(time)
        .format("DD/MM/YYYY");
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
            total: [],
            fromTime: moment().subtract(1, 'months'),
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

        const fromTime = moment({
            year: this
                .state
                .fromTime
                .year(),
            month: this
                .state
                .fromTime
                .month(),
            day: this
                .state
                .fromTime
                .date()
        }).unix()

        const toTime = moment({
            year: this
                .state
                .toTime
                .year(),
            month: this
                .state
                .toTime
                .month(),
            day: this
                .state
                .toTime
                .date()
        }).unix() + 86340;

        var url = "/p/ticket/search?is_monthly=false&from_time=" + fromTime + "&to_time=" + toTime + "&cpp_code=" + this.refs.cpp_code.value + "&number_plate=" + this.refs.numberplate.value + "&phone=" + this.refs.phonenumber.value

        axios
            .get(url)
            .then((response) => {
                if (response.data.Error.Code == 200) {
                    const ticketList = response.data.Data

                    var totalArr = []

                    var totalRevenueDay = 0;
                    var totalDifferentTime = 0;

                    for (var i = 0; i < ticketList.length; i++) {
                        totalRevenueDay = totalRevenueDay + ticketList[i].Amount
                        totalDifferentTime = totalDifferentTime + ticketList[i].DifferentTime
                    }

                    totalArr.push({title: "Tổng", Amount: totalRevenueDay, DifferentTime: totalDifferentTime})

                    this.setState({loading: false, rows: ticketList, total: totalArr})
                } else {
                    this.setState({loading: false, rows: [], total: []})
                }
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
            total,
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
                                placeholder="30A12345"/>
                        </div>

                        <div className="col-md-2 form-group">
                            <label for="phoneNumber">Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                ref="phonenumber"
                                placeholder="0987654321"
                                name="phonenumber"/>
                        </div>

                        <div className="col-md-2 form-group">
                            <label for="company">Điểm đỗ</label>
                            <input
                                type="text"
                                placeholder="001"
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
                                        dateFormat="DD/MM/YYYY"
                                        selected={this.state.fromTime}
                                        onChange={this.handleChangeFromTime}/>
                                </div>

                                <div className="col-md-6 form-group">
                                    <label for="toTime">Đến ngày</label>
                                    <br/>
                                    <DatePicker
                                        className="form-control"
                                        dateFormat="DD/MM/YYYY"
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
                            <div className="caption">Tra cứu vé lượt</div>
                            <div className="tools">
                                <a href="#" className="collapse"></a>
                            </div>
                        </div>
                        <div
                            className="portlet-body"
                            style={{
                            position: 'relative'
                        }}>
                            <BootstrapTable
                                options={{
                                noDataText: 'Không có kết quả nào'
                            }}
                                data={this.state.rows}
                                hover={true}
                                bordered={true}>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataFormat={dateRender}
                                    dataField='FromTime'
                                    dataSort={true}
                                    width='85'
                                    dataAlign='center'>Ngày</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    dataField='CppCode'
                                    dataSort={true}
                                    width='100'
                                    isKey={true}>Điểm đỗ</TableHeaderColumn>

                                <TableHeaderColumn headerAlign='center' dataField='CppAddress'>Địa chỉ</TableHeaderColumn>

                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    width='120'
                                    dataField='PhoneNumber'>Số điện thoại</TableHeaderColumn>

                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    width='100'
                                    dataField='NumberPlate'>Biển số xe</TableHeaderColumn>
                                <TableHeaderColumn
                                    dataAlign='right'
                                    headerAlign='center'
                                    dataField='Amount'
                                    width='100'
                                    dataSort={true}
                                    dataFormat={currencyFormat}>Thanh toán</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    dataFormat={ticketDuration}
                                    dataSort={true}
                                    width='100'
                                    dataField='DifferentTime'>Thời gian</TableHeaderColumn>

                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataFormat={timeRender}
                                    dataField='FromTime'
                                    dataSort={true}
                                    width='100'
                                    dataAlign='center'>Giờ vào</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataFormat={timeRender}
                                    dataSort={true}
                                    dataField='ToTime'
                                    width='100'
                                    dataAlign='center'>Giờ ra</TableHeaderColumn>
                            </BootstrapTable>
                            <BootstrapTable
                                className="table-footer"
                                headerStyle={{
                                display: 'none'
                            }}
                                options={{
                                noDataText: '-'
                            }}
                                data={this.state.total}>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataField='title'
                                    dataSort={true}
                                    width='85'
                                    dataAlign='center'>Ngày</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    dataField='noData'
                                    dataSort={true}
                                    width='100'
                                    isKey={true}>Điểm đỗ</TableHeaderColumn>

                                <TableHeaderColumn headerAlign='center' dataField='noData'>Địa chỉ</TableHeaderColumn>

                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    width='120'
                                    dataField='noData'>Số điện thoại</TableHeaderColumn>

                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    width='100'
                                    dataField='noData'>Biển số xe</TableHeaderColumn>
                                <TableHeaderColumn
                                    dataAlign='right'
                                    headerAlign='center'
                                    dataField='Amount'
                                    width='100'
                                    dataSort={true}
                                    dataFormat={currencyFormat}>Thanh toán</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    dataFormat={ticketDuration}
                                    dataSort={true}
                                    width='100'
                                    dataField='DifferentTime'>Thời gian</TableHeaderColumn>

                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataField='noData'
                                    dataSort={true}
                                    width='100'
                                    dataAlign='center'>Giờ vào</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataSort={true}
                                    dataField='noData'
                                    width='100'
                                    dataAlign='center'>Giờ ra</TableHeaderColumn>
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