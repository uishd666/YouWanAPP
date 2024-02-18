/* eslint-disable prettier/prettier */
import React from 'react';
import WebView from 'react-native-webview';

const TES = ({ url }) => {
    return (
        <WebView
            source={{ uri: url }}
        />
    );
};

export default TES;
