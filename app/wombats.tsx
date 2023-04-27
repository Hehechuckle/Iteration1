import React from 'react';
import { Image, StyleSheet, Text, View, Button} from 'react-native';
import { Link, Tabs, useRouter } from 'expo-router';

export default function KoalaInfoScreen() {

    const router = useRouter();
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Wombats</Text>
        <Text style={styles.text}>
          <Text style={{ fontStyle: 'italic' }}>(Vombatus Ursinus)</Text>
        </Text>
        <Image source={require('../assets/images/wombat.png')} style={styles.image} />
        <Text style={styles.text}>Avg. Weight: 27kg</Text>
        <Text style={styles.text}>Avg. Length: 100cm</Text>
        <Text style={styles.text}>Top Speed: 40km/h</Text>
        <Text style={styles.text}>Life Span: 15+ years{'\n'}</Text>
        <Text style={[styles.text,{ textAlign: 'left' }]}>Wombats have a thick and tough hide that protects them from predators.​{'\n\n'}
        Diet: Common Wombats feed mainly on grasses, roots, and bark. ​{'\n\n'}
        Population: 433,000 (Least Concern)
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
    height : 250,
    width: 375, 

  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});

