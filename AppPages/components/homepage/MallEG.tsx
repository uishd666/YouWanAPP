/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Image, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Grid } from '@ant-design/react-native';

const MallEG = () => {
    const srcResults = ['https://p1-q.mafengwo.net/s14/M00/56/2F/wKgE2lz-NdGAeqf_ACeTh1NPXH8501.jpg?imageMogr2%2Fthumbnail%2F%21250x160r%2Fgravity%2FCenter%2Fcrop%2F%21250x160%2Fquality%2F100', 'https://p1-q.mafengwo.net/s6/M00/1E/E2/wKgB4lIkipaAEJgLAAE9UMAw_lo32.jpeg?imageMogr2%2Fthumbnail%2F%21250x160r%2Fgravity%2FCenter%2Fcrop%2F%21250x160%2Fquality%2F100', 'https://p1-q.mafengwo.net/s12/M00/24/D1/wKgED1vQjqyAFfTSABK8D_vlvnE21.jpeg?imageMogr2%2Fthumbnail%2F%21250x160r%2Fgravity%2FCenter%2Fcrop%2F%21250x160%2Fquality%2F100', 'https://p1-q.mafengwo.net/s18/M00/B6/56/CoUBYGCAJteANLNCAAgGtVqYOWk174.jpg?imageMogr2%2Fthumbnail%2F%21250x160r%2Fgravity%2FCenter%2Fcrop%2F%21250x160%2Fquality%2F100', 'https://p1-q.mafengwo.net/s6/M00/DA/22/wKgB4lIy3tmAGOOZAAIojjCvvmU36.jpeg?imageMogr2%2Fthumbnail%2F%21250x160r%2Fgravity%2FCenter%2Fcrop%2F%21250x160%2Fquality%2F100', 'https://p1-q.mafengwo.net/s12/M00/5F/3D/wKgED1vqxEKAdSO_AD6eucAJwPY09.jpeg?imageMogr2%2Fthumbnail%2F%21250x160r%2Fgravity%2FCenter%2Fcrop%2F%21250x160%2Fquality%2F100', 'https://p1-q.mafengwo.net/s7/M00/FE/3C/wKgB6lRYSUuAbNc1AB7rYxyMZ_E30.jpeg?imageMogr2%2Fthumbnail%2F%21250x160r%2Fgravity%2FCenter%2Fcrop%2F%21250x160%2Fquality%2F100', 'https://p1-q.mafengwo.net/s14/M00/E6/FA/wKgE2l1tJtGAMCI_AAi5rPp3ctg225.jpg?imageMogr2%2Fthumbnail%2F%21250x160r%2Fgravity%2FCenter%2Fcrop%2F%21250x160%2Fquality%2F100', 'https://p1-q.mafengwo.net/s6/M00/C6/8B/wKgB4lJuX_mAdLPXAAJBpfoCoDg69.jpeg?imageMogr2%2Fthumbnail%2F%21250x160r%2Fgravity%2FCenter%2Fcrop%2F%21250x160%2Fquality%2F100', 'https://p1-q.mafengwo.net/s6/M00/01/BC/wKgB4lNGMuOAJGSxAAJm_KyxMR802.jpeg?imageMogr2%2Fthumbnail%2F%21250x160r%2Fgravity%2FCenter%2Fcrop%2F%21250x160%2Fquality%2F100', 'https://b1-q.mafengwo.net/s11/M00/98/04/wKgBEFrdFqKAe28rAA7Yx3m9UBc15.jpeg?imageMogr2%2Fthumbnail%2F%21250x160r%2Fgravity%2FCenter%2Fcrop%2F%21250x160%2Fquality%2F100', 'https://p1-q.mafengwo.net/s6/M00/6F/B7/wKgB4lMNmJeAQ-T0AABOK45dxCM63.jpeg?imageMogr2%2Fthumbnail%2F%21250x160r%2Fgravity%2FCenter%2Fcrop%2F%21250x160%2Fquality%2F100', 'https://p1-q.mafengwo.net/s6/M00/BE/98/wKgB4lKE3JuAfrXOAAjrNfW5nlc66.jpeg?imageMogr2%2Fthumbnail%2F%21250x160r%2Fgravity%2FCenter%2Fcrop%2F%21250x160%2Fquality%2F100', 'https://p1-q.mafengwo.net/s1/M00/D6/B6/wKgBm07paRKcC4MIAAEFVyQx0cQ43.jpeg?imageMogr2%2Fthumbnail%2F%21250x160r%2Fgravity%2FCenter%2Fcrop%2F%21250x160%2Fquality%2F100', 'https://p1-q.mafengwo.net/s5/M00/27/DD/wKgB3FGqtVqAO21kAAWZ4xnoVQk49.jpeg?imageMogr2%2Fthumbnail%2F%21250x160r%2Fgravity%2FCenter%2Fcrop%2F%21250x160%2Fquality%2F100'];

    const titleResults = ['淮河路步行街(环城东路)', '九华街', '宏村弘茗轩茶庄', '城隍庙市场', '合肥银泰百货', '万达广场(包河店)', '之心城购物中心', '碧山书局', '合肥天鹅湖万达广场', '宏村绣花鞋', '布衣', '百盛购物中心(淮河路店)', '大润发超市', '汤口镇沿溪西街', '合肥百货大楼'];

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

export default MallEG;

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