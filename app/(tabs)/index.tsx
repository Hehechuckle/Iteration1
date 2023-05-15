import React from 'react';
import { Image, StyleSheet, Text, View, ImageBackground, SafeAreaView, Linking, TouchableOpacity } from 'react-native';
import { Link, Tabs } from 'expo-router';
import Carousel from 'react-native-snap-carousel';
import { getDocs, collection, onSnapshot, addDoc, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import moment from 'moment';

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
        height: 250,
        // padding: 50,
        marginTop: 80,
        marginLeft: 15,
        marginRight: 35, }}>
        <Image source={item.image} style={{width: '100%', height: '100%'}} resizeMode='contain' />
      </View>
    )
  }

    async getRecord() {
        const q = query(collection(db, "Animals2.2"), where("fact", "==", "User Record"));
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
    
        // console.log(records);

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
            <Link href="/modal" style={styles.link}>
                <Image source={require('../../assets/images/guide.png')} style={styles.guideImage} resizeMode='contain'/>
            </Link>

            <View style={styles.hotspotContainer}>
                <ImageBackground source={require('../../assets/images/spot1.png')} style={styles.hotspotImage} resizeMode='contain'>
                  <Carousel
                    layout={"default"} 
                    ref={ref => this.carousel = ref}
                    data={this.state.carouselItems}
                    sliderWidth={400}
                    itemWidth={400}
                    renderItem={this._renderItem}
                    onSnapToItem = { index => this.setState({activeIndex:index}) } />
                </ImageBackground>
            </View>

            <View style={styles.recentContainer}>
                <ImageBackground source={require('../../assets/images/spot.png')} style={styles.hotspotImage} resizeMode='contain'>
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
    position: 'relative',
    alignItems: 'center',
	justifyContent: 'center',
  },
  guideImage: {
    width: 400,
    height: 100,
  },

  hotspotImage:{
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },

  link: {
    width: '100%',
    height: 150,
	top: 140,
	position: 'absolute',
    borderRadius: 20, 
	alignItems: 'center',
    left:10
  },

  hotspotContainer: {
    width: '93%',
    height: 300,
    // position: 'absolute',
    top: -60,
    left: 5
  },

  recentContainer: {
    width: '93%',
    height: 300,
    position: 'absolute',
    top: 450,
    left: 18
  },

  verticalSpacer: {
    height: 20,
  },

  loadingImage: {
    width: '100%',
    height: '100%',
  },

  slideImage: {
    width: 300, 
    height: 100, 
    marginRight: 10, 
  },

  record: {
    width: '90%',
    height: 60,
    top: 90,
    left: 10, 
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

