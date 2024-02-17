/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Grid } from '@ant-design/react-native';

const ImageEG = () => {
    const srcResults = ['https://dimg04.c-ctrip.com/images/100l0g000000884py6BDE_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/10040n000000e0f4w0051_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/100e10000000pjnfm00A6_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/100c0z000000ms7k99A95_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/0104s120009ehdyftAF93_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/100e14000000x6kkjCB08_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/100814000000wpsz87016_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/0102p1200082h20b5A916_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/0105f120008k4kuz86DF6_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/100h0w000000k75v10EA2_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/0105d1200082616qr216C_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/100o0s000000i80gs50D8_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/01A2p1200081ad0mh3A83_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/0103k1200090fni9g1646_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/0102i120008lvw9xx9BA5_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/10030w000000k7bds36E8_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/01001120005wr6q28B535_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/10031f000001gs25cBA62_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/100t0z000000nl9q7779B_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/10010z000000nq8hfE107_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/0105v120009ehb6o45EFA_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/1lo3c12000citr40330D3_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/01066120008k52tro4958_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/100g14000000w926rC12B_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/0101v120008k4h1hs3DDA_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/100o0w000000k4na73E37_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/100j0q000000gmrvzC0F1_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/0100j120009j4mtvu1C5C_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/0106a120009ehaqcs9C5E_C_1180_462.jpg', 'https://dimg04.c-ctrip.com/images/0102y120009ehabahF697_C_1180_462.jpg'];

    const titleResults = ['黄山', '合肥', '黟县', '青阳', '池州', '芜湖', '安庆', '宣城', '六安', '滁州', '歙县', '绩溪', '潜山', '亳州', '马鞍山', '蚌埠', '巢湖', '阜阳', '金寨', '肥西', '泾县', '休宁', '淮南', '铜陵', '宿州', '淮北', '庐江', '霍山', '石台', '寿县', '宁国'];

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

export default ImageEG;

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