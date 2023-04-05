import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Link, Tabs } from 'expo-router';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Link href="/koala" style={styles.link}>
          <Text style={styles.linkText}>koala</Text>
        </Link>
        <Image source={require('../../assets/images/koala.png')} style={styles.image} />
      </View>
      <View style={styles.verticalSpacer} />
      <View style={styles.row}>
        <Link href="/kangaroo" style={styles.link}>
          <Text style={styles.linkText}>kangaroo</Text>
        </Link>
        <Image source={require('../../assets/images/kangaroo.png')} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalSpacer: {
    height: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#FFFFCC',
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 100,
    borderRadius: 60,
  },
  link: {
    flex: 1, 
    alignItems: 'center', 
    borderRadius: 70,
    paddingVertical: 30,
    paddingHorizontal: 30
  },
  linkText: {
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    width: 150,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 60,
    marginLeft: 10,
  },
  text: {
    fontSize: 20,
    color: 'purple',
    textAlign: 'center',
  },
});
