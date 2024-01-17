/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, ScrollView } from 'react-native';
import { Grid } from '@ant-design/react-native';

const APTest = () => {
    const [titleResults, setTitleResults] = useState([]);
    const [srcResults, setSrcResults] = useState([]);
    const [urlIdx, setUrlIdx] = useState(0);
    const [pageLoadingFull, setPageLoadingFull] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [t, setT] = useState();

    const srcRegex = /<a href(.*?)">/g;
    const titleRegex = /<span class="ellipsis" title="([^"]+)">/g;

    let titleMatch: RegExpExecArray | null;
    let srcMatch: RegExpExecArray | null;

    const loadMore = async () => {
        //开始加载设置加载中进行节流
        setPageLoading(true);
        console.log(urlIdx);
        fetchData(`https://you.ctrip.com/restaurantlist/anhui100068/s0-p${urlIdx + 1}.html`);
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
                setT(resdata);
                console.log(resdata);
                // 在bht01上修改
                while ((srcMatch = srcRegex.exec(resdata)) !== null && (titleMatch = titleRegex.exec(resdata)) !== null) {
                    setTitleResults((titleResults) => [...titleResults, titleMatch[1].replace(/220_140/g, '1600_10000')]);
                    setSrcResults((srcResults) => [...srcResults, srcMatch[1]]);
                }
                console.log(titleResults);
                console.log(srcResults);
            })
            .catch((error) => console.error('Error fetching:', error));

    };

    useEffect(() => {
        fetchData(`https://you.ctrip.com/restaurantlist/anhui100068/s0-p${urlIdx + 1}.html`);
        setUrlIdx(urlIdx + 1);
    }, []);

    // const newSrc = srcResults.map((item) => item.replace(/220_140/g, '1600_10000'));

    const ImageData = srcResults.map((src, idx) => ({
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
            <Text>{t}</Text>
        </ScrollView>
    );
};

export default APTest;

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