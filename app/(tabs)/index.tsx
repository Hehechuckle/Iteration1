import { ImageBackground, Image, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';

// function QuarterCircle() {
//   return (
//     <View style={styles.quarterCircle}>
//       <View style={styles.quarterCircleInner} />
//     </View>
//   );
// }

export default function TabOneScreen() {
  return (
    <View style={styles.background}>
      <Image style={styles.image} source={require('../../assets/images/koala.png')} />
      {/* <QuarterCircle /> */}
      <View style={styles.container}>
        <Text style={styles.title}>Wildlife Mapper</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={styles.text}>What do you know about the</Text>
        <Text style={styles.text}>native animal</Text>
        <Image source={require('../../assets/images/koala.png')}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  image: {
    position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quarterCircle: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 100,
  },
  quarterCircleInner: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    height: 100,
    borderTopLeftRadius: 100,
    backgroundColor: 'purple',
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

