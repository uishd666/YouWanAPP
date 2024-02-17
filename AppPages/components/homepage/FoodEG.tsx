/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Grid } from '@ant-design/react-native';

const FoodEG = () => {
    const srcResults = ['https://p1-q.mafengwo.net/s10/M00/3E/A5/wKgBZ1jEAZeAQfD-AATilUUKg9466.jpeg?imageMogr2%2Fthumbnail%2F%21300x190r%2Fgravity%2FCenter%2Fcrop%2F%21300x190%2Fquality%2F90', 'https://p1-q.mafengwo.net/s13/M00/40/62/wKgEaVxstxmAPj3hAEAoJtfkCTQ24.jpeg?imageMogr2%2Fthumbnail%2F%21300x190r%2Fgravity%2FCenter%2Fcrop%2F%21300x190%2Fquality%2F90', 'https://p1-q.mafengwo.net/s11/M00/8C/D4/wKgBEFqJkqSAVw1gAAYKbgi7Nfo71.jpeg?imageMogr2%2Fthumbnail%2F%21300x190r%2Fgravity%2FCenter%2Fcrop%2F%21300x190%2Fquality%2F90', 'https://p1-q.mafengwo.net/s17/M00/7E/7B/CoUBXl-awZyAYANAAAQLOyxEc_o309.jpg?imageMogr2%2Fthumbnail%2F%21300x190r%2Fgravity%2FCenter%2Fcrop%2F%21300x190%2Fquality%2F90', 'https://p1-q.mafengwo.net/s5/M00/26/6E/wKgB3FDxKMGADURGAAPmFyia7ic80.jpeg?imageMogr2%2Fthumbnail%2F%21300x190r%2Fgravity%2FCenter%2Fcrop%2F%21300x190%2Fquality%2F90', 'https://p1-q.mafengwo.net/s11/M00/F9/7F/wKgBEFq85P6AYgBBAALje_f2Fuw38.jpeg?imageMogr2%2Fthumbnail%2F%21300x190r%2Fgravity%2FCenter%2Fcrop%2F%21300x190%2Fquality%2F90', 'https://p1-q.mafengwo.net/s12/M00/0B/7E/wKgED1vEFh-AEVqoAAGWYOTXvCA83.jpeg?imageMogr2%2Fthumbnail%2F%21300x190r%2Fgravity%2FCenter%2Fcrop%2F%21300x190%2Fquality%2F90', 'https://p1-q.mafengwo.net/s11/M00/F2/AD/wKgBEFrJ6AyAL8wfAAW75REUvWI76.jpeg?imageMogr2%2Fthumbnail%2F%21300x190r%2Fgravity%2FCenter%2Fcrop%2F%21300x190%2Fquality%2F90', 'https://p1-q.mafengwo.net/s9/M00/EC/F3/wKgBs1hSSnKASeBNAAE5uaNVGWw44.jpeg?imageMogr2%2Fthumbnail%2F%21300x190r%2Fgravity%2FCenter%2Fcrop%2F%21300x190%2Fquality%2F90', 'https://e0.ifengimg.com/01/2018/1127/35FE661ADD298C9ED47DC836DE1D1F83D084A766_size204_w2048_h1205.jpeg', 'https://p1-q.mafengwo.net/s18/M00/D1/C3/CoUBYGF1VFSAXNPZAA5MDvfeWrk01.jpeg?imageMogr2%2Fthumbnail%2F%21300x190r%2Fgravity%2FCenter%2Fcrop%2F%21300x190%2Fquality%2F90', 'https://p1-q.mafengwo.net/s2/M00/31/52/wKgBpU7oXCC4_OUIAAEHJVkxWzk43.jpeg?imageMogr2%2Fthumbnail%2F%21300x190r%2Fgravity%2FCenter%2Fcrop%2F%21300x190%2Fquality%2F90', 'https://p1-q.mafengwo.net/s15/M00/39/4F/CoUBGV5xlQ6APRFCAA0WPOeCmHg435.jpg?imageMogr2%2Fthumbnail%2F%21300x190r%2Fgravity%2FCenter%2Fcrop%2F%21300x190%2Fquality%2F90', 'https://p1-q.mafengwo.net/s10/M00/57/1F/wKgBZ1jiFt6AHRR4AA30iEIt3Dw58.jpeg?imageMogr2%2Fthumbnail%2F%21300x190r%2Fgravity%2FCenter%2Fcrop%2F%21300x190%2Fquality%2F90'];

    const titleResults = ['宏村蒙古奶茶 ', '居善堂官邸私厨', '一楼食业·老街第一楼', '老谢徽菜馆', '汪一挑馄饨(老街店)', '大傻徽菜园·中国徽菜大师', '好再来烧饼', '宏村1983徽菜馆', '醉九华董家小厨徽宜饭店', '老胡子徽菜馆(太平店)', '小厨王徽菜(黄山店)', '宰相食府', '耿福兴(步行街店)', '自游人特色美食一楼'];

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

export default FoodEG;

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