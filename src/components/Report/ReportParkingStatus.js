import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import Loading from '../../assets/js/loading'
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

class ReportParkingStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            listCompany: [],
            total: [],
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

    loadData(currentPage) {
        var url = "report/provider/list"

        axios
            .get(url)
            .then((response) => {
                if (response.data.Error.Code == 200) {
                    const provderList = response.data.Data
                    this.setState({ listCompany: provderList })
                } else {
                    this.setState({ listCompany: [] })
                }
            })
            .catch((error) => {
                this.setState({ loading: false })
            });
    }

    componentDidMount() {
        this.loadData(0)
    }

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

        var url = "/report/rate_revenue?from_time=" + fromTime + "&to_time=" + toTime
        axios
            .get(url)
            .then((response) => {
                if (response.data.Error.Code == 200) {
                    const revenueArr = response.data.Data

                    var totalArr = []

                    var totalRevenueDay = 0;
                    var totalRevenueMonth = 0;
                    var totalCapacity = 0;

                    for (var i = 0; i < revenueArr.length; i++) {
                        totalRevenueDay = totalRevenueDay + revenueArr[i].RevenueByDay
                        totalRevenueMonth = totalRevenueMonth + revenueArr[i].RevenueByMonth
                        totalCapacity = totalCapacity + revenueArr[i].Capacity
                    }

                    totalArr.push({
                        title: "Tổng",
                        RevenueDay: totalRevenueDay,
                        RevenueMonth: totalRevenueMonth,
                        Capacity: totalCapacity,
                        RevenuePerUnit: (totalRevenueDay + totalRevenueMonth) / totalCapacity
                    })

                    console.log(totalRevenueDay)

                    this.setState({ loading: false, rows: revenueArr, total: totalArr })
                } else {
                    this.setState({ loading: false, rows: [], total: [] })
                }

            })
            .catch((error) => {
                this.setState({ loading: false })
            });
        this.loadData(0)
    }

    handleChangeFromTime(date) {
        this.setState({ fromTime: date });
    }

    handleChangeToTime(date) {
        this.setState({ toTime: date });
    }

    render() {

        const {
            rows,
            currentPage,
            total,
            totalCount,
            listCompany,
            loading
        } = this.state;
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
                                {listCompany
                                    .map(function (company) {
                                        return <option key={company.Id} value={company.Id}>{company.Fullname.String}</option>;
                                    })
                                }
                            </select>
                        </div>

                        <div className="col-md-3 form-group">
                            <label for="company">Điểm đỗ</label>
                            <input
                                type="text"
                                placeholder="001"
                                name="car_parking_place"
                                ref="cpp_code"
                                className="form-control" />
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
                            <div className="caption">Tình trạng điểm đỗ tại thời điểm</div>
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
                                bordered={true}
                                data={this.state.rows}>
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
                                    dataField='Company'>Công ty</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='right'
                                    dataSort={true}
                                    width='120'
                                    dataField='freeslot'>Số chỗ trống</TableHeaderColumn>

                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='right'
                                    dataSort={true}
                                    dataFormat={currencyFormat}
                                    width='120'
                                    dataField='Capacity'>Sức chứa</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='right'
                                    dataSort={true}
                                    width='120'
                                    dataFormat={ratioFormat}
                                    dataField='RatioMonth'>Mật độ</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='right'
                                    width='150'
                                    dataField='RevenuePerUnit'>Xe quá giờ</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='right'
                                    dataSort={true}
                                    width='220'
                                    dataFormat={ratioFormat}
                                    dataField='unpaid'>Xe không thanh toán</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='right'
                                    dataSort={true}
                                    width='120'
                                    dataFormat={ratioFormat}
                                    dataField='rate'>Tỉ lệ vi phạm</TableHeaderColumn>
                            </BootstrapTable>
                            {loading && <Loading />}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default ReportParkingStatus