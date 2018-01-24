import React from 'react'
import ComposedCharts from '../components/Home/RevenueChart'
import StackAreaChart from '../components/Home/PaymentChart'
import LiveComponents from '../components/Home/HomeComponent'
var Carousel = require('react-responsive-carousel').Carousel;
import 'react-responsive-carousel/lib/styles/carousel.css'

const PageContentMain = () => (

    <div className="gg">

        <Carousel
            axis="horizontal"
            showArrows={false}
            infiniteLoop={false}
            autoPlay={false}
            interval={10000}
            emulateTouch={false}
            useKeyboardArrows={true}
            dynamicHeight={true}
            swipeScrollTolerance={500}
            showIndicators={false}>

            <div><ComposedCharts /></div>
            <div><LiveComponents /></div>
        </Carousel>
    </div>
)
export default PageContentMain