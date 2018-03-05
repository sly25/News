import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import {Tabs,Carousel} from "antd";
import MobileNewsBlock from "./mobile_list";
import MobileListPullRefresh from "./mobile_list_pull_refresh";

const TabPane = Tabs.TabPane;

export default class MobileIndex extends React.Component{
    render(){
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slideToShow: 1,
            autoplay: true
        };
        return(
            <div>
                <MobileHeader/>
                <Tabs>
                    <TabPane tab="头条" key="1">
                        <div class="carousel">
                            <Carousel {...settings}>
                                <div><img src="./src/images/carousel3.jpg" /></div>
                                <div><img src="./src/images/carousel2.jpg" /></div>
                                <div><img src="./src/images/carousel1.jpg" /></div>
                                <div><img src="./src/images/carousel4.jpeg" /></div>
                            </Carousel>
                        </div>
                        <MobileNewsBlock type="top" count={20} />
                    </TabPane>
                    <TabPane tab="社会" key="2">
                        <MobileNewsBlock type="shehui" count={20} />
                    </TabPane>
                    <TabPane tab="国内" key="3">
                        <MobileListPullRefresh type="guonei" count={20} />
                    </TabPane>
                    <TabPane tab="国际" key="4">
                        <MobileNewsBlock type="guoji" count={20} />
                    </TabPane>
                    <TabPane tab="娱乐" key="5">
                        <MobileNewsBlock type="yule" count={20} />
                    </TabPane>
                </Tabs>
                <MobileFooter/>
            </div>
        );
    }
}