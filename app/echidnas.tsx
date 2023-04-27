import React from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import { Link, Tabs, useRouter } from 'expo-router';

export default function KoalaInfoScreen() {

    const router = useRouter();
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Echidnas</Text>
        <Text style={styles.text}>
        <Text style={{ fontStyle: 'italic' }}>(Tachyglossus aculeatus)</Text>
        </Text>
        <Image source={require('../assets/images/echidna.png')} style={styles.image} />
        <Text style={styles.text}>Avg. Weight: 5kg</Text>
        <Text style={styles.text}>Avg. Height: 40cm</Text>
        <Text style={styles.text}>Top Speed: 6km/h</Text>
        <Text style={styles.text}>Life Span: 20+ years{'\n'}</Text>
        <Text style={[styles.text, {textAlign: 'left'}]}>
        The short beaked Echidna, is a small, egg-laying mammal with spines.{'\n\n'}
        Diet: Echidnas mainly eat ants and termites.​{'\n\n'}
        Population: 10,000 (Critically Endangered)​​</Text>

        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#F9D162',
  },
  verticalSpacer: {
    height: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  myImageStyle: {
    resizeMode: 'center',
  },

  image: {
    alignSelf: 'center',
    height : 250,
    width: 375, 
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});