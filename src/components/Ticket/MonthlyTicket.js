import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import Loading from '../../assets/js/loading'
import axios, { post } from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

class MonthlyTicket extends Component {

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

                    this.setState({ loading: false })
                } else {
                    this.setState({ loading: false })
                }
            })
            .catch((error) => {
                this.setState({ loading: false })
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
                this.setState({ imagePreviewUrl: previews });
            }
            reader.readAsDataURL(files[i])
        }
    }

    render() {

        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl.length > 0) {
            $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
            $imagePreview = (
                <div className="previewText">Please select an Image for Preview</div>
            );
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 ticket-detail">
                        <div className="ticket-box">
                            <div className="row">
                                <div className="col-md-12  form-header">
                                    <label for="phoneNumber">THÔNG TIN CÁ NHÂN</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 ">
                                    <p className="title">Họ và tên tài xế</p>
                                    <p className="content">Nguyễn Văn B</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 ">
                                    <p className="title">Số điện thoại tài xế</p>
                                    <p className="content">0123456789</p>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="ticket-box">
                            <div className="row">
                                <div className="col-md-12  form-header">
                                    <label for="phoneNumber">ĐẠI DIỆN HỢP ĐỒNG</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 ">
                                    <p className="title">Giấy uỷ quyền hoặc số đăng ký xe</p>
                                    <p className="content">353253255</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 ">
                                    <p className="title">Họ và tên</p>
                                    <p className="content">Nguyễn Văn B</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 ">
                                    <p className="title">Số điện thoại</p>
                                    <p className="content">0123456789</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 ">
                                    <p className="title">Mã số thuế</p>
                                    <p className="content">0123456789</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 ">
                                    <p className="title">Địa chỉ</p>
                                    <p className="content">241 Xuân Thuỷ, Dịch Vọng Hậu, Cầu Giấy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 ticket-detail">
                        <div className="ticket-box">
                            <div className="row">
                                <div className="col-md-12  form-header">
                                    <label for="phoneNumber">THÔNG TIN HỢP ĐỒNG</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 ">
                                    <p className="title">Mã hợp đồng</p>
                                    <p className="content">353253255</p>
                                </div>
                                <div className="col-md-6 ">
                                    <p className="title">Mã điểm đỗ</p>
                                    <p className="content">HK001</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 ">
                                    <p className="title">Địa chỉ đỗ xe</p>
                                    <p className="content">241 Xuân Thuỷ, Dịch Vọng Hậu, Cầu Giấy</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 ">
                                    <p className="title">Số tháng đỗ xe</p>
                                    <p className="content">06</p>
                                </div>
                                <div className="col-md-6 ">
                                    <p className="title">Loại hình trông giữ</p>
                                    <p className="content">Đêm (18:00 - 06:00)</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 ">
                                    <p className="title">Đăng ký</p>
                                    <p className="content">01/05/2017</p>
                                </div>
                                <div className="col-md-6 ">
                                    <p className="title">Hết hạn</p>
                                    <p className="content">01/11/2017</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 ">
                                    <p className="title">Đơn giá</p>
                                    <p className="content">2.000.000 đ</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 ">
                                    <p className="title">Giá trị hợp đồng</p>
                                    <p className="content">12.000.000 đ</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 ">
                                    <p className="title">Hình ảnh hợp đồng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 ticket-detail">
                        <div className="ticket-box">
                            <div className="row">
                                <div className="col-md-12  form-header">
                                    <label for="phoneNumber">THÔNG TIN THANH TOÁN</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 ">
                                    <p className="title">Mã thanh toán</p>
                                    <p className="content">0325235535</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 ">
                                    <p className="title">Đã thanh toán</p>
                                    <p className="content">3 tháng/ 6 tháng</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 ">
                                    <p className="title">Hạn thanh toán</p>
                                    <p className="content">01/12/2017</p>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="ticket-box">
                            <div className="row">
                                <div className="col-md-12  form-header">
                                    <label for="phoneNumber">DANH SÁCH XE</label>
                                </div>
                                <div className="col-md-12">
                                    <BootstrapTable
                                        options={{
                                            noDataText: 'Không có kết quả nào'
                                        }}
                                        data={this.state.rows}
                                        hover={true}
                                        pagination={true}
                                        bordered={true}>
                                        <TableHeaderColumn
                                            headerAlign='center'
                                            dataAlign='center'
                                            dataField='stt'
                                            width="100">STT</TableHeaderColumn>
                                        <TableHeaderColumn
                                            headerAlign='center'
                                            dataAlign='center'
                                            dataField='plate'
                                            isKey={true}>Biển kiểm soát</TableHeaderColumn>


                                    </BootstrapTable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="portlet box blue">
                        <div className="portlet-title">
                            <div className="caption">Danh sách giao dịch</div>
                            <div className="tools">
                                <a href="#" className="collapse"></a>
                            </div>
                            {/*<div className="actions">
                                <button className="btn btn-default btn-sm" onClick={this.exportToCSV}>
                                    <i className="fa fa-pencil"></i>
                                    Export to CSV
                                </button>
                            </div>*/}
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
                                hover={true}
                                pagination={true}
                                bordered={true}>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    dataField='stt'
                                    width="100">STT</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    dataField='Code'
                                    width="120"
                                    isKey={true}>Mã giao dịch</TableHeaderColumn>

                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    width="200"
                                    dataField='Date'>Ngày tạo giao dịch</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    width="85"
                                    dataField='Type'>Loại</TableHeaderColumn>
                                <TableHeaderColumn
                                    headerAlign='center'
                                    dataAlign='center'
                                    dataField='content'>Nội Dung</TableHeaderColumn>


                            </BootstrapTable>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MonthlyTicket