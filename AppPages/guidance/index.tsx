/* eslint-disable prettier/prettier */
import React from 'react';
import BgMap from '../components/guidance/BgMap';
import { ScrollView } from 'react-native';

export default class Guidance extends React.Component<any, any> {

    render(): React.ReactNode {
        return (
            <>
                <ScrollView>

                    <BgMap />
                </ScrollView>

            </>
        );
    }
}