import React from 'react'
import BarChart from '../components/BarChart'
import LineChart from '../components/LineChart'
import ComposedCharts from '../components/ComposedCharts'
import StackAreaChart from '../components/StackAreaChart'
import LiveComponents from '../components/LiveComponents'
var Carousel = require('react-responsive-carousel').Carousel;
import 'react-responsive-carousel/lib/styles/carousel.css'

const PageContentMain = () => (

    <div className="gg">
        <Carousel
            axis="horizontal"
            showArrows={true}
            dynamicHeight
            emulateTouch
            showIndicators={false}>
            <div><LiveComponents/></div>
            <div><ComposedCharts/></div>
            <div><ComposedCharts/></div>
        </Carousel>

    </div>
)
export default PageContentMain