/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Grid } from '@ant-design/react-native';

const ImageContainer = () => {
    const [titleResults, setTitleResults] = useState([]);
    const [srcResults, setSrcResults] = useState([]);
    const [urlIdx, setUrlIdx] = useState(0);

    const srcRegex = /<img src=\"(.*?)\"/g;
    const titleRegex = /<i title="景点"><\/i><span>([^"]+)<\/span>/g;

    let titleMatch: RegExpExecArray | null;
    let srcMatch: RegExpExecArray | null;

    const fetchData = (url: string) => {
        fetch(url, {
            method: 'GET',
        })
            .then((response) => response.text())
            .then((resdata) => {
                while ((srcMatch = srcRegex.exec(resdata)) !== null && (titleMatch = titleRegex.exec(resdata)) !== null) {
                    setTitleResults((titleResults) => [...titleResults, titleMatch[1]]);
                    setSrcResults((srcResults) => [...srcResults, srcMatch[1].replace(/100_100/g, '1180_462')]);
                }
            })
            .catch((error) => console.error('Error fetching:', error));

    };

    useEffect(() => {
        fetchData(`https://you.ctrip.com/countrysightlist/anhui100068/p${urlIdx + 1}.html`);
        setUrlIdx(urlIdx + 1);
    }, []);

    const ImageData = srcResults.map((src, idx) => ({
        icon: <Image source={{ uri: src }} style={styles.GridImage} key={idx} />,
        text: <Text style={styles.GridText}>{titleResults[idx]}</Text>,
    }));

    return (

        <>
            <Grid
                data={ImageData}
                hasLine={false}
                columnNum={2}
            ></Grid>
            <TouchableOpacity>
                <Text>
                    点击加载更多
                </Text>
            </TouchableOpacity>
            <Text>{'\n\n'}</Text>
        </>

    );
};

export default ImageContainer;

const styles = StyleSheet.create({
    GridImage: {
        width: '95%',
        height: '65%',
    },
    GridText: {
        fontSize: 15,
        color: 'grey',
    },
});