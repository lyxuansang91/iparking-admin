import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import Loading from '../assets/js/loading'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import axios from 'axios'

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

const ratioFormat = (rate) => {
    if (rate === 0) {
        return "-"
    }

    return rate + " %"

    // if (rate === 0) {     return "0%" } if (rate < 0) {     return "<i
    // style='color:red' class='fa fa-arrow-down' aria-hidden='true'></i> " +
    // Math.abs(rate) * 100 + "%" } return "<i style='color:blue' class='fa
    // fa-arrow-up' aria-hidden='true'></i> " + Math.abs(rate) * 100 + "%"
}

class ReportRateRevenue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            totalCount: 0,
            loading: false,
            fromTime: moment().subtract(1, 'months'),
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

        var url = "/p/report/rate_revenue?from_time=" + fromTime + "&to_time=" + toTime
        axios
            .get(url)
            .then((response) => {
                if (response.data.Error.Code == 200) {
                    const revenueArr = response.data.Data
                    this.setState({loading: false, rows: revenueArr})
                } else {
                    this.setState({loading: false, rows: []})
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

    render() {

        const {rows, currentPage, totalCount, loading} = this.state;
        return (
            <div className="container-fluid">

                <form
                    ref='report_monthly_revenue_form'
                    className=""
                    onSubmit={this.onSubmitForm}>
                    <div className="row">
                        <div className="col-md-3 form-group">
                            <label for="company">Công ty</label>
                            <select className="form-control" name="company">
                                <option value="1">Tất cả</option>
                                <option value="2">HPC</option>
                                <option value="3">Đồng Xuân</option>
                            </select>
                        </div>

                        <div className="col-md-3 form-group">
                            <label for="fromTime">Từ ngày</label>
                            <br/>
                            <DatePicker
                                className="form-control"
                                name="from_time"
                                dateFormat="DD/MM/YYYY"
                                selected={this.state.fromTime}
                                onChange={this.handleChangeFromTime}/>
                        </div>

                        <div className="col-md-3 form-group">
                            <label for="toTime">Đến ngày</label>
                            <br/>
                            <DatePicker
                                className="form-control"
                                name="to_time"
                                dateFormat="DD/MM/YYYY"
                                selected={this.state.toTime}
                                onChange={this.handleChangeToTime}/>
                        </div>
                        <div
                            className="col-md-3"
                            style={{
                            marginTop: '24px'
                        }}>
                            <button type="submit" className="btn btn-primary">Tra cứu</button>
                        </div>

                    </div>

                </form>

                <div className="row">
                    <div className="portlet box blue">
                        <div className="portlet-title">
                            <div className="caption">Tổng hợp doanh số</div>
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
                                bordered={true}data={this.state.rows} >
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    width='100'
                                    dataSort={true}
                                    dataField='CPPCode'
                                    isKey={true}>Điểm đỗ</TableHeaderColumn>
                                <TableHeaderColumn headerAlign='center' dataField='CppAddress'>Địa chỉ</TableHeaderColumn>

                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='right'
                                    dataSort={true}
                                    dataFormat={currencyFormat}
                                    width='100'
                                    dataField='RevenueByDay'>Vé lượt</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='right'
                                    dataSort={true}
                                    width='120'
                                    dataFormat={ratioFormat}
                                    dataField='RatioDay'>Tăng trưởng</TableHeaderColumn>

                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='right'
                                    dataSort={true}
                                    dataFormat={currencyFormat}
                                    width='120'
                                    dataField='RevenueByMonth'>Vé tháng</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='right'
                                    dataSort={true}
                                    width='120'
                                    dataFormat={ratioFormat}
                                    dataField='RatioMonth'>Tăng trưởng</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    dataSort={true}
                                    width='100'
                                    dataField='Capacity'>Sức chứa</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='right'
                                    width='150'
                                    dataSort={true}
                                    dataFormat={currencyFormat}
                                    dataField='RevenuePerUnit'>Doanh số trên ô</TableHeaderColumn>

                            </BootstrapTable>
                            {loading && <Loading/>}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default ReportRateRevenue