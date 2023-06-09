import React from 'react';
import { Image, StyleSheet, Text, View, ImageBackground, SafeAreaView, Linking, TouchableOpacity, Dimensions} from 'react-native';
import { Link, Tabs } from 'expo-router';
import Carousel from 'react-native-snap-carousel';
import { getDocs, collection, onSnapshot, addDoc, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import moment from 'moment';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const carouselItems = [
      {
        image: require('../../assets/images/hotspots/koala1.png'),
      },
      {
          image: require('../../assets/images/hotspots/echidna1.png'),
        },
      {
        image: require('../../assets/images/hotspots/kangaroo1.png'),
      },
      {
          image: require('../../assets/images/hotspots/wallaby1.png'),
        },
      {
        image: require('../../assets/images/hotspots/wombat1.png'),
      },
      {
          image: require('../../assets/images/hotspots/platypus.png'),
        },
      {
       image: require('../../assets/images/hotspots/koala2.png'),
      },
      {
          image: require('../../assets/images/hotspots/echidna2.png'),
        },
      {
       image: require('../../assets/images/hotspots/kangaroo2.png'),
      },
      {
          image: require('../../assets/images/hotspots/koala3.png'),
        },
      {
       image: require('../../assets/images/hotspots/wallaby3.png'),
      },
      {
        image: require('../../assets/images/hotspots/wombat2.png'),
      },
        {
          image: require('../../assets/images/hotspots/koala4.png'),
        },
        {
          image: require('../../assets/images/hotspots/kangaroo3.png'),
        },
        {
          image: require('../../assets/images/hotspots/wombat3.png'),
        },
        {
          image: require('../../assets/images/hotspots/koala5.png'),
        },
        {
          image: require('../../assets/images/hotspots/kangaroo4.png'),
        },
        {
          image: require('../../assets/images/hotspots/wombat4.png'),
        },
        {
          image: require('../../assets/images/hotspots/koala6.png'),
        },
        {
          image: require('../../assets/images/hotspots/echidna3.png'),
        },
];

interface animal {
    id: string;
    name: string;
    sciname: string;
    date: string;
    latitude: number;
    longitude: number;
    fact: string;
  }

export default class TabTwoScreen extends React.Component {
  
  
  constructor(props){
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: carouselItems,
      recordData: [] 
    }
  }

  

  _renderItem({item,index}){
    return (
      <View style={{
        borderRadius: 5,
        height: windowHeight * 0.15,
        top:60,
        marginLeft: 15,
        marginRight: 35, }}>
        <Image source={item.image} style={{width: '100%', height: '100%'}} resizeMode='contain' />
      </View>
    )
  }

    async getRecord() {
        const q = query(collection(db, "Animals2.6"), where("fact", "==", "User Record"));
        const querySnapshot = await getDocs(q);
    
        // Array to store the records
        let records = [];
    
        querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        const dateObj = moment(data.date, "h:mma - DD/MM/YYYY");
    
        records.push({
            ...data,
            date: dateObj
        });
        });

        records.sort((a, b) => b.date - a.date);
    
        records = records.slice(0, 3);
  

        this.setState({ recordData: records });
    }
    
    componentDidMount() {
        this.getRecord();
    }


  render() {

    const recordIcon = (animalName: string) => {
        switch (animalName) {
          case 'Eastern Grey Kangaroo':
            return require('../../assets/images/icon/kangaroo2.png');
          case 'Koala':
            return require('../../assets/images/icon/koala2.png');
          case 'Platypus':
            return require('../../assets/images/icon/platypus2.png');
          case 'Short-beaked Echidna':
            return require('../../assets/images/icon/echidna2.png');
          case 'Swamp Wallaby':
            return require('../../assets/images/icon/wallaby2.png');
          case 'Common Wombat':
            return require('../../assets/images/icon/wombat2.png');
          default:
            return require('../../assets/images/icon/koala2.png'); 
        }
      };

    return (
      <ImageBackground
        source={require('../../assets/images/background1.png')}
        style={styles.loadingImage}>
          <View style={styles.container}>

            <View style={styles.guideContainer}>
              <Link href="/Guide" style={styles.link}>
                <Image source={require('../../assets/images/guide.png')} style={{...styles.guideImage, width: windowWidth * 0.95, height: windowHeight * 0.12}} resizeMode='contain' />
              </Link>
            </View>

            <View style={styles.hotspotContainer}>
                <ImageBackground source={require('../../assets/images/spot1.png')} style={styles.hotspotImage} resizeMode='contain'>
                <Carousel
                    layout={"default"} 
                    ref={ref => this.carousel = ref}
                    data={this.state.carouselItems}
                    sliderWidth={windowWidth}
                    itemWidth={windowWidth*0.95}
                    renderItem={this._renderItem}
                    onSnapToItem = { index => this.setState({activeIndex:index}) }
                    contentContainerCustomStyle={{ paddingVertical: 0 }}  
                />
                </ImageBackground>
            </View>

            <View style={styles.recentContainer}>
                <ImageBackground source={require('../../assets/images/spot.png')} style={styles.recentImage} resizeMode='contain'>
                {this.state.recordData.map((record, index) => (
                    <View key={index} style={styles.record}>
                        <Text style={styles.recordText}>{record.name} {'\n'}{moment(record.date).locale('en').format('h:mm a - DD/MM/YYYY')}</Text> 
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity
                                style={{ marginRight: 10, marginTop: 8 }}
                                onPress={() => {
                                    let url = `http://maps.google.com/?q=${record.latitude},${record.longitude}`;

                                    Linking.canOpenURL(url)
                                        .then((supported) => {
                                            if (supported) {
                                                return Linking.openURL(url);
                                            } else {
                                                console.log(`Don't know how to open URL: ${url}`);
                                            }
                                        })
                                        .catch((err) => console.error('An error occurred', err));
                                }}>
                                <Image source={require('../../assets/images/icon/location3.png')} style={styles.icon} />
                            </TouchableOpacity>
                            <Image source={recordIcon(record.name)} style={styles.icon} />
                        </View>
                    </View>
                ))}         
                </ImageBackground>
            </View>
          </View>
      </ImageBackground>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: 'relative',
    alignItems: 'center',
	  justifyContent: 'center',
    paddingHorizontal: '8%',
    // paddingVertical: '12%',
  },
  guideImage: {
    resizeMode: 'contain',
    alignItems: 'center',
  },

  link: {
    width: '110%',
    height: '110%',
    // position: 'absolute',
    top: 150,
    left: '1.5%'
  },

  hotspotImage:{
    width: '100%',
    height: '100%',
  },

  recentImage:{
    width: '100%',
    height: '100%',
  },

  guideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },

  hotspotContainer: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.25,
    top: '-40%',
    left: '1%'
  },

  recentContainer: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.4,
    position: 'absolute',
    top: '57%',
    left: '4%'
  },

  verticalSpacer: {
    height: 20,
  },

  loadingImage: {
    width: '100%',
    height: '100%',
  },

  record: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.07,
    top: '20%',
    left: '0%', 
	  paddingVertical: 10, 
	  paddingHorizontal: 20, 
	  borderRadius: 20, 
	  alignItems: 'center',
	  margin: 5,
	  flexDirection: 'row', 
    justifyContent: 'space-between', 
  },

  recordText: {
    color: 'black', 
    fontSize: 16, 
    fontWeight: 'bold',
    },
    
  icon: {
    width: 50,  
    height: 50, 
    resizeMode: 'contain', 
  },

});