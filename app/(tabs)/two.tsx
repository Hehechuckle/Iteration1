import React from 'react';
import { Image, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Link, Tabs } from 'expo-router';

export default function TabTwoScreen() {
  const handleImageClick = () => {
      console.log('Image clicked!');
  };

  
  return (
    <ImageBackground source={require('../../assets/images/icon/background.png')} style={styles.background} >
      <View style={styles.container}>
      <View style={[styles.rowContainer, { marginTop: 20 }]}>
        <View style={styles.rowContainer}>
          <View style={styles.row}>
            <Link href="/koala" style={styles.link}>
              <Image source={require('../../assets/images/icon/koala_button.png')} style={[styles.image, { width: 380, height: 100}]} resizeMode='contain' />
            </Link>
          </View>
        </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.row}>
            <Link href="/kangaroo" style={styles.link}>
              <Image source={require('../../assets/images/icon/Kangaroo_Button.png')} style={[styles.image, { width: 380, height: 100}]} resizeMode='contain' />
            </Link>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.row}>
            <Link href="/wallaby" style={styles.link}>
              <Image source={require('../../assets/images/icon/Wallaby_button.png')} style={[styles.image, { width: 380, height: 100}]} resizeMode='contain' />
            </Link>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.row}>
            <Link href="/platypus" style={styles.link}>
              <Image source={require('../../assets/images/icon/Platypus_button.png')} style={[styles.image, { width: 380, height: 100}]} resizeMode='contain' />
            </Link>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.row}>
            <Link href="/wombats" style={styles.link}>
              <Image source={require('../../assets/images/icon/Wombat_Button.png')} style={[styles.image, { width: 380, height: 100}]} resizeMode='contain' />
            </Link>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.row}>
            <Link href="/echidnas" style={styles.link}>
              <Image source={require('../../assets/images/icon/Echidna_button.png')} style={[styles.image, { width: 380, height: 100 }]} resizeMode='contain' />
            </Link>
          </View>
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
    paddingHorizontal: 10,
    paddingVertical: 60,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
    alignItems: 'center', 
    
  },
  row: {
    width: 400,
    height: 100,
    borderRadius: 60,
    paddingHorizontal: 10,
    marginLeft: 5,
    marginRight: 5,
    paddingVertical: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    width: 400,
    height: 200,
    left: 0,
    top: 0,
    position: 'absolute',
  },
  image: {
    width: 400,
    height: 200,
    alignItems: 'center',
    marginLeft: 50,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

