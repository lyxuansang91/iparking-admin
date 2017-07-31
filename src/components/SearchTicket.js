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

const statusRender = (status) => {
    if (status === 0) {
        return "Hết hiệu lực"
    } else if (status === 1) {
        return "Còn hiệu lực"
    }
}

const timeRender = (time) => {
    return moment
        .unix(time)
        .format("hh:mm - DD/MM/YYYY");
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
        var url = "http://admapi.upark.vn/p/ticket/search?is_monthly=false&from_time=" + moment(this.state.fromTime).unix() + "&to_time=" + moment(this.state.toTime).unix() + "&cpp_code=" + this.refs.cpp_code.value + "&number_plate=" + this.refs.numberplate.value + "&phone=" + this.refs.phonenumber.value
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
                            <label for="carParkingPlace">Điểm đỗ</label>
                            <select className="form-control" name="carparkingplace" ref="cpp_code">
                                <option value="">Chọn điểm đỗ</option>
                                <option value="001">001</option>
                                <option value="002">002</option>
                                <option value="003">003</option>
                                <option value="004">004</option>
                                <option value="005">005</option>
                            </select>
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
                                <TableHeaderColumn dataField='CppCode' width={100} isKey={true}>Mã điểm đỗ</TableHeaderColumn>
                                <TableHeaderColumn dataField='NumberPlate'>Biển số xe</TableHeaderColumn>
                                <TableHeaderColumn
                                    dataSort={true}
                                    dataField='Amount'
                                    dataFormat={currencyFormat}>Tổng tiền (đ)</TableHeaderColumn>
                                <TableHeaderColumn dataField='PaymentMethod'>Phương thức thanh toán
                                </TableHeaderColumn>
                                <TableHeaderColumn dataFormat={statusRender} dataField='Status'>Trạng thái</TableHeaderColumn>
                                <TableHeaderColumn dataSort={true} dataFormat={timeRender} dataField='FromTime'>Từ</TableHeaderColumn>
                                <TableHeaderColumn dataSort={true} dataFormat={timeRender} dataField='ToTime'>Đến</TableHeaderColumn>
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