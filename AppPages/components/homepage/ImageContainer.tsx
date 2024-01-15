/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, ScrollView } from 'react-native';
import { Grid } from '@ant-design/react-native';

const ImageContainer = () => {
    const [titleResults, setTitleResults] = useState([]);
    const [srcResults, setSrcResults] = useState([]);
    const [urlIdx, setUrlIdx] = useState(0);
    const [pageLoadingFull, setPageLoadingFull] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);

    const srcRegex = /<img src=\"(.*?)\"/g;
    const titleRegex = /<i title="景点"><\/i><span>([^"]+)<\/span>/g;

    let titleMatch: RegExpExecArray | null;
    let srcMatch: RegExpExecArray | null;

    let urlList: string[] = [];
    for (let i = 1; i <= 10; i++) {
        const url = `https://you.ctrip.com/countrysightlist/anhui100068/p${i}.html`;
        urlList.push(url);
    }

    const loadMore = async () => {
        //开始加载设置加载中进行节流
        setPageLoading(true);
        console.log(urlIdx);
        fetchData(urlList[urlIdx]);
        if (urlIdx >= 10) {
            setPageLoadingFull(true);
        }
        //加载结束
        setPageLoading(false);
    };

    const onMomentumScrollEnd = (event: any) => {
        const offSetY = event.nativeEvent.contentOffset.y; // 获取滑动的距离
        const contentSizeHeight = event.nativeEvent.contentSize.height; // scrollView  contentSize 高度
        const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; // scrollView高度
        if (offSetY + oriageScrollHeight >= contentSizeHeight - 80) {
            if (!pageLoadingFull && !pageLoading) {
                setUrlIdx(urlIdx + 1);
                loadMore();
            }
            else {
                console.log('No More Data');
            }
        }
    };

    const fetchData = (url: string) => {
        fetch(url, {
            method: 'GET',
        })
            .then((response) => response.text())
            .then((resdata) => {
                while ((srcMatch = srcRegex.exec(resdata)) !== null && (titleMatch = titleRegex.exec(resdata)) !== null) {
                    setTitleResults((titleResults) => [...titleResults, titleMatch[1]]);
                    setSrcResults((srcResults) => [...srcResults, srcMatch[1]]);
                }
            })
            .catch((error) => console.error('Error fetching:', error));

    };

    useEffect(() => {
        fetchData(urlList[urlIdx]);
        setUrlIdx(urlIdx + 1);
    }, []);

    const newSrc = srcResults.map((item) => item.replace(/100_100/g, '1180_462'));

    const ImageData = newSrc.map((src, idx) => ({
        icon: <Image source={{ uri: src }} style={styles.GridImage} key={idx} />,
        text: <Text style={styles.GridText}>{titleResults[idx]}</Text>,
    }))

    return (
        <ScrollView
            // onScrollEndDrag={handleScroll}
            onScrollEndDrag={onMomentumScrollEnd}
        >
            <Grid
                data={ImageData}
                hasLine={false}
                columnNum={2}
            ></Grid>
        </ScrollView>
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
})