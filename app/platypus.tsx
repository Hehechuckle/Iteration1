import React from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import { Link, Tabs, useRouter } from 'expo-router';

export default function KoalaInfoScreen() {

    const router = useRouter();
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Platypus</Text>
        <Text style={styles.text}>
        <Text style={{ fontStyle: 'italic' }}>(Ornithorhynchus anatinus)</Text>
        </Text>
        <Image source={require('../assets/images/platypus.png')} style={styles.image} />
        <Text style={styles.text}>Avg. Weight: 2kg</Text>
        <Text style={styles.text}>Avg. Height: 27cm</Text>
        <Text style={styles.text}>Top Speed: 7km/h</Text>
        <Text style={styles.text}>Life Span: 15+ years{'\n'}</Text>
        <Text style={[styles.text, {textAlign: 'left'}]}>
        Platypuses are venomous mammals with spurs on their hind legs that deliver toxin. {'\n\n'}
        Diet: Platypuses feed on aquatic animals such as crustaceans, larvae, and fish. ​{'\n\n'}
        Population: 300,000 (Vulnerable)
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
    height : 132,
    width: 400,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});