import React from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import { Link, Tabs, useRouter } from 'expo-router';

export default function KoalaInfoScreen() {

    const router = useRouter();
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Koala</Text>
        <Image source={require('../assets/images/koala.png')} style={styles.image} />
        <Text style={styles.text}>Koalas are adorable animals that call Australia their home. They're famous for 
        their round faces, fluffy ears, and love for napping. Koalas are herbivores, which means they eat only 
        plants, and they especially love munching on eucalyptus leaves, which is why they're sometimes called 
        koala bears. Most of the time, koalas spend their days sleeping and lounging in the trees. They have 
        powerful claws that help them climb up and grip onto branches. Koalas are primarily active at night 
        and can be found in various habitats, such as forests, woodlands, and even urban areas.</Text>
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