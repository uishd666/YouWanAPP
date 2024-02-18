/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Grid } from '@ant-design/react-native';

const optionsJson = [
    { 'img': require('@ant-design/react-native/../../../android/app/src/main/res/drawable/media/images/home/Options/city.png'), 'text': '城市印象', 'uri': 'https://www.zhihu.com/question/392871615' },
    { 'img': require('@ant-design/react-native/../../../android/app/src/main/res/drawable/media/images/home/Options/scenic.png'), 'text': '热门景区', 'uri': 'https://www.mafengwo.cn/jd/12719/gonglve.html' },
    { 'img': require('@ant-design/react-native/../../../android/app/src/main/res/drawable/media/images/home/Options/book.png'), 'text': '旅游攻略', 'uri': 'https://www.mafengwo.cn/travel-scenic-spot/mafengwo/12719.html' },
    { 'img': require('@ant-design/react-native/../../../android/app/src/main/res/drawable/media/images/home/Options/hotel.png'), 'text': '酒店', 'uri': 'https://cn.bing.com/travel/hotel-search?q=%E5%AE%89%E5%BE%BD%E9%85%92%E5%BA%97&cin=2024-03-31&cout=2024-04-01&guests=2A&rooms=1&displaytext=%E5%AE%89%E5%BE%BD%E7%9C%81&loc=%E5%AE%89%E5%BE%BD%E7%9C%81&sort=Popularity&type=hotel&mapBounds=31.922531%2C117.17643%2C31.75285%2C117.348854&cacheId=d5064de5-b047-4475-a7f4-3e26f9f84ce6__13b2ab07-1c5d-43a6-9bd9-acd6f7bc4ab5__2__%E9%85%92%E5%BA%97&form=HTSELI&entrypoint=HTSELI' },
    { 'img': require('@ant-design/react-native/../../../android/app/src/main/res/drawable/media/images/home/Options/mall.png'), 'text': '文旅商店', 'uri': 'https://zhuanlan.zhihu.com/p/420308787' },
    { 'img': require('@ant-design/react-native/../../../android/app/src/main/res/drawable/media/images/home/Options/reserve.png'), 'text': '场馆预约', 'uri': 'https://hf.bendibao.com/tour/202336/90504.shtm' },
    { 'img': require('@ant-design/react-native/../../../android/app/src/main/res/drawable/media/images/home/Options/virtual.png'), 'text': '景区虚拟游', 'uri': 'https://www.bing.com' },
    { 'img': require('@ant-design/react-native/../../../android/app/src/main/res/drawable/media/images/home/Options/live.png'), 'text': '直播', 'uri': 'https://www.bing.com' },
    { 'img': require('@ant-design/react-native/../../../android/app/src/main/res/drawable/media/images/home/Options/food.png'), 'text': '美食', 'uri': 'https://zhuanlan.zhihu.com/p/159461022' },
    { 'img': require('@ant-design/react-native/../../../android/app/src/main/res/drawable/media/images/home/Options/video.png'), 'text': '短视频', 'uri': 'https://www.douyin.com/search/%E5%AE%89%E5%BE%BD?aid=3335d67b-11ee-49dc-b2ab-917bd477cce3&publish_time=0&sort_type=0&source=normal_search&type=general' },

]

export default class Options extends React.Component<any, any> {

    constructor(props) {
        super(props);
    }

    state = {
        onTouchOptions: this.props.onTouch,
    }

    data = optionsJson.map((option, idx) => ({
        icon: <TouchableOpacity onPress={() => {
            this.state.onTouchOptions(option.uri, option.text);
        }}><Image source={option.img} style={styles.GridImage} key={idx} /></TouchableOpacity>,
        text: option.text,
    }));

    render() {
        return (
            <>
                <View>
                    <Grid
                        data={this.data}
                        hasLine={false}
                        columnNum={5}
                        isCarousel
                        carouselMaxRow={2}
                    ></Grid>
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    GridImage: {
        width: 38,
        height: 38,
    },
})