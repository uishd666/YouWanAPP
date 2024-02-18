/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Card, Button, Grid, Tabs } from '@ant-design/react-native';

const EnvJson = [
    { img: require('../../android/app/src/main/res/drawable/media/icons/activity/windforce.png'), title: '风力等级', data: '1级' },
    { img: require('../../android/app/src/main/res/drawable/media/icons/activity/pm25.png'), title: 'PM2.5', data: '37ug/m' },
    { img: require('../../android/app/src/main/res/drawable/media/icons/activity/humidity.png'), title: '湿度', data: '61%' },
    { img: require('../../android/app/src/main/res/drawable/media/icons/activity/airpressure.png'), title: '气压', data: '1hpa' },
    { img: require('../../android/app/src/main/res/drawable/media/icons/activity/out.png'), title: '出行', data: '良' },
    { img: require('../../android/app/src/main/res/drawable/media/icons/activity/airpollution.png'), title: '空气污染', data: '60' },
];

const TripJson = [
    { img: require('../../android/app/src/main/res/drawable/media/icons/activity/clothes.png'), title: '穿衣', data: '初冬装' },
    { img: require('../../android/app/src/main/res/drawable/media/icons/activity/glasses.png'), title: '防晒', data: 'SPF>15' },
    { img: require('../../android/app/src/main/res/drawable/media/icons/activity/hills.png'), title: '旅游', data: '适宜' },
    { img: require('../../android/app/src/main/res/drawable/media/icons/activity/ball.png'), title: '运动', data: '较适宜' },
    { img: require('../../android/app/src/main/res/drawable/media/icons/activity/fish.png'), title: '钓鱼', data: '不适宜' },
    { img: require('../../android/app/src/main/res/drawable/media/icons/activity/car.png'), title: '洗车', data: '较适宜' },
];

export default class Activity extends React.Component<any, any> {

    EnvData = EnvJson.map((item) => ({
        icon: <View style={styles.EnvContainer}>
            <Image source={item.img} style={styles.EnvIcon} />
            <View style={styles.EnvText}>
                <Text style={{ fontSize: 18 }}>{item.title}</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.data}</Text>
            </View>
        </View>,
    }));

    TripData = TripJson.map((item) => ({
        icon: <View style={styles.EnvContainer}>
            <Image source={item.img} style={styles.EnvIcon} />
            <View style={styles.EnvText}>
                <Text style={{ fontSize: 18 }}>{item.title}</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.data}</Text>
            </View>
        </View>,
    }));

    state = {
        txt: '',
        plans: [],
        cnt: 0,
    };

    textInputRef = React.createRef();

    AddTodo = () => {
        this.textInputRef.current.clear();
        if (this.state.txt.trim() === '') return;
        this.setState({ plans: [this.state.txt, ...this.state.plans], cnt: this.state.cnt + 1, txt: '' });
    };

    render(): React.ReactNode {
        const twoData = [
            {
                icon: <View style={styles.twoContainer}>
                    <Text style={styles.twoText}>服务导航</Text>
                    <Image source={require('../../android/app/src/main/res/drawable/media/icons/map.png')} style={styles.twoIcon} />
                </View>,
            },
            {
                icon: <View style={styles.twoContainer}>
                    <Text style={styles.twoText}>在线咨询</Text>
                    <Image source={require('../../android/app/src/main/res/drawable/media/icons/consult.png')} style={styles.twoIcon} />
                </View>,
            }
        ];

        const tabs = [
            { title: '环境检测' },
            { title: '旅游舒适度' },
        ]
        return (
            <View>
                <Text style={styles.title}>出行</Text>
                <ScrollView>
                    <Card full>
                        <Card.Body>
                            <View style={{ height: 200, flexGrow: 1 }}>
                                <Image source={require('../../android/app/src/main/res/drawable/media/images/home/bg1.jpg')} resizeMode="cover" style={{ flex: 1, width: '100%' }} />
                            </View>
                        </Card.Body>
                        <Card.Footer
                            content={<TouchableOpacity style={{ alignItems: 'flex-start' }}><Text style={{ fontWeight: 'bold' }}>我的行程</Text></TouchableOpacity>}
                            extra={<TouchableOpacity onPress={() => console.log('全部计划')} style={{ alignItems: 'flex-end' }}><Text>全部计划</Text></TouchableOpacity>}
                        />
                    </Card>
                    <View style={styles.buttonContainer}>
                        <TextInput
                            ref={this.textInputRef}
                            style={styles.planInput}
                            placeholder="请输入新的计划！"
                            onChangeText={(text) => {
                                this.setState({ txt: text });
                            }}
                        />
                        <Button type="primary" onPress={this.AddTodo}>
                            <Text style={{ fontSize: 15, color: 'white' }}>
                                + 新增计划
                            </Text>
                        </Button>
                        {
                            this.state.plans.slice(0, 3).map((plan, idx) => (
                                <View key={idx}>
                                    <Text>
                                        {plan}
                                    </Text>
                                </View>
                            ))
                        }
                    </View>
                    <View style={{ height: 50, margin: 15 }}>
                        <Text style={{ marginBottom: 10, fontSize: 17, fontWeight: 'bold' }}>我的计划</Text>
                        <Text>用心探索每一座城市</Text>
                    </View>
                    <View style={{ width: '100%', backgroundColor: 'grey', height: 5 }} />
                    <Grid
                        data={twoData}
                        columnNum={2}
                        itemStyle={{ height: 80, marginHorizontal: 15, marginTop: 20 }}
                        hasLine={false}
                    />
                    <Tabs tabs={tabs}>
                        <View>
                            <Grid
                                data={this.EnvData}
                                columnNum={2}
                                hasLine={false}
                                itemStyle={{ height: 100 }}
                            />
                        </View>
                        <View>
                            <Grid
                                data={this.TripData}
                                columnNum={2}
                                hasLine={false}
                                itemStyle={{ height: 100 }}
                            />
                        </View>
                    </Tabs>
                    <Text>/n/n</Text>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        margin: 10,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    planInput: {
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: 'gray',
        width: Dimensions.get('screen').width,
        margin: 10,
        paddingHorizontal: 20,
    },
    twoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        backgroundColor: '#74c3ff',
        borderRadius: 10,
    },
    twoIcon: {
        width: 40,
        height: 40,
        marginHorizontal: 15,
    },
    twoText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    EnvContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        borderRadius: 10,
    },
    EnvIcon: {
        height: 40,
        width: 40,
        marginLeft: 40,
    },
    EnvText: {
        marginLeft: 25,
    }
})