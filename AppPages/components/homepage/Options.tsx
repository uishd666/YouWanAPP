/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { Grid } from '@ant-design/react-native';

const images = [
    require('@ant-design/react-native/../../../AppPages/media/images/home/Options/city.png'),
    require('@ant-design/react-native/../../../AppPages/media/images/home/Options/scenic.png'),
    require('@ant-design/react-native/../../../AppPages/media/images/home/Options/book.png'),
    require('@ant-design/react-native/../../../AppPages/media/images/home/Options/hotel.png'),
    require('@ant-design/react-native/../../../AppPages/media/images/home/Options/mall.png'),
    require('@ant-design/react-native/../../../AppPages/media/images/home/Options/reserve.png'),
    require('@ant-design/react-native/../../../AppPages/media/images/home/Options/virtual.png'),
    require('@ant-design/react-native/../../../AppPages/media/images/home/Options/live.png'),
    require('@ant-design/react-native/../../../AppPages/media/images/home/Options/food.png'),
    require('@ant-design/react-native/../../../AppPages/media/images/home/Options/video.png'),

]

export default class Options extends React.Component<any, any> {

    data = images.map((img, idx) => ({
        icon: <Image source={img} style={styles.GridImage} />,
        text: `这是测试${idx + 1}`,
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