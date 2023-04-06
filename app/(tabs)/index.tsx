import { ImageBackground, Image, StyleSheet, Button } from 'react-native';
import { Text, View} from '../../components/Themed';
import { Link, Tabs, useRouter } from 'expo-router';


export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}> 
        <Image
          source={require('../../assets/images/koala.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.title}>Wildlife Mapper</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.text}>What do you know about the</Text>
      <Text style={styles.text}>native animal</Text>
      <View style={styles.verticalSpacer} />
      <View style={styles.buttonContainer}>
        <Link href="/map" style={styles.link}>
          <Text style={styles.linkText}>Get Start</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 180, 
    height: 180, 
    position: 'absolute',
    borderBottomLeftRadius: 200, 
    top: 0,
    right: 0,
  },
  imageContainer: {
    backgroundColor: '#FFFFCC', 
    borderTopRightRadius: 0, 
    borderBottomRightRadius: 0, 
    borderBottomLeftRadius: 210, 
    borderTopLeftRadius: 0,
    width: 213, 
    height: 213,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', 
  },
  buttonContainer: {
    backgroundColor: '#FFFFCC',
    borderRadius: 20,
    width: 150, 
    height: 60,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'purple',
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    color: 'purple',
    textAlign: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  verticalSpacer: {
    height: 100,
  },
  link: {
    flex: 1, 
    alignItems: 'center', 
    borderRadius: 70,
    paddingVertical: 15,
    paddingHorizontal: 30
  },
  linkText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

