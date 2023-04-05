import React from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import { Link, Tabs, useRouter } from 'expo-router';

export default function KoalaInfoScreen() {

    const router = useRouter();
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Koala</Text>
        <Image source={require('../assets/images/kangaroo.png')} style={styles.image} />
        <Text style={styles.text}>kangaroo are four marsupials from the family Macropodidae. In common use 
        the term is used to describe the largest species from this family, the red kangaroo, 
        as well as the antilopine kangaroo, eastern grey kangaroo, and western grey kangaroo. 
        Kangaroos are indigenous to Australia and New Guinea.</Text>

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