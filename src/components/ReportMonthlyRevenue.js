import React, {Component} from 'react'
import {PagingState} from '@devexpress/dx-react-grid';
import {Grid, TableView, TableHeaderRow, PagingPanel} from '@devexpress/dx-react-grid-bootstrap3';
import Loading from '../assets/js/loading'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import axios from 'axios';
import NumberFormat from 'react-number-format'
import {styles} from '../assets/css/grid.css'

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
                    title: 'Doanh số lượt',
                    align: 'right',
                    type: 'number'
                }, {
                    name: 'Rate',
                    title: 'Tỷ suất doanh số trên ô',
                    align: 'right',
                    type: 'number'
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
            .get("http://ngoisaoteen.net/test/monthly_revenue.php")
            .then((response) => {
                let data = response.data;
                let count = 0;
                data.items.forEach(function(item, index) {
                    data.items[index].id = ++count;
                });
                this.setState({loading: false, rows: data.items, totalCount: data.totalCount})
            })
            .catch((error) => {
                console.log("error:", error)
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
            <div className="container-fluid detail">
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
                            <Grid rows={rows} columns={columns} getRowId={row => row.id} style={styles}>
                                <PagingState
                                    currentPage={currentPage}
                                    onCurrentPageChange={this.changeCurrentPage}
                                    pageSize={pageSize}
                                    totalCount={totalCount}/>

                                <TableView 
                                    tableCellTemplate={({row, column, style}) => {
                                    if (column.name == 'detail') {
                                        return <td
                                            style={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            textAlign: 'left'
                                        }}>
                                            <a
                                                href="#"
                                                className="btn btn-primary"
                                                style={{
                                                textDecoration: 'none'
                                            }}>Chi tiết</a>
                                        </td>
                                    }
                                    if (column.type == 'number') {
                                        return <td
                                            style={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            textAlign: 'right'
                                        }}>
                                            <NumberFormat
                                                value={row.Amount}
                                                displayType={'text'}
                                                decimalSeparator={','}
                                                thousandSeparator={'.'}
                                                suffix={"   đ"}/>
                                        </td>;
                                    }
                                    return undefined;
                                }}/>
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

export default ReportMonthlyRevenue