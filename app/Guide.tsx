import React, { Component } from 'react'
import { Text, View, Image, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'

const { width } = Dimensions.get('window')

const styles = {
  wrapper: {},

  pageContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  image: {
    width: '100%',
    flex: 1, // Added this
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  paginationText: {
    color: 'green',
    fontSize: 20
  }
}

const renderPagination = (index, total, context) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{ color: 'grey' }}>
        <Text style={styles.paginationText}>{index + 1}</Text>/{total}
      </Text>
    </View>
  )
}

export default class extends Component {
  render() {
    return (
        <View style={styles.pageContainer}>
            <Swiper
                style={styles.wrapper}
                renderPagination={renderPagination}
                loop={false}
            >   
                <View
                style={styles.slide}
                >
                <Image style={styles.image} source={require('../assets/images/Guide1.png')} resizeMode="contain" />
                </View>
                <View
                style={styles.slide}
                >
                <Image style={styles.image} source={require('../assets/images/Guide2.png')} resizeMode="contain" />
                </View>
                <View
                style={styles.slide}
                >
                <Image style={styles.image} source={require('../assets/images/Guide3.png')} resizeMode="contain" />
                </View>
                <View
                style={styles.slide}
                >
                <Image style={styles.image} source={require('../assets/images/Guide4.png')} resizeMode="contain" />
                </View>
            </Swiper>

        </View>

    )
  }
}
