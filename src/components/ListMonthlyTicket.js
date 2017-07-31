import React, {Component} from 'react'
import Loading from '../assets/js/loading'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

const currencyFormat = (uv) => {

    if (Math.floor(uv) === 0) {
        return "0 đ"
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
        .format("DD/MM/YYYY");
}

const monthRender = (time) => {
    return time + " tháng"
}

const calculateMinute = (time) => {

    var now = moment({
        year: moment().year(),
        month: moment().month(),
        day: moment().date()
    }).unix()

    if (time - now > 0) {
        return "-"
    }

    var overdueDay = (now - time) / 86400

    return Math.round(overdueDay) + " ngày"

}

class ListMonthlyTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            fromTime: moment(),
            toTime: moment(),
            loading: false
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
        this.exportToCSV = this
            .exportToCSV
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

        var url = "/p/ticket/search?is_monthly=true&from_time=" + fromTime + "&to_time=" + toTime + "&cpp_code=" + this.refs.cpp_code.value + "&number_plate=" + this.refs.numberplate.value + "&phone=" + this.refs.phonenumber.value
        axios
            .get(url)
            .then((response) => {
                if (response.data.Error.Code == 200) {
                    const ticketList = response.data.Data
                    this.setState({loading: false, rows: ticketList})
                } else {
                    this.setState({loading: false})
                }
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

    exportToCSV() {
        axios
            .get("http://ngoisaoteen.net/test/monthly_revenue.php")
            .then((response) => {
                const items = response.data.items;

            })
            .catch((error) => {
                console.log("error:", error)
            })
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
                    <form ref='report_revenue_form' className="" onSubmit={this.onSubmitForm}>
                        <div className="col-md-2 form-group">
                            <label for="numberPlate">Biển số xe</label>
                            <input
                                type="text"
                                name="numberplate"
                                className="form-control"
                                ref="numberplate"
                                placeholder="Biển số xe"/>
                        </div>

                        <div className="col-md-2 form-group">
                            <label for="phoneNumber">Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Số điện thoại"
                                ref="phonenumber"
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
                            <div className="caption">Tra cứu hợp đồng vé tháng</div>
                            <div className="tools">
                                <a href="#" className="collapse"></a>
                            </div>
                            <div className="actions">
                                <button className="btn btn-default btn-sm" onClick={this.exportToCSV}>
                                    <i className="fa fa-pencil"></i>
                                    Export to CSV
                                </button>
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
                                    width="100"
                                    isKey={true}>Mã điểm đỗ</TableHeaderColumn>
                                <TableHeaderColumn headerAlign='center' dataField='CppAddress'>Địa chỉ</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    width="100"
                                    dataField='NumberPlate'>Biển số xe</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    width="85"
                                    dataFormat={timeRender}
                                    dataField='FromTime'>Đăng ký</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    dataFormat={timeRender}
                                    width="85"
                                    dataField='EndTime'>Hết hạn</TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField='MonthlyPrice'
                                    headerAlign='center'
                                    dataAlign='right'
                                    width="100"
                                    dataFormat={currencyFormat}>Đơn giá</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    width='80'
                                    dataFormat={monthRender}
                                    dataField='MonthQty'>Số tháng</TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField='Amount'
                                    headerAlign='center'
                                    dataAlign='right'
                                    width="100"
                                    dataFormat={currencyFormat}>Giá trị HĐ</TableHeaderColumn>

                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    dataFormat={timeRender}
                                    width='125'
                                    dataField='ToTime'>Hạn thanh toán</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    width='80'
                                    dataFormat={calculateMinute}
                                    dataField='ToTime'>Quá hạn</TableHeaderColumn>

                            </BootstrapTable>
                            {loading && <Loading/>}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default ListMonthlyTicket