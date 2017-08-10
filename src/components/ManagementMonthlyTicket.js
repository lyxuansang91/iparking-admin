import React, {Component} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import Loading from '../assets/js/loading'
import axios, {post} from 'axios';

class ManagementMonthlyTicket extends Component {

    constructor(props) {
        super(props)
        this.state = {
            files: [],
            imagePreviewUrl: []
        };

        this.onSubmitForm = this
            .onSubmitForm
            .bind(this)
    }

    onSubmitForm(e) {

        e.preventDefault()

        var url = "/n/carpp/ticket/supervisor/create_monthly_ticket?phone=0989898476&cpp_id=8444335" +
                "20066568&number_plate=30Q2804&session_from=16&session_to=8&month=4&from_time=150" +
                "2273993&monthly_price=1234000"

        const formData = new FormData();
        formData.append('metadata', this.state.files)

        var instance = axios.create({
            timeout: 1000,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        // axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'

        axios
            .post(url, formData)
            .then((response) => {
                if (response.data.Error.Code == 200) {

                    console.log('success')

                    this.setState({loading: false})
                } else {
                    this.setState({loading: false})
                }
            })
            .catch((error) => {
                this.setState({loading: false})
            });
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let files = e.target.files;

        console.log(files)

        var previews = [];
        for (var i = 0; i < files.length; i++) {
            let reader = new FileReader();
            reader.onloadend = () => {
                previews.push(reader.result)
                this.setState({imagePreviewUrl: previews});
            }
            reader.readAsDataURL(files[i])
        }
    }

    render() {

        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl.length > 0) {
            $imagePreview = (<img src={imagePreviewUrl}/>);
        } else {
            $imagePreview = (
                <div className="previewText">Please select an Image for Preview</div>
            );
        }

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
                                        <br/>
                                        <div className="previewComponent">
                                            <input
                                                className="fileInput"
                                                type="file"
                                                multiple
                                                onChange={(e) => this._handleImageChange(e)}/>
                                            <div className="imgPreview">
                                                {$imagePreview}
                                            </div>
                                        </div>
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
                                            dateFormat="DD/MM/YYYY"
                                            onChange={this.handleChangeFromTime}/>
                                    </div>
                                    <div className="col-md-6 form-group ticket-date-picker">
                                        <label for="to_time">Đến ngày</label>
                                        <br/>
                                        <DatePicker
                                            className="form-control"
                                            name="to_time"
                                            dateFormat="DD/MM/YYYY"
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