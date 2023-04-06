import React from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import { Link, Tabs, useRouter } from 'expo-router';

export default function KoalaInfoScreen() {

    const router = useRouter();
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Wallaby</Text>
        <Image source={require('../assets/images/wallaby.png')} style={styles.image} />
        <Text style={styles.text}>Wallabies are cute animals that are found in Australia and nearby islands. They're 
        similar to kangaroos but smaller in size. Wallabies are known for their strong legs and powerful tails,
        which help them hop and balance as they move around. Wallabies are herbivores, which means they eat only
        plants. They love munching on grasses, leaves, and other vegetation. Wallabies can be found in various 
        habitats, such as forests, woodlands, and grasslands.
        </Text>
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