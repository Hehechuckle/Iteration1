import React from 'react';
import { Image, StyleSheet, View, Dimensions } from 'react-native';
import { Stack} from "expo-router";

export default function MyScreen() {
  const windowHeight = Dimensions.get('window').height;
  const imageAspectRatio = 2 / 1;
  const imageWidth = windowHeight * imageAspectRatio;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: " ",
        }}
      />
      <Image source={require('../assets/images/icon/platypus_page.png')} style={[styles.image, {width: imageWidth, height: '85%',left:5}]} resizeMode="contain"/>
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
