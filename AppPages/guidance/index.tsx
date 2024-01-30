/* eslint-disable prettier/prettier */
import React from 'react';
import BgMap from '../components/guidance/BgMap';
import { ScrollView, View } from 'react-native';

export default class Guidance extends React.Component<any, any> {

    render(): React.ReactNode {
        return (
            <View style={{ backgroundColor: '#f3eef4', height: '100%' }}>
                <BgMap />
            </View>
        );
    }
}