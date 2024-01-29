/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Image, Animated, PanResponder } from 'react-native';

export default class ZoomableImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: new Animated.Value(1),
            pan: new Animated.ValueXY(),
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                this.state.pan.setValue({ x: gestureState.dx, y: gestureState.dy });
            },
            onPanResponderRelease: (evt, gestureState) => {
                Animated.spring(this.state.pan, {
                    toValue: { x: 0, y: 0 },
                    friction: 5,
                    useNativeDriver: false
                }).start();
            },
        });
    }

    handleZoomIn = (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        Animated.parallel([
            Animated.spring(this.state.scale, {
                toValue: 2,
                friction: 5,
                useNativeDriver: false
            }),
            // Animated.spring(this.state.pan, {
            //     toValue: { x: -locationX, y: -locationY },
            //     friction: 5,
            //     useNativeDriver: false
            // }),
        ]).start();
    };

    render() {
        const { scale, pan } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <Animated.View
                    style={{
                        transform: [{ scale }, { translateX: pan.x }, { translateY: pan.y }],
                    }}
                    {...this.panResponder.panHandlers}
                >
                    <Image
                        source={require('../../media/images/guidance/芜湖.jpg')}
                        style={{ width: 200, height: 200 }}
                        resizeMode="contain"
                        onTouchStart={this.handleZoomIn}
                    />
                </Animated.View>
            </View>
        );
    }
}
