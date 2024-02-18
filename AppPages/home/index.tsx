/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Alert, View, StyleSheet, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SearchBar, Carousel, NoticeBar, Tabs } from '@ant-design/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Options from '../components/homepage/Options';
import FoodEG from '../components/homepage/FoodEG';
import ImageEG from '../components/homepage/ImageEG';
import HotelEG from '../components/homepage/HotelEG';
import WebView from 'react-native-webview';

export default class Home extends React.Component<any, any> {
  ImageRef: React.RefObject<unknown>;

  constructor(props: any) {
    super(props);
    this.ImageRef = React.createRef();
  }

  carousel: Carousel | null;
  state = {
    value: '',
    selectedIndex: 1,
    autoplay: true,
    activeTab: 0,
    url: '',
    title: '',
  };

  onChange = (value: any) => {
    this.setState({ value });
  };


  onHorizontalSelectedIndexChange = (index: number) => {
    this.setState({ selectedIndex: index })
  }

  whiteNoticeIcon = (<></>);
  tabs = [
    { title: '景区' },
    { title: '酒店' },
    { title: '美食' },
    { title: '商城' },
  ];

  handleTouchOptions = (event) => {

    return () => {
      navigation
    }
  }

  funcMainBody = (props) => {
    const { navigation } = props;
    return (
      <View style={styles.container}>
        <View style={styles.mainBody}>
          <ScrollView
          >
            <View style={{ position: 'relative' }}>
              <Carousel
                style={styles.wrapper}
                selectedIndex={this.state.selectedIndex}
                autoplay
                infinite
                afterChange={this.onHorizontalSelectedIndexChange}
              >
                <View
                  style={[styles.containerHorizontal]}>
                  <Image source={require('../../android/app/src/main/res/drawable/media/images/home/bg1.jpg')} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
                </View>
                <View
                  style={[styles.containerHorizontal]}>
                  <Image source={require('../../android/app/src/main/res/drawable/media/images/home/bg2.jpg')} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
                </View>
                <View
                  style={[styles.containerHorizontal]}>
                  <Image source={require('../../android/app/src/main/res/drawable/media/images/home/bg3.jpg')} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
                </View>
              </Carousel>
            </View>
            <View style={styles.searchBarContainer}>
              <SearchBar
                value={this.state.value}
                onSubmit={(value: any) => Alert.alert(value)}
                onCancel={() => { this.setState({ value: '' }) }}
                onChange={this.onChange}
                placeholder="搜一搜"
                style={{ display: 'flex' }}
              />
            </View>
            <NoticeBar action={<></>} icon={this.whiteNoticeIcon} style={styles.notice}><Text style={{ color: 'green' }}>一则通知~~</Text></NoticeBar>
            <Options onTouch={(url, title) => {
              this.setState({ url: url, title: title });
              navigation.navigate('WebView');
            }}
            />

            <Tabs
              tabs={this.tabs}
              prerenderingSiblingsNumber={0}
              renderTabBar={(tabProps) =>
              (
                <View
                  style={{
                    paddingHorizontal: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                  }}>
                  {tabProps.tabs.map((tab, i) => (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      key={tab.key || i}
                      style={{
                        // width: '20%',
                        padding: 6,
                      }}
                      onPress={() => {
                        const { goToTab, onTabClick } = tabProps
                        // tslint:disable-next-line:no-unused-expression
                        onTabClick && onTabClick(tabs[i], i)
                        // tslint:disable-next-line:no-unused-expression
                        goToTab && goToTab(i)
                        this.setState({ activeTab: i });

                      }}>
                      <Text
                        style={{
                          color: tabProps.activeTab === i ? 'green' : '#333333',
                        }}>
                        {tab.title}
                      </Text>
                    </TouchableOpacity>
                  )
                  )}
                </View>
              )
              }>
              <View >
                <ImageEG />
              </View>
              <View >
                <HotelEG />
              </View>
              <View >
                <FoodEG />
              </View>
              <View >
                <Text>Content of fourth Tab</Text>
              </View>
            </Tabs>
          </ScrollView>
        </View>
      </View>
    )
  }

  stack = createNativeStackNavigator();

  render() {

    return (
      <NavigationContainer>
        <this.stack.Navigator
          initialRouteName='mainBody'
          screenOptions={{
            headerTitleAlign: 'center',
          }}
        >
          <this.stack.Screen
            name='mainBody'
            options={{ title: '主页' }}
          >
            {(props) => <this.funcMainBody {...props} />}
          </this.stack.Screen>
          <this.stack.Screen
            name='WebView'
            options={{ title: this.state.title }}
          >
            {() => <WebView source={{ uri: this.state.url }} />}
          </this.stack.Screen>
        </this.stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  mainBody: {
    flex: 1,
    marginBottom: 30,
  },
  title: {
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    margin: 10,
  },
  wrapper: {
    backgroundColor: '#fff',
    width: '100%',
    height: 200,
  },
  containerHorizontal: {
    flexGrow: 1,
    // height: '100%',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
  },
  searchBarContainer: {
    marginTop: 30,
    marginLeft: 50,
    marginRight: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  notice: {
    backgroundColor: 'rgba(0,255,0,0.1)',
  },
  GridImage: {
    width: '95%',
    height: '65%',
  },
  GridText: {
    fontSize: 15,
    color: 'grey',
  },
})
