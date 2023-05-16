import React from 'react';
import { Image, StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { Link, Tabs } from 'expo-router';

export default function TabTwoScreen() {
  const handleImageClick = () => {
      console.log('Image clicked!');
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  
  return (
    <ImageBackground source={require('../../assets/images/icon/background.png')} style={styles.background} >
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <Link href="/koala" style={styles.link}>
            <Image source={require('../../assets/images/icon/koala_button.png')} style={{...styles.image, width: windowWidth * 0.9, height: windowHeight * 0.12}} resizeMode='contain' />
          </Link>
        </View>
        <View style={styles.rowContainer}>
          <Link href="/kangaroo" style={styles.link}>
            <Image source={require('../../assets/images/icon/Kangaroo_Button.png')} style={{...styles.image, width: windowWidth * 0.9, height: windowHeight * 0.12}} resizeMode='contain' />
          </Link>
        </View>
        <View style={styles.rowContainer}>
          <Link href="/wallaby" style={styles.link}>
            <Image source={require('../../assets/images/icon/Wallaby_button.png')} style={{...styles.image, width: windowWidth * 0.9, height: windowHeight * 0.12}} resizeMode='contain' />
          </Link>
        </View>
        <View style={styles.rowContainer}>
          <Link href="/platypus" style={styles.link}>
            <Image source={require('../../assets/images/icon/Platypus_button.png')} style={{...styles.image, width: windowWidth * 0.9, height: windowHeight * 0.12}} resizeMode='contain' />
          </Link>
        </View>
        <View style={styles.rowContainer}>
          <Link href="/wombats" style={styles.link}>
            <Image source={require('../../assets/images/icon/Wombat_Button.png')} style={{...styles.image, width: windowWidth * 0.9, height: windowHeight * 0.12}} resizeMode='contain' />
          </Link>
        </View>
        <View style={styles.rowContainer}>
          <Link href="/echidnas" style={styles.link}>
            <Image source={require('../../assets/images/icon/Echidna_button.png')} style={{...styles.image, width: windowWidth * 0.9, height: windowHeight * 0.12}} resizeMode='contain' />
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: '10%',
    paddingVertical: '12%',
  },
  rowContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  link: {
    width: '110%',
    height: '110%',
    position: 'absolute',
  },
  image: {
    resizeMode: 'contain',
    alignItems: 'center',
  },
});
