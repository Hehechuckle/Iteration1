import React from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import { Link, Tabs, useRouter } from 'expo-router';

export default function KoalaInfoScreen() {

    const router = useRouter();
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Swamp Wallaby</Text>
        <Text style={styles.text}>
        <Text style={{ fontStyle: 'italic' }}>(Wallabia bicolor)</Text>
        </Text>
        <Image source={require('../assets/images/wallaby.png')} style={styles.image} />
        <Text style={styles.text}>Avg. Weight: 15kg</Text>
        <Text style={styles.text}>Avg. Height: 73cm</Text>
        <Text style={styles.text}>Top Speed: 70km/h</Text>
        <Text style={styles.text}>Life Span: 15+ years{'\n'}</Text>
        <Text style={[styles.text, {textAlign: 'left'}]}>
        Swamp Wallabies are most active at night and have eyes well adapted to low light.{'\n\n'}
        Diet: Swamp Wallabies feed on grasses, leaves, bark, and shrubs.​{'\n\n'}
        Population: 10,000 (Near Threatened)
        </Text>

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