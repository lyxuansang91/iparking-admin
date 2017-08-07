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
            showArrows={false}
            dynamicHeight
            infiniteLoop={true}
            interval={10000}
            transitionTime={4000}
            useKeyboardArrows={true}
            stepOnHover={true}
            emulateTouch={true}
            showIndicators={false}>
            {/*<div><ComposedCharts/></div>*/}
            <div><LiveComponents/></div>

        </Carousel>

    </div>
)
export default PageContentMain