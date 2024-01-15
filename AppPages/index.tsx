/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { TabBar } from '@ant-design/react-native';
import Home from './home';
import Activity from './activity';
import Trip from './trip';
import Guidance from './guidance';
import Personal from './personal';

export default class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedTab: 'home',
        };
    }

    childrenList: { [key: string]: any } = {
        'home': <Home />,
        'activity': <Activity />,
        'guidance': <Guidance />,
        'trip': <Trip />,
        'personal': <Personal />,
    };

    renderContent(pageText: any) {
        return (
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                <Text style={{ margin: 50 }}>{pageText}</Text>
            </View>
        );
    }

    onChangeTab(tabName: string) {
        this.setState({
            selectedTab: tabName,
        });
    }

    render() {
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="#f5f5f5">
                <TabBar.Item
                    title="首页"
                    icon={<Image style={styles.icons} source={require('./media/icons/home.png')} />}
                    selected={this.state.selectedTab === 'blueTab'}
                    onPress={() => this.onChangeTab('blueTab')}>
                    {this.childrenList.home}
                </TabBar.Item>
                <TabBar.Item
                    icon={<Image style={styles.icons} source={require('./media/icons/activity.png')} />}
                    title="活动"
                    selected={this.state.selectedTab === 'activity'}
                    onPress={() => this.onChangeTab('activity')}>
                    {this.childrenList[this.state.selectedTab]}
                </TabBar.Item>
                <TabBar.Item
                    icon={<Image style={styles.icons} source={require('./media/icons/guidance.png')} />}
                    title="全城导览"
                    selected={this.state.selectedTab === 'guidance'}
                    onPress={() => this.onChangeTab('guidance')}>
                    {this.childrenList[this.state.selectedTab]}
                </TabBar.Item>
                <TabBar.Item
                    icon={<Image style={styles.icons} source={require('./media/icons/trip.png')} />}
                    title="出行"
                    selected={this.state.selectedTab === 'trip'}
                    onPress={() => this.onChangeTab('trip')}>
                    {this.childrenList[this.state.selectedTab]}
                </TabBar.Item>
                <TabBar.Item
                    icon={<Image style={styles.icons} source={require('./media/icons/personal.png')} />}
                    title="我的"
                    selected={this.state.selectedTab === 'personal'}
                    onPress={() => this.onChangeTab('personal')}>
                    {this.childrenList[this.state.selectedTab]}
                </TabBar.Item>
            </TabBar>
        );
    }
}

const styles = StyleSheet.create({
    appBar: {
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
    },

    icons: {
        width: 25,
        height: 25,
    },
});