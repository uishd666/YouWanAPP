/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';

export default class AnHui extends Component {
    screenWidth = Dimensions.get('window').width;
    render(): React.ReactNode {
        return (
            <>
                <Image source={require('../../../android/app/src/main/res/drawable/media/images/guidance/安徽.jpg')} style={[styles.BgImg, { width: this.screenWidth }]} />
            </>
        )
    }
}

const styles = StyleSheet.create(
    {
        BgImg: {
            flex: 1,
            resizeMode: 'contain',
        },
    }
)