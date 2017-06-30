import React, {Component} from 'react'
import DataGridDemo from './DataGridDemo'

import {PagingState} from '@devexpress/dx-react-grid';
import {Grid, TableView, TableHeaderRow, PagingPanel} from '@devexpress/dx-react-grid-bootstrap3';
import Loading from '../assets/js/loading'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';
import axios from 'axios';

class ListMonthlyTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            columns: [
                {
                    name: 'ID',
                    title: '#',
                    width: 40
                }, {
                    name: 'customerName',
                    title: 'Người liên hệ',
                    width: 120
                }, {
                    name: 'numberPlate',
                    title: 'Biển kiểm soát',
                    width: 120
                }, {
                    name: 'ticketType',
                    title: 'Loại hình trông giữ',
                    width: 160
                }, {
                    name: 'fromTime',
                    title: 'Ngày bắt đầu',
                    width: 120,
                    type: 'datetime'
                }, {
                    name: 'toTime',
                    title: 'Ngày kết thúc',
                    width: 120,
                    type: 'datetime'
                }, {
                    name: 'status',
                    title: 'Trạng thái',
                    width: 100
                }, {
                    name: 'detail',
                    title: " ",
                    width: 90
                }
            ],
            pageSize: 4,
            totalCount: 0,
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
    }

    loadData(currentPage) {
        const {pageSize} = this.state;
        this.setState({loading: true})
        axios
            .get("http://ngoisaoteen.net/test/list_monthly_ticket.php")
            .then((response) => {
                const data = response.data;
                this.setState({loading: false, rows: data.items, totalCount: data.totalCount})
            })
            .catch((error) => {
                console.log("error:", error)
                this.setState({loading: false})
            })

            // this.setState({loading: true}) axios
            // .get('http://ngoisaoteen.net/test/report_revenue.php')     .then((response)
            // => {         const data = response.data;         this.setState({loading:
            // false, rows: data.items, totalCount: data.totalCount})     }) .catch((error)
            // => {         this.setState({loading: false})     })
    }

    changeCurrentPage(currentPage) {
        this.loadData(currentPage)
    }

    onSubmitForm(e) {
        e.preventDefault()
        this.loadData(0)
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
                        <div className="col-md-3 form-group">
                            <label for="phoneNumber">Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone_number"
                                placeholder="123456789"/>
                        </div>

                        <div className="col-md-3 form-group">
                            <label for="numberPlate">Biển số xe</label>
                            <input
                                className="form-control"
                                name="number_plate"
                                placeholder="30A-123.45"
                                type="text"/>
                        </div>

                        <div className="col-md-3 form-group">
                            <label for="car_parking_place">Điểm đỗ</label>
                            <select className="form-control" name="car_parking_place">
                                <option value="001">001</option>
                                <option value="002">002</option>
                                <option value="003">003</option>
                                <option value="004">004</option>
                                <option value="005">005</option>
                            </select>
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
                            <div className="caption">Danh sách hợp đồng vé tháng</div>
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
                            <Grid rows={rows} columns={columns}>
                                <PagingState
                                    currentPage={currentPage}
                                    onCurrentPageChange={this.changeCurrentPage}
                                    pageSize={pageSize}
                                    totalCount={totalCount}/>

                                <TableView
                                    tableCellTemplate={({row, column, style}) => {
                                    console.log("row:", row, "column:", column);
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
                                    if (column.type == 'datetime') {}
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

export default ListMonthlyTicket