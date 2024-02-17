/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Grid } from '@ant-design/react-native';

const HotelEG = () => {
    const srcResults = ['http://dimg04.c-ctrip.com/images/0201w120008uvqizmD9D1_R_300_225_R5_Q70_D.jpg', 'http://dimg04.c-ctrip.com/images/0202412000d6cdrdp7870_R_300_225_R5_Q70_D.jpg', 'http://dimg04.c-ctrip.com/images/1mc5j12000aqwn5svE45B_R_300_225_R5_Q70_D.jpg', 'http://dimg04.c-ctrip.com/images/1mc2s12000cs3kk4g9794_R_300_225_R5_Q70_D.jpg', 'http://dimg04.c-ctrip.com/images/0206712000ah48a3nF02D_R_300_225_R5_Q70_D.jpg', 'http://dimg04.c-ctrip.com/images/0200s12000c7n1y0hCAC7_R_300_225_R5_Q70_D.jpg', 'http://dimg04.c-ctrip.com/images/200215000000y7396336E_R_300_225_R5_Q70_D.jpg', 'http://dimg04.c-ctrip.com/images/1mc7212000bh7zf8i162B_R_300_225_R5_Q70_D.jpg', 'http://dimg04.c-ctrip.com/images/1mc4212000alybwz3EE02_R_300_225_R5_Q70_D.jpg', 'http://dimg04.c-ctrip.com/images/0206j120008dvrr6s3434_R_300_225_R5_Q70_D.jpg'];


    const titleResults = ['奥斯汀酒店(六安高铁南站店)', '锦江之星酒店(泾县名都城店)', '马鞍山中闽万达美华酒店', '汉庭酒店(宿州新二中店)', '美朵酒店(宣城北门老街店)', '锦江之星风尚酒店(黟县水墨宏村店)', '安徽世纪金源大饭店', '景然Loft公寓(合肥天鹅湖店)', '庐州寓酒店(合肥经开区大学城店)', '黄山东榕华美达酒店'];

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
            <Text>{'\n\n'}</Text>
        </>

    );
}

export default HotelEG;

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