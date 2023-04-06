import React from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import { Link, Tabs, useRouter } from 'expo-router';

export default function KoalaInfoScreen() {

    const router = useRouter();
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Kangaroo</Text>
        <Image source={require('../assets/images/kangaroo.png')} style={styles.image} />
        <Text style={styles.text}>Kangaroos are incredible animals known for their strong legs that allow them to jump amazing distances.
         They're the only large animals that get around mainly by hopping! Kangaroos are plant-eaters and enjoy snacking on grasses,
          leaves, and fruits. They're social animals and hang out in groups called mobs. You can find kangaroos in a variety of habitats,
           such as grasslands, forests, and deserts.</Text>
        <View style={styles.verticalSpacer} />
        <Button onPress={()=> router.back()} title= "Go Back" />

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
  container1: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFCC', 
    width: 200, 
    height: 100,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});