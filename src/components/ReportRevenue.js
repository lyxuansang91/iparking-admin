import React, {Component} from 'react'
import DataGridDemo from './DataGridDemo'

import {PagingState} from '@devexpress/dx-react-grid';
import {Grid, TableView, TableHeaderRow, PagingPanel} from '@devexpress/dx-react-grid-bootstrap3';
import Loading from '../assets/js/loading'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import axios from 'axios';

class ReportRevenue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            columns: [
                {
                    name: 'ID',
                    title: '#'
                }, {
                    name: 'CarParkingPlace',
                    title: 'Mã điểm đỗ'
                }, {
                    name: 'Capacity',
                    title: 'Sức chứa'
                }, {
                    name: 'TurnNumber',
                    title: 'Số lượt'
                }, {
                    name: 'Amount',
                    title: 'Doanh số lượt'
                }, {
                    name: 'Rate',
                    title: 'Tỷ suất doanh số trên ô'
                }
            ],
            pageSize: 20,
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

    loadData(currentPage) {
        const {pageSize} = this.state;
        this.setState({loading: true})

        axios
            .get('http://ngoisaoteen.net/test/report_revenue.php')
            .then((response) => {
                const data = response.data;
                this.setState({loading: false, rows: data.items, totalCount: data.totalCount})
            })
            .catch((error) => {
                this.setState({loading: false})
            })
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
                    <form ref='report_revenue_form' className="" onSubmit={this.onSubmitForm}>
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
                    </form>
                </div>
                <div className="row">
                    <div className="portlet box blue">
                        <div className="portlet-title">
                            <div className="caption">Doanh số đơn vị khai thác</div>
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
        );
    }
}

export default ReportRevenue