/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import WuHu from '../components/guidance/WuHu';
import AnHui from '../components/guidance/AnHui';
import { BackHandler, Text, TouchableOpacity, View } from 'react-native';

export default class Guidance extends React.Component<any, any> {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        if (!this.state.showup) {
            this.setState({ selection: 'AnHui', pressDisabled: false, showup: true });
            return true;
        }
        else {
            BackHandler.exitApp();
        }
    };


    state = {
        showup: true,
        selection: 'AnHui',
        pressDisabled: false,
    };

    dict = {
        'AnHui': 0,
        'Empty': 1,
        'WuHu': 2,
    };

    contentList = [
        <View style={{ backgroundColor: '#b9e97b', height: '100%' }}><AnHui /></View>,
        <View><Text>空空如也</Text></View>,
        <View style={{ backgroundColor: '#f3eef4', height: '100%' }}><WuHu /></View>,
    ];

    render(): React.ReactNode {
        return (
            <>
                <TouchableOpacity onPress={this.handlePress} activeOpacity={1} disabled={this.state.pressDisabled}>
                    {this.contentList[this.dict[this.state.selection]]}
                </TouchableOpacity>
            </>
        );
    }

    handlePress = (event) => {
        console.log(event.nativeEvent.locationX);
        this.setState({ selection: 'WuHu', pressDisabled: true, showup: false });
    }

}