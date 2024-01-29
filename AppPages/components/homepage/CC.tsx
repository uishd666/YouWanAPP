/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Text, ScrollView } from 'react-native';
import { Button, Grid } from '@ant-design/react-native';

class ImageContainer2 extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            titleResults: [],
            srcResults: [],
            urlIdx: 0,
            pageLoadingFull: false,
            pageLoading: false,
            // isEnd: props.isEnd,
        };
        this.fetchData(`https://you.ctrip.com/countrysightlist/anhui100068/p${this.state.urlIdx + 1}.html`);
        // this.setState({ urlIdx: this.state.urlIdx + 1 });
    }
    srcRegex = /<img src=\"(.*?)\"/g;
    titleRegex = /<i title="景点"><\/i><span>([^"]+)<\/span>/g;

    titleMatch: RegExpExecArray | null;
    srcMatch: RegExpExecArray | null;

    loadMore = async () => {
        //开始加载设置加载中进行节流
        this.setState({ pageloading: true });
        console.log(this.state.urlIdx);
        this.fetchData(`https://you.ctrip.com/countrysightlist/anhui100068/p${this.state.urlIdx + 1}.html`);
        if (this.state.urlIdx >= 10) {
            this.setState({ pageLoadingFull: true });
        }
        //加载结束
        this.setState({ pageloading: false });
    };

    onMomentumScrollEnd = (event: any) => {
        const offSetY = event.nativeEvent.contentOffset.y; // 获取滑动的距离
        const contentSizeHeight = event.nativeEvent.contentSize.height; // scrollView  contentSize 高度
        const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; // scrollView高度
        if (offSetY + oriageScrollHeight >= contentSizeHeight - 80) {
            if (!this.state.pageLoadingFull && !this.state.pageLoading) {
                this.setState({ urlIdx: this.state.urlIdx + 1 });
                this.loadMore();
            }
            else {
                console.log('No More Data');
            }
        }
    };

    fetchData = (url: string) => {
        fetch(url, {
            method: 'GET',
        })
            .then((response) => response.text())
            .then((resdata) => {
                while ((this.srcMatch = this.srcRegex.exec(resdata)) !== null && (this.titleMatch = this.titleRegex.exec(resdata)) !== null) {
                    this.setState({ titleResults: [...this.state.titleResults, this.titleMatch[1]] });
                    this.setState({ srcResults: [...this.state.srcResults, this.srcMatch[1].replace(/100_100/g, '1180_462')] });
                }
            })
            .catch((error) => console.error('Error fetching:', error));

    };

    render(): React.ReactNode {
        const ImageData = this.state.srcResults.map((src: any, idx: any) => ({
            icon: <Image source={{ uri: src }} style={styles.GridImage} />,
            text: <Text style={styles.GridText}>{this.state.titleResults[idx]}</Text>,
        }));
        return (
            <View>
                <Grid
                    data={ImageData}
                    hasLine={false}
                    columnNum={2}
                ></Grid>
                <Button
                    type='primary'
                    style={{ height: 50, width: 50 }}
                    onPress={() => {
                        this.setState({ urlIdx: this.state.urlIdx + 1 });
                        this.fetchData(`https://you.ctrip.com/countrysightlist/anhui100068/p${this.state.urlIdx + 1}.html`);
                    }}>
                    <Text>
                        点击加载更多
                    </Text>
                </Button>
            </View>
        );
    }
}

export default ImageContainer2;

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
