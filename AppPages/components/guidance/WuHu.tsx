/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Animated, Dimensions, Text, TouchableOpacity, Image } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const dict = {
    Empty: 0,
    YaShanDiZhi: 1,
    HuangJinTa: 2,
};
const contentJson = [
    { title: '资料暂未添加', contact: '', content: '敬请期待~', img: require('../../../android/app/src/main/res/drawable/media/images/guidance/敬请期待.jpg') },

    { title: '固镇县垓下遗址公园', contact: '0552-6856888', content: '\t垓下，俗称霸王城，位于今固镇县濠城沱河南岸。\n\t公元前202年，汉王刘邦率诸侯兵三十万，追击西楚霸王项羽，同年十二月，项羽十万大军被包围于垓下，被迫与刘邦决一死战。垓下之战，楚军阵亡四万，被俘两万，汉军以绝对优势兵力全歼楚军，创造了中国古代大规模追击战的成功战例，被列为世界著名古代七大战役之一，有“东方滑铁卢”之誉。\n\t据专家考证，垓下霸王城呈不太规则的四方形，城拐角处均构筑成弧形。城北濒临沱河（古称洨水），城东、南、西三面开掘有护城河，当初的霸王城其实只是一座土筑的营垒，地势偏高，四面环水，作为军事要塞易守难攻。\n\t城中，秦砖汉瓦遍地可寻。汉井、汉墓、汉桥、古树“榆抱桑”、虞姬梳妆台、铜帮铁底河、韩信点将台等古老而又璀璨的人文景观，伴随着“十面埋伏”、“四面楚歌”、“霸王别姬”的故事、相融相伴，令人神往。', img: require('../../../android/app/src/main/res/drawable/media/images/guidance/垓下.jpg') },

    { title: '黄金塔', contact: '', content: '    黄金塔，位于安徽省芜湖市无为市无城镇凤河行政村东侧的西河之畔，始建于北宋咸平元年（998年），明清以来有多次修葺，自20世纪80年代后，政府大力支持修复保护。\n    黄金塔呈平面六边形，面阔3.4米，塔高37米，共9层，一二层、二三层之间为双层腰檐，腰檐层层仿木斗拱均为鸳鸯交手，底层半侧设佛龛室，二层内壁东、南、北侧各置一佛龛座，顶部有木质藻井。塔内原有一些建塔碑记，后均散佚。黄金塔是安徽省已知现存佛塔建筑之一，具有宋代仿木楼阁式夸塔的典型特征，是研究中国佛教建筑史的重要实物例证。\n    1981年，黄金塔被安徽省政府定为安徽省重点文物保护单位。 2013年5月，黄金塔被中华人民共和国国务院公布为第七批全国重点文物保护单位。', img: require('../../../android/app/src/main/res/drawable/media/images/guidance/黄金塔.jpg') },
];

const WuHu = () => {
    const scale = useRef(new Animated.Value(1)).current;
    const pan = useRef(new Animated.ValueXY()).current;
    const height = useRef(new Animated.Value(100)).current;

    const [showup, setShowup] = useState(false);
    const [selection, setSelection] = useState(0);

    const handleTouch = (event: any) => {
        if (scale._value < 1.1) {
            const { locationX, locationY } = event.nativeEvent;

            Animated.parallel([
                Animated.spring(scale, {
                    toValue: 2,
                    useNativeDriver: true,
                }),
                Animated.timing(pan, {
                    toValue: { x: -locationX + screenWidth / 2, y: -locationY + 140 },
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(height, {
                    toValue: 100,
                    duration: 10,
                    useNativeDriver: true,
                }),
            ]).start();
            if (Math.abs(locationX - 180) <= 30 && Math.abs(locationY - 258) <= 30) {
                setSelection(dict.YaShanDiZhi);
                setShowup(true);
            }
            else if (Math.abs(locationX - 126) <= 20 && Math.abs(locationY - 55) <= 30) {
                setSelection(dict.HuangJinTa);
                setShowup(true);
            }
            else {
                setSelection(dict.Empty);
                setShowup(true);
            }
        }
        else {
            setShowup(false);
            Animated.parallel([
                Animated.spring(scale, {
                    toValue: 1,
                    useNativeDriver: true,
                }),
                Animated.timing(pan, {
                    toValue: { x: 0, y: 0 },
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(height, {
                    toValue: 500,
                    duration: 10,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    };
    useEffect(() => {
        Animated.timing(height, {
            toValue: 500,
            duration: 10,
            useNativeDriver: true,
        }).start();
    }, []);
    return (
        <>
            <TouchableOpacity style={{ width: screenWidth, flexDirection: 'column' }} activeOpacity={1} onPress={handleTouch}>
                <Animated.Image
                    style={[{
                        width: screenWidth, height: screenWidth,
                    }, {
                        transform: [{ scale }, { translateX: pan.x }, { translateY: pan.y }]
                    }]
                    }
                    source={require('../../media/images/guidance/芜湖.bmp')}
                />
            </TouchableOpacity>
            <Animated.ScrollView
                style={[styles.TextContainer, { height: height._value }]}
            >
                {!showup && <Text style={styles.TextContent}>
                    试试点击图片上的景点
                </Text>}

                {showup && <View>
                    <Text style={styles.TextTitle}>{contentJson[selection].title}</Text>
                    <Text style={styles.TextContact}>{`联系方式  ——  ${contentJson[selection].contact}\n`}</Text>
                    <Image source={contentJson[selection].img} style={styles.TextImg} />
                    <Text style={styles.TextContent}>
                        {contentJson[selection].content}
                        {'\n\n\n'}
                    </Text>
                </View>}
            </Animated.ScrollView>
        </>
    );
};

export default WuHu;

const styles = StyleSheet.create({
    TextContainer: {
        position: 'absolute',
        bottom: 0,
        width: screenWidth,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white',
        zIndex: 999,
    },
    TextTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'black',
    },
    TextContact: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
        alignContent: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    TextContent: {
        fontSize: 20,
        alignContent: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    TextImg: {
        width: screenWidth,
        margin: 10,
    },
})