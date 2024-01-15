/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Card, Button } from '@ant-design/react-native';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Grid, List } from '@ant-design/react-native';

const InfoJson = {
    avatar: require('../media/images/personal/avatar.png'),
    name: '微信用户', group: '会员俱乐部', level: 1,
};

const OrderJson = [
    { icon: require('../media/icons/personal/affirm.png'), text: '待确认' },
    { icon: require('../media/icons/personal/pay.png'), text: '待付款' },
    { icon: require('../media/icons/personal/consumption.png'), text: '待消费' },
    { icon: require('../media/icons/personal/comment.png'), text: '待点评' },
    { icon: require('../media/icons/personal/refund.png'), text: '退款单' },
];

const OutJson = [
    { icon: require('../media/icons/personal/trip.png'), text: '我的游记' },
    { icon: require('../media/icons/personal/favorite.png'), text: '我的收藏' },
    { icon: require('../media/icons/personal/linkman.png'), text: '常用联系人' },
    { icon: require('../media/icons/personal/address.png'), text: '常用地址' },
    { icon: require('../media/icons/personal/invoice.png'), text: '常用发票' },
    { icon: require('../media/icons/personal/contact.png'), text: '联系我们' },
    { icon: require('../media/icons/personal/hotline.png'), text: '服务热线' },
];

const ListJson = [
    { icon: require('../media/icons/personal/reserve.png'), text: '我的预约' },
    { icon: require('../media/icons/personal/activity.png'), text: '我的活动' },
    { icon: require('../media/icons/personal/complaint.png'), text: '投诉' },
    { icon: require('../media/icons/personal/rescure.png'), text: '一键求救' },
]

export default class Personal extends React.Component<any, any> {
    OrderData = OrderJson.map((item) => ({
        icon: <Image source={item.icon} style={styles.OrderIcon} />,
        text: item.text,
    }));

    OutData = OutJson.map((item) => ({
        icon: <Image source={item.icon} style={styles.OutIcon} />,
        text: item.text,
    }));

    render(): React.ReactNode {
        return (
            <View>
                <Text style={styles.title}>个人中心</Text>
                <ScrollView>
                    <Card full style={{ borderWidth: 0, marginVertical: 15 }}>
                        <Card.Header
                            thumb={<Image source={InfoJson.avatar} style={styles.InfoAvatar} />}
                            title={<View style={styles.InfoContainer}>
                                <View style={styles.InfoTxt}>
                                    <Text style={styles.InfoName}>{InfoJson.name}</Text>
                                    <Text style={styles.InfoLevel}>{`Lv${InfoJson.level}`}</Text>
                                </View>
                                <Text style={styles.InfoGroup}>{InfoJson.group}</Text>
                            </View>}
                        />
                    </Card>
                    <Button type="primary" size="large" style={styles.CouponButton} activeStyle={{ backgroundColor: '#b9e1fe' }} onPress={() => { console.log("5张优惠券") }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'black' }}>5张</Text>
                            <Text style={{ fontSize: 15 }}>优惠券</Text>
                        </View>
                    </Button>
                    <Card style={styles.card}>
                        <Card.Header
                            title={<Text style={styles.CardTitle}>我的订单</Text>}
                            extra={<TouchableOpacity
                                style={{ alignItems: 'flex-end', marginRight: 10 }}
                                onPress={() => { console.log('全部订单') }}
                            >
                                <Text> 全部订单  {'>'} </Text>
                            </TouchableOpacity>}
                        />
                        <Card.Body>
                            <Grid
                                data={this.OrderData}
                                columnNum={5}
                                hasLine={false}
                                onPress={(item, idx) => { console.log(item?.text) }}
                            />
                        </Card.Body>
                    </Card>
                    <Card style={styles.card}>
                        <Card.Header title={<Text style={styles.CardTitle}>出行工具</Text>} />
                        <Card.Body>
                            <Grid
                                data={this.OutData}
                                columnNum={4}
                                hasLine={false}
                                itemStyle={{ height: 85 }}
                                onPress={(item) => { console.log(item?.text) }}
                            />
                        </Card.Body>
                    </Card>

                    <List>
                        {ListJson.map((item, idx) => (
                            <List.Item
                                onPress={() => { console.log(item.text) }}
                                thumb={<Image source={item.icon} style={styles.ListIcon} key={idx} />}
                                extra={<Text style={styles.ListArrow}>{'>'}</Text>}
                            >
                                <Text>{item.text}</Text>
                            </List.Item>
                        ))}
                    </List>

                    <Text>{'\n\n\n'}</Text>
                </ScrollView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 10,
        marginBottom: 20,
    },
    CardTitle: {
        fontWeight: 'bold',
        color: 'black',
    },
    title: {
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        margin: 10,
    },
    InfoContainer: {
        marginLeft: 20,
    },
    InfoAvatar: {
        height: 40,
        width: 40,
        borderRadius: 40,
        marginLeft: 20,
    },
    InfoTxt: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 5,
    },
    InfoName: {
        fontWeight: 'bold',
        fontSize: 17,
        color: 'black',
        marginRight: 10,
    },
    InfoGroup: {
        fontSize: 15,
    },
    InfoLevel: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'blue',
    },
    CouponButton: {
        height: 60,
        margin: 10,
        marginBottom: 20,
        backgroundColor: '#71c2ff',
        borderWidth: 0,
    },
    OrderIcon: {
        width: 35,
        height: 35,
    },
    OutIcon: {
        width: 40,
        height: 40,
    },
    ListIcon: {
        width: 25,
        height: 25,
        marginHorizontal: 10,
    },
    ListArrow: {
        marginRight: 18,
        fontSize: 18,
    },
})