/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import WuHu from '../components/guidance/WuHu';
import AnHui from '../components/guidance/AnHui';
import { BackHandler, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default class Guidance extends React.Component<any, any> {
    state = {
        selection: 'AnHui',
    };

    dict = {
        'AnHui': { idx: 0, location: '安徽' },
        'Empty': { idx: 1, location: '敬请期待' },
        'WuHu': { idx: 2, location: '芜湖' },
    };

    contentList = [
        <View style={{ backgroundColor: '#b9e97b', height: '100%' }}><AnHui /></View>,
        <View><Text>空空如也</Text></View>,
        <View style={{ backgroundColor: '#f3eef4', height: '100%' }}><WuHu /></View>,
    ];

    stack = createNativeStackNavigator();

    funcAnHui = (props) => {
        const { navigation } = props;

        return (
            <TouchableOpacity onPress={(event) => {
                const { locationX, locationY } = event.nativeEvent;
                if (Math.abs(locationX - 300) <= 20 && Math.abs(locationY - 430) <= 20) {
                    this.setState({ selection: 'WuHu' });
                }
                else {
                    this.setState({ selection: 'Empty' });
                }
                navigation.navigate('Location');

            }}
                activeOpacity={1}>
                {this.contentList[0]}
            </TouchableOpacity>
        );
    };

    funcLocation = () => {
        return (
            <View style={{ backgroundColor: '#f3eef4', height: '100%' }}><WuHu /></View>
        );
    };

    render(): React.ReactNode {
        return (
            <NavigationContainer>
                <this.stack.Navigator
                    screenOptions={{
                        headerTitleAlign: 'center',
                    }}
                >
                    <this.stack.Screen name="AnHui" options={{ title: '安徽' }}>
                        {(props) => <this.funcAnHui {...props} />}
                    </this.stack.Screen>
                    <this.stack.Screen name="Location" options={{ title: this.dict[this.state.selection].location }}>
                        {() => this.contentList[this.dict[this.state.selection].idx]}
                    </this.stack.Screen>
                </this.stack.Navigator>
            </NavigationContainer>
        );
    }

}