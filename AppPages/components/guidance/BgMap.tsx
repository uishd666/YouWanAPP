/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react';
import { StyleSheet, View, Animated, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const BgMap = () => {
    const scale = useRef(new Animated.Value(1)).current;
    const pan = useRef(new Animated.ValueXY()).current;

    const handleTouch = (event) => {
        if (scale._value < 1.1) {
            const { locationX, locationY } = event.nativeEvent;
            Animated.parallel([
                Animated.spring(scale, {
                    toValue: 1.5,
                    useNativeDriver: true,
                }),
                Animated.timing(pan, {
                    toValue: { x: - locationX + screenWidth / 2, y: - locationY + screenWidth / 2 },
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]).start();
        }
        else {
            Animated.parallel([
                Animated.spring(scale, {
                    toValue: 1,
                    useNativeDriver: true,
                }),
                Animated.timing(pan, {
                    toValue: { x: 0, y: 0 },
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    };

    return (
        <View style={{ width: screenWidth }}>
            <Animated.Image
                style={[{
                    width: screenWidth, height: screenWidth,
                }, , {
                    transform: [{ scale }, { translateX: pan.x }, { translateY: pan.y }]
                }]
                }
                source={require('../../media/images/guidance/芜湖.jpg')}
                onTouchStart={handleTouch}
            />
        </View>
    );
};

export default BgMap;

const styles = StyleSheet.create({
    map: {
        flex: 1,
        resizeMode: 'contain',
        width: screenWidth,
    },
})