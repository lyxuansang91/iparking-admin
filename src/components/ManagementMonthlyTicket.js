import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';

class ManagementMonthlyTicket extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fromTime: moment(),
            toTime: moment(),
            loading: true
        };
        this.handleChangeFromTime = this
            .handleChangeFromTime
            .bind(this)
        this.handleChangeToTime = this
            .handleChangeToTime
            .bind(this)
        this.onSubmitForm = this
            .onSubmitForm
            .bind(this)
        this.onPriceChange = this
            .onPriceChange
            .bind(this)
    }

    handleChangeFromTime(date) {
        this.setState({fromTime: date})
    }

    handleChangeToTime(date) {
        this.setState({toTime: date})
    }

    onSubmitForm(e) {}

    onPriceChange(e) {
        const per_month_value = e.target.value
        console.log("value:", per_month_value)
        console.log("price per month:", this.refs.total_amount.value)
        console.log("book expired:", this.refs.book_expired.value)
        let total_value = this.refs.book_expired.value * per_month_value + ' VND'
        this.refs.total_amount.value = total_value

        // console.log("price per month:",
        // ReactDOM.findDOMNode(this.refs.price_per_month).value)
    }

    render() {
        return (
            <div className="container-fluid">
                <form
                    ref='monthly_ticket_form'
                    id="monthly-ticket"
                    className=""
                    onSubmit={this.onSubmitForm}>
                    <div className="row">
                        <div className="col-md-4 ticket-detail">
                            <div className="ticket-box">
                                <div className="row">
                                    <div className="col-md-12 form-group form-header">
                                        <label for="phoneNumber">THÔNG TIN CÁ NHÂN</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 form-group">
                                        <label for="phoneNumber">Họ Và Tên</label>
                                        <input type="text" className="form-control" name="name"/>

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 form-group">
                                        <label for="phoneNumber">Số điện thoại</label>
                                        <input type="text" className="form-control" name="phone_number"/>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 ticket-detail">
                            <div className="ticket-box">
                                <div className="row">
                                    <div className="col-md-12 form-group form-header">
                                        <label for="phoneNumber">THÔNG TIN XE</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 form-group">
                                        <label for="numberPlate">Biển số xe</label>
                                        <input
                                            type="text"
                                            placeholder="Biển số xe"
                                            className="form-control"
                                            name="number_plate"/>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <label for="image_car">Hình ảnh xe</label>
                                        <img
                                            src={process.env.PUBLIC_URL + '/assets/global/img/NO.jpg'}
                                            alt="NoData"
                                            width="40%"
                                            height="40%"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 ticket-detail">
                            <div className="ticket-box">
                                <div className="row">
                                    <div className="col-md-12 form-group form-header">
                                        <label for="phoneNumber">THÔNG TIN ĐIỂM ĐỖ</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 form-group">
                                        <label for="car_parking_place">Điểm đỗ</label>
                                        <input type="text" className="form-control" name="car_parking_place"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 form-group">
                                        <label for="book_time">Thời gian gửi xe</label>
                                        <select name="book_time" className="form-control">
                                            <option value="1">Đêm</option>
                                            <option value="2">Ngày</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label for="book_expired">Thời hạn gửi xe</label>
                                        <select name="book_expired" className="form-control" ref="book_expired">
                                            <option value="1">1 tháng</option>
                                            <option value="3">3 tháng</option>
                                            <option value="6">6 tháng</option>
                                            <option value="12">12 tháng</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 form-group ticket-date-picker">
                                        <label for="from_time">Từ ngày</label>
                                        <br/>
                                        <DatePicker
                                            className="form-control"
                                            name="from_time"
                                            selected={this.state.fromTime}
                                            onChange={this.handleChangeFromTime}/>
                                    </div>
                                    <div className="col-md-6 form-group ticket-date-picker">
                                        <label for="to_time">Đến ngày</label>
                                        <br/>
                                        <DatePicker
                                            className="form-control"
                                            name="to_time"
                                            selected={this.state.toTime}
                                            onChange={this.handleChangeToTime}/>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 submit-button">
                            <button type="submit" className="btn btn-primary">Đăng ký</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default ManagementMonthlyTicket