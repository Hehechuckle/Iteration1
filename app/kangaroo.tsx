import React from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import { Link, Tabs, useRouter } from 'expo-router';
import * as Font from 'expo-font';
import { useEffect } from 'react';


export default function KoalaInfoScreen() {

  const router = useRouter();
      return (
        <View style={styles.container}>
        <Text style={styles.title}>Kangaroo</Text>
        <Text style={styles.text}>
        <Text style={{ fontStyle: 'italic' }}>(Macropus giganteus)</Text>
        </Text>
        <Image source={require('../assets/images/kangaroo.png')} style={styles.image} />
        <Text style={styles.text}>Avg. Weight: 56kg</Text>
        <Text style={styles.text}>Avg. Height: 1.6cm</Text>
        <Text style={styles.text}>Top Speed: 56km/h</Text>
        <Text style={styles.text}>Life Span: 12+ years{'\n'}</Text>
        <Text style={[styles.text, {textAlign: 'left'}]}>
        Eastern Grey Kangaroos can jump as far as 9m far and 4.5m high in a single leap.​{'\n\n'}
        Diet: Eastern Grey Kangaroos feed mainly on grasses, leaves, and shrubs.​{'\n\n'}
        Population: 1,251,000 (Least Concern).</Text>
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
    width : '100%',
    resizeMode: 'contain',

  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});
