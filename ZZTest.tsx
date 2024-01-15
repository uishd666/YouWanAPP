/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
// import "text-encoding-polyfill";
import { Button } from '@ant-design/react-native';
import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Image } from 'react-native';

const ZZTest = () => {
    const txt = '';
    let tm: RegExpExecArray | null;
    const sr = /<img data-imgurl="(.*?)"/g;
    tm = sr.exec(txt);
    console.log(tm);
    return (
        <Text>
            123

        </Text>
    )
}

export default ZZTest;