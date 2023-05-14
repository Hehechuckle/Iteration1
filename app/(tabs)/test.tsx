import React from 'react';
import { Image, StyleSheet, Text, View, ImageBackground, SafeAreaView } from 'react-native';
import { Link, Tabs } from 'expo-router';
import Carousel from 'react-native-snap-carousel';

// Add the images you want to display in the carousel
const carouselItems = [
    {
        image: require('../../assets/images/hotspots/koala1.png'),
      },
      {
          image: require('../../assets/images/hotspots/echidna1.png'),
        },
      {
        image: require('../../assets/images/hotspots/kangaroo1.png'),
      },
      {
          image: require('../../assets/images/hotspots/wallaby1.png'),
        },
      {
        image: require('../../assets/images/hotspots/wombat1.png'),
      },
      {
          image: require('../../assets/images/hotspots/platypus.png'),
        },
      {
       image: require('../../assets/images/hotspots/koala2.png'),
      },
      {
          image: require('../../assets/images/hotspots/echidna2.png'),
        },
      {
       image: require('../../assets/images/hotspots/kangaroo2.png'),
      },
      {
          image: require('../../assets/images/hotspots/koala3.png'),
        },
      {
       image: require('../../assets/images/hotspots/wallaby3.png'),
      },
      {
          image: require('../../assets/images/hotspots/wombat2.png'),
        },
        {
          image: require('../../assets/images/hotspots/koala4.png'),
        },
        {
          image: require('../../assets/images/hotspots/kangaroo3.png'),
        },
        {
          image: require('../../assets/images/hotspots/wombat3.png'),
        },
        {
          image: require('../../assets/images/hotspots/koala5.png'),
        },
        {
          image: require('../../assets/images/hotspots/kangaroo4.png'),
        },
        {
          image: require('../../assets/images/hotspots/wombat4.png'),
        },
        {
          image: require('../../assets/images/hotspots/koala6.png'),
        },
        {
          image: require('../../assets/images/hotspots/echidna3.png'),
        },
];

export default class TabTwoScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: carouselItems
    }
  }

  _renderItem({item,index}){
    return (
      <View style={{
        borderRadius: 5,
        height: 250,
        // padding: 50,
        marginTop: 80,
        marginLeft: 15,
        marginRight: 35, }}>
        <Image source={item.image} style={{width: '100%', height: '100%'}} resizeMode='contain' />
      </View>
    )
  }

  render() {
    return (
      <ImageBackground
        source={require('../../assets/images/background1.png')}
        style={styles.loadingImage}>
          <View style={styles.container}>
            <Link href="/modal" style={styles.link}>
                <Image source={require('../../assets/images/guide.png')} style={styles.guideImage} resizeMode='contain'/>
            </Link>

            <View style={styles.hotspotContainer}>
                <ImageBackground source={require('../../assets/images/spot1.png')} style={styles.hotspotImage} resizeMode='contain'>
                  <Carousel
                    layout={"default"} 
                    ref={ref => this.carousel = ref}
                    data={this.state.carouselItems}
                    sliderWidth={400}
                    itemWidth={400}
                    renderItem={this._renderItem}
                    onSnapToItem = { index => this.setState({activeIndex:index}) } />
                </ImageBackground>
            </View>

            <View style={styles.recentContainer}>
                <ImageBackground source={require('../../assets/images/spot.png')} style={styles.hotspotImage} resizeMode='contain'>
                  
                </ImageBackground>
            </View>
          </View>
      </ImageBackground>
    );
  }
}

// Add your styles here

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
	justifyContent: 'center',
  },
  guideImage: {
    width: 400,
    height: 100,
  },

  hotspotImage:{
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },

  link: {
    width: '100%',
    height: 150,
	top: 140,
	position: 'absolute',
    borderRadius: 20, 
	alignItems: 'center',
    left:10
  },

  hotspotContainer: {
    width: '93%',
    height: 300,
    // position: 'absolute',
    top: -60,
    left: 5
  },

  recentContainer: {
    width: '93%',
    height: 300,
    position: 'absolute',
    top: 450,
    left: 18
  },

  verticalSpacer: {
    height: 20,
  },

  loadingImage: {
    width: '100%',
    height: '100%',
  },

  slideImage: {
    width: 300, 
    height: 100, 
    marginRight: 10, 
  },

});

