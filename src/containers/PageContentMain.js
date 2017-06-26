import React from 'react'
import BarChart from '../components/BarChart'
import LineChart from '../components/LineChart'

const PageContentMain = () => (
    <div>
        <div className="row">
            <div className="col-md-3">
                <a href="#">Báo cáo doanh số</a>
            </div>

            <div className="col-md-1">
                <a href="#">Tất cả</a>
            </div>
            <div className="col-md-1">
                <a href="#">HPC</a>
            </div>
            <div className="col-md-2">
                <a href="#">Đồng Xuân</a>
            </div>
        </div>
        <hr/>
        <BarChart/>
        <div className="row">
            <div className="col-md-3">
                <h4>
                    <a href="#">Cổng thanh toán</a>
                </h4>
            </div>
        </div>
        <LineChart/>

    </div>
)
export default PageContentMain