/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Grid } from '@ant-design/react-native';

const optionsJson = [
    { 'img': require('@ant-design/react-native/../../../android/app/src/main/res/drawable/media/images/home/Options/city.png'), 'text': '城市印象' },
    { 'img': require('@ant-design/react-native/../../../android/app/src/main/res/drawable/media/images/home/Options/scenic.png'), 'text': '热门景区' },
    { 'img': require('@ant-design/react-native/../../../android/app/src/main/res/drawable/media/images/home/Options/book.png'), 'text': '旅游攻略' },
    { 'img': require('@ant-design/react-native/../../../android/app/src/main/res/drawable/media/images/home/Options/hotel.png'), 'text': '酒店' },
    { 'img': require('@ant-design/react-native/../../../android/app/src/main/res/drawable/media/images/home/Options/mall.png'), 'text': '文旅商店' },
    { 'img': require('@ant-design/react-native/../../../android/app/src/main/res/drawable/media/images/home/Options/reserve.png'), 'text': '场馆预约' },
    { 'img': require('@ant-design/react-native/../../../android/app/src/main/res/drawable/media/images/home/Options/virtual.png'), 'text': '景区虚拟游' },
    { 'img': require('@ant-design/react-native/../../../android/app/src/main/res/drawable/media/images/home/Options/live.png'), 'text': '直播' },
    { 'img': require('@ant-design/react-native/../../../android/app/src/main/res/drawable/media/images/home/Options/food.png'), 'text': '美食' },
    { 'img': require('@ant-design/react-native/../../../android/app/src/main/res/drawable/media/images/home/Options/video.png'), 'text': '短视频' },

]

export default class Options extends React.Component<any, any> {

    data = optionsJson.map((option, idx) => ({
        icon: <Image source={option.img} style={styles.GridImage} />,
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
        width: '50%',
        height: '50%',
    },
})