import React, {Component} from 'react'
import DataGridDemo from './DataGridDemo'

class SearchTicket extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <form className="" action="#" method="POST">
                        <div className="col-md-3 form-group">
                            <label for="numberPlate">Biển số xe</label>
                            <input type="text" className="form-control" placeholder="Biển số xe"/>
                        </div>

                        <div className="col-md-3 form-group">
                            <label for="numberPlate">Số điện thoại</label>
                            <input type="text" className="form-control" placeholder="Số điện thoại"/>
                        </div>

                        <div className="col-md-2 form-group">
                            <label for="numberPlate">Điểm đỗ</label>
                            <select className="form-control">
                                <option value="1">1</option>
                                <option value="1">2</option>
                                <option value="1">3</option>
                                <option value="1">4</option>
                                <option value="1">5</option>
                            </select>
                        </div>
                        <div
                            className="col-md-4"
                            style={{
                            marginTop: '24px'
                        }}>
                            <button type="submit" className="btn btn-primary">Tra cứu</button>
                        </div>
                    </form>
                </div>
                <div className="row"></div>
            </div>
        )
    }
}

export default SearchTicket