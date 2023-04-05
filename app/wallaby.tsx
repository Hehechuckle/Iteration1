import React from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import { Link, Tabs, useRouter } from 'expo-router';

export default function KoalaInfoScreen() {

    const router = useRouter();
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Wallaby</Text>
        <Image source={require('../assets/images/wallaby.png')} style={styles.image} />
        <Text style={styles.text}>A wallaby is a small or middle-sized macropod native to
         Australia and New Guinea, with introduced populations in New Zealand Hawaii, the
         United Kingdom and other countries. They belong to the same taxonomic family as 
         kangaroos and sometimes the same genus, but kangaroos are specifically categorised
         into the four largest species of the family.
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