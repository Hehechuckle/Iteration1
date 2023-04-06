import React from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import { Link, Tabs, useRouter } from 'expo-router';

export default function KoalaInfoScreen() {

    const router = useRouter();
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Echidnas</Text>
        <Image source={require('../assets/images/echidnas.png')} style={styles.image} />
        <Text style={styles.text}>
        Echidnas are fascinating animals that have a spiky, prickly appearance and a long, sticky tongue. They're
        also known as spiny anteaters because they love to eat ants and termites. Echidnas are very special creatures
        with spines covering their bodies that keep them safe from predators. They can even roll up into a ball to
        protect themselves even more! Echidnas are skilled diggers too, using their strong legs and sharp claws
        to dig deep into the ground.
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