/* eslint-disable prettier/prettier */
import React from 'react';
import ImageContainer from '../components/homepage/ImageContainer';
import ImageContainer2 from '../components/homepage/CC';
import { ScrollView } from 'react-native';

export default class Guidance extends React.Component<any, any> {

    render(): React.ReactNode {
        return (
            <>
                <ScrollView>

                    <ImageContainer2 />
                </ScrollView>

            </>
        );
    }
}