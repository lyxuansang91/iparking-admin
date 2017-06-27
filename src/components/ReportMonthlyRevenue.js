import React, {Component} from 'react'
import {PagingState} from '@devexpress/dx-react-grid';
import {Grid, TableView, TableHeaderRow, PagingPanel} from '@devexpress/dx-react-grid-bootstrap3';
import Loading from '../assets/js/loading'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';

class ReportMonthlyRevenue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            columns: [
                {
                    name: 'ID',
                    title: '#'
                }, {
                    name: 'Month',
                    title: 'Tháng'
                }, {
                    name: 'Capacity',
                    title: 'Sức chứa'
                }, {
                    name: 'Amount',
                    title: 'Doanh số lượt'
                }, {
                    name: 'Rate',
                    title: 'Tỷ suất doanh số trên ô'
                }
            ],
            pageSize: 10,
            totalCount: 0,
            loading: true,
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

    loadData(currentPage) {
        const {pageSize} = this.state;
        this.setState({loading: true})

        var data = {
            totalCount: 20,
            items: [
                {
                    ID: (currentPage * pageSize + 1),
                    Month: '01/2017',
                    Capacity: 28,
                    Amount: 25000000,
                    Rate: 200
                }, {
                    ID: (currentPage * pageSize + 2),
                    Month: '01/2017',
                    Capacity: 28,
                    Amount: 25000000,
                    Rate: 200
                }, {
                    ID: (currentPage * pageSize + 3),
                    Month: '01/2017',
                    Capacity: 28,
                    Amount: 25000000,
                    Rate: 200
                }, {
                    ID: (currentPage * pageSize + 4),
                    Month: '01/2017',
                    Capacity: 28,
                    Amount: 25000000,
                    Rate: 200
                }, {
                    ID: (currentPage * pageSize + 5),
                    Month: '01/2017',
                    Capacity: 28,
                    Amount: 25000000,
                    Rate: 200
                }, {
                    ID: (currentPage * pageSize + 6),
                    Month: '01/2017',
                    Capacity: 28,
                    Amount: 25000000,
                    Rate: 200
                }, {
                    ID: (currentPage * pageSize + 7),
                    Month: '01/2017',
                    Capacity: 28,
                    Amount: 25000000,
                    Rate: 200
                }, {
                    ID: (currentPage * pageSize + 8),
                    Month: '01/2017',
                    Capacity: 28,
                    Amount: 25000000,
                    Rate: 200
                }, {
                    ID: (currentPage * pageSize + 9),
                    Month: '01/2017',
                    Capacity: 28,
                    Amount: 25000000,
                    Rate: 200
                }, {
                    ID: (currentPage * pageSize + 10),
                    Month: '01/2017',
                    Capacity: 28,
                    Amount: 25000000,
                    Rate: 200
                }
            ]
        };
        this.setState({loading: false, rows: data.items, totalCount: data.totalCount})
    }

    changeCurrentPage(currentPage) {
        this.loadData(currentPage)
    }

    onSubmitForm(e) {
        e.preventDefault()
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
                    <form
                        ref='report_monthly_revenue_form'
                        className=""
                        onSubmit={this.onSubmitForm}>
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
                            <DatePicker
                                className="form-control"
                                name="from_time"
                                selected={this.state.fromTime}
                                onChange={this.handleChangeFromTime}/>
                        </div>

                        <div className="col-md-3 form-group">
                            <label for="toTime">Đến ngày</label>
                            <DatePicker
                                className="form-control"
                                name="to_time"
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
                        <div className="col-md-4 form-group">
                            <span for="company">Mã điểm đỗ</span>
                            <input type="text" name="car_parking_place" className="form-control"/>
                            <span>(Có thể để trống)</span>
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
        );
    }
}

export default ReportMonthlyRevenue