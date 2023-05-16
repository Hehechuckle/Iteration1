import React from 'react';
import { Image, StyleSheet, View, Dimensions } from 'react-native';

export default function MyScreen() {
  const windowHeight = Dimensions.get('window').height;
  const imageAspectRatio = 2 / 1; // Example aspect ratio, replace with your own.
  const imageWidth = windowHeight * imageAspectRatio;

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/icon/wombat_page.png')} style={[styles.image, {width: imageWidth, height: '85%',left:5}]} resizeMode="contain"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height:'100%',
    borderWidth: 1,
    
  }
});
