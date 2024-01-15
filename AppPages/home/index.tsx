/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Alert, View, StyleSheet, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SearchBar, Carousel, NoticeBar, Tabs } from '@ant-design/react-native';
import ImageContainer from '../components/homepage/ImageContainer';
import Options from '../components/homepage/Options';

// const renderContent = (tab: any, index: any) => {
//   const style = {
//     paddingVertical: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 10,
//     backgroundColor: '#ddd',
//   }
//   const content = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
//     return (
//       <View key={`${index}_${i}`} style={style}>
//         <Text>
//           {tab.title} - {i}
//         </Text>
//       </View>
//     )
//   })
//   return (
//     <ScrollView key={index} style={{ backgroundColor: '#fff' }}>
//       {content}
//     </ScrollView>
//   )
// }

export default class Home extends React.Component<any, any> {
  carousel: Carousel | null;
  state = {
    value: '',
    selectedIndex: 1,
    autoplay: true,
  };

  onChange = (value: any) => {
    this.setState({ value });
  };


  onHorizontalSelectedIndexChange = (index: number) => {
    this.setState({ selectedIndex: index })
  }

  render() {
    const whiteNoticeIcon = (<></>);
    const tabs = [
      { title: '景区' },
      { title: '酒店' },
      { title: '美食' },
      { title: '商城' },
    ];
    return (
      <View style={styles.container}>
        <Text style={styles.title}>旅游</Text>
        <View style={styles.mainBody}>
          <ScrollView>
            <View style={{ position: 'relative' }}>
              <Carousel
                style={styles.wrapper}
                selectedIndex={this.state.selectedIndex}
                autoplay
                infinite
                afterChange={this.onHorizontalSelectedIndexChange}
              // ref={(ref) => (this.carousel = ref)}
              >
                <View
                  style={[styles.containerHorizontal]}>
                  <Image source={require('../media/images/home/bg1.jpg')} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
                </View>
                <View
                  style={[styles.containerHorizontal]}>
                  <Image source={require('../media/images/home/bg2.jpg')} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
                </View>
                <View
                  style={[styles.containerHorizontal]}>
                  <Image source={require('../media/images/home/bg3.jpg')} resizeMode="cover" style={{ width: '100%', height: '100%' }} />
                </View>
              </Carousel>
            </View>
            <View style={styles.searchBarContainer}>
              <SearchBar
                value={this.state.value}
                onSubmit={(value: any) => Alert.alert(value)}
                onCancel={() => { this.setState({ value: '' }) }}
                onChange={this.onChange}
                placeholder='搜一搜'
                style={{ display: 'flex' }}
              />
            </View>
            <NoticeBar action={<></>} icon={whiteNoticeIcon} style={styles.notice}><Text style={{ color: 'green' }}>一则通知~~</Text></NoticeBar>
            <Options />

            <Tabs
              tabs={tabs}
              renderTabBar={(tabProps) => (
                <View
                  style={{
                    paddingHorizontal: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                  }}>
                  {tabProps.tabs.map((tab, i) => (
                    // change the style to fit your needs
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
                      }}>
                      <Text
                        style={{
                          color: tabProps.activeTab === i ? 'green' : '#333333',
                        }}>
                        {tab.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}>
              <View >
                {/* <Image source={require('../media/images/home/bg1.jpg')} /> */}
                <ImageContainer />
              </View>
              <View >
                <Text>Content of Second Tab</Text>
              </View>
              <View >
                <Text>Content of Third Tab</Text>
              </View>
              <View >
                <Text>Content of fourth Tab</Text>
              </View>
            </Tabs>

            {/* <ImageContainer /> */}
          </ScrollView>
        </View>
      </View>
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
})
