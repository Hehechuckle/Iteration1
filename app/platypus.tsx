import React from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import { Link, Tabs, useRouter } from 'expo-router';

export default function KoalaInfoScreen() {

    const router = useRouter();
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Platypus</Text>
        <Image source={require('../assets/images/platypus.png')} style={styles.image} />
        <Text style={styles.text}> Platypus are unique animals that have an unusual appearance, combining features 
        from different animals. They have a bill like a duck, webbed feet like an otter, and fur covering their body
        like a mammal. One of the most unusual things about platypus is that they can lay eggs, which is rare for a
        mammal. Platypus live in rivers and streams and are excellent swimmers, thanks to their webbed feet. They
        feed on small aquatic animals like insects, crustaceans, and fish.
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