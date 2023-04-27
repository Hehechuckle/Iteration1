import React from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import { Link, Tabs, useRouter } from 'expo-router';

export default function KoalaInfoScreen() {

    const router = useRouter();
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Koala</Text>
        <Text style={styles.text}>
        <Text style={{ fontStyle: 'italic' }}>(Phascolarctos cinereus)</Text>
        </Text>
        <Image source={require('../assets/images/koala.png')} style={styles.image} />
        <Text style={styles.text}>Avg. Weight: 10kg</Text>
        <Text style={styles.text}>Avg. Height: 73cm</Text>
        <Text style={styles.text}>Top Speed: 20km/h</Text>
        <Text style={styles.text}>Life Span: 18+ years{'\n'}</Text>
        <Text style={[styles.text, {textAlign: 'left'}]}> 
        Koalas sleep for up to 20 hrs a day, often in Eucalyptus trees.​{'\n\n'}
        Diet: Koalas eat eucalyptus leaves, which are toxic to most other animals.​{'\n\n'}
        Population: 80,000 (Endangered)</Text>
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
    height : 300,
    width: 300, 
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});