import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import Loading from '../assets/js/loading'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import axios from 'axios';

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

class ReportRevenue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            pageSize: 20,
            totalCount: 0,
            loading: false,
            fromTime: moment()
                .subtract(1, 'months')
                .subtract(1, 'days'),
            toTime: moment().subtract(1, 'days')
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
        this.setState({loading: true})

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

        var url = "/p/report/revenue_by_date?from_time=" + fromTime + "&to_time=" + toTime

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
                        <div className="col-md-3 form-group">
                            <label for="company">Công ty</label>
                            <option value="2">Công ty TNHH MTV Khai Thác Điểm Đỗ Xe Hà Nội</option>
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
                    </form>
                </div>
                <div className="row">
                    <div className="portlet box blue">
                        <div className="portlet-title">
                            <div className="caption">Doanh số vé lượt</div>
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
                                bordered={true}>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    width='100'
                                    dataField='CppCode'
                                    dataAlign='center'
                                    dataSort={true}
                                    isKey={true}>Điểm đỗ</TableHeaderColumn>
                                <TableHeaderColumn headerAlign='center' dataField='CppAddress'>Địa chỉ</TableHeaderColumn>

                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='right'
                                    width='100'
                                    dataAlign='center'
                                    dataSort={true}
                                    dataField='Capicity'>Sức chứa</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    width='200'
                                    dataAlign='right'
                                    dataFormat={currencyFormat}
                                    dataSort={true}
                                    dataField='RevenueByDay'>Doanh số lượt</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    width='200'
                                    dataSort={true}
                                    dataAlign='right'
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

export default ReportRevenue