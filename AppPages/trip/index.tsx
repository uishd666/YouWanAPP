/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import WebView from 'react-native-webview';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default class Trip extends React.Component<any, any> {

    stack = createNativeStackNavigator();

    state = {
        id: 0,
    };

    source = [{ title: '住宿', uri: 'https://m.mafengwo.cn/hotel/12719/' }, { title: '交通', uri: 'https://map.qq.com/m/index/nav' }];

    funcTrip = (props) => {
        const { navigation } = props;
        return (
            <ImageBackground
                source={require('../../android/app/src/main/res/drawable/media/images/trip/bgimg.jpg')}
                style={{
                    width: '100%', height: '100%', textAlign: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                }}
            >
                <TouchableOpacity style={styles.touch}
                    onPress={() => {
                        this.setState({ id: 0 });
                        navigation.navigate('WebView');
                    }}
                >
                    <Text style={styles.touchText}>
                        住宿
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touch}
                    onPress={() => {
                        this.setState({ id: 1 });
                        navigation.navigate('WebView');
                    }}
                >
                    <Text style={styles.touchText}>
                        交通
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
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
                    <this.stack.Screen name="mainBody" options={{ title: '出行' }}>
                        {(props) => <this.funcTrip {...props} />}
                    </this.stack.Screen>
                    <this.stack.Screen name="WebView" options={{ title: this.source[this.state.id].title }}>
                        {() => <WebView source={{ uri: this.source[this.state.id].uri }} />}
                    </this.stack.Screen>
                </this.stack.Navigator>
            </NavigationContainer>
        );
    }
};

const styles = StyleSheet.create({
    touch: {
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
        fontWeight: 'bold',
        height: 60,
        marginHorizontal: 20,
        marginVertical: 50,
        borderRadius: 20,
    },
    touchText: {
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 25,
        color: 'black',
    },
});