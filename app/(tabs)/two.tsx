import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Link, Tabs } from 'expo-router';

export default function TabTwoScreen() {
  const handleImageClick = () => {
      console.log('Image clicked!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>       Native Australian Species</Text>
      <View style={styles.verticalSpacer} />
      <View style={styles.rowContainer}>
        <View style={styles.row}>
          <Link href="/koala" style={styles.link}>
            <Image source={require('../../assets/images/icon/koala.png')} style={styles.image} />
        </Link>
      </View>
      <View style={styles.row}>
        <Link href="/kangaroo" style={styles.link}>
          <Image source={require('../../assets/images/icon/kangaroo.png')} style={styles.image} />
        </Link>
      </View>
    </View>
    <View style={styles.rowContainer}>
      <View style={styles.row}>
        <Link href="/wallaby" style={styles.link}>
          <Image source={require('../../assets/images/icon/wallaby.png')} style={styles.image} />
        </Link>
      </View>
      <View style={styles.row}>
        <Link href="/platypus" style={styles.link}>
          <Image source={require('../../assets/images/icon/platypus.png')} style={styles.image} />
        </Link>
      </View>
    </View>
      <View style={styles.rowContainer}>
        <View style={styles.row}>
          <Link href="/wombats" style={styles.link}>
            <Image source={require('../../assets/images/icon/wombat.png')} style={styles.image} />
          </Link>
        </View>
        <View style={styles.row}>
          <Link href="/echidnas" style={styles.link}>
            <Image source={require('../../assets/images/icon/echidna.png')} style={styles.image} />
          </Link>
        </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 60,
  },
  rowContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  row: {
    backgroundColor: '#F9D162',
    width: 180,
    height: 200,
    borderRadius: 60,
    paddingHorizontal: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 0,
  },
  link: {
    width: 180,
    height: 180,
    left: 40,
		top: 0,
    position: 'absolute',
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color:'#21C392',
  },
  verticalSpacer: {
    height: 20,
  },
});

