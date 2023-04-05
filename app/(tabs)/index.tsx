import { ImageBackground, Image, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';


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
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200, 
    height: 200, 
    position: 'absolute',
    borderBottomLeftRadius: 200, 
    top: 0,
    right: 0,
  },
  imageContainer: {
    backgroundColor: '#add8e6', 
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
    backgroundColor: '#FFFFCC', 
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
});

