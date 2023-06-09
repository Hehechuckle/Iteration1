import React, { useEffect, useState } from 'react';
import MapView, { Callout, CalloutSubview, Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Text, TextInput, StatusBar, Button, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { getDocs, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { MaterialIcons } from '@expo/vector-icons';
import MapViewDirections from 'react-native-maps-directions';
import DropDownPicker from 'react-native-dropdown-picker';
import { Link, Tabs } from 'expo-router';



interface animal {
  id: string;
  name: string;
  sciname: string;
  date: string;
  latitude: number;
  longitude: number;
  fact: string;
}

const mapJson = [
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
        { "visibility": "off" }
    ]
  },
  {
      "featureType": "water",
      "stylers": [
          {
              "saturation": 43
          },
          {
              "lightness": -11
          },
          {
              "hue": "#0088ff"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "hue": "#ff0000"
          },
          {
              "saturation": -100
          },
          {
              "lightness": 99
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "color": "#808080"
          },
          {
              "lightness": 54
          }
      ]
  },
  {
      "featureType": "landscape.man_made",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#ece2d9"
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#ccdca1"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#767676"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
          {
              "color": "#ffffff"
          }
      ]
  },
  {
      "featureType": "poi",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "landscape.natural",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#b8cb93"
          }
      ]
  },
  {
      "featureType": "poi.park",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "poi.sports_complex",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "poi.medical",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "poi.business",
      "stylers": [
          {
              "visibility": "simplified"
          }
      ]
  }
]

export default function App() {
  const mapRef = React.useRef(null);

  const [region, setRegion] = React.useState();

  const searchRef = React.useRef(null);

  const [animalData, setAnimalData] = useState<animal[]>([]);

  const [recenteredLocation, setRecenteredLocation] = useState(null);

  const [searchedLocation, setSearchedLocation] = useState(null);

  const [showDirections, setShowDirections] = useState(false);

  const [searchedLocationDetails, setSearchedLocationDetails] = useState(null);

  const [displayDirections, setDisplayDirections] = useState(false);

  const [filteredAnimals, setFilteredAnimals] = useState<animal[]>([]);

  const [safetyMessageVisible, setSafetyMessageVisible] = useState(true);

  const windowHeight = Dimensions.get('window').height;

  const onSafetyMessageDismiss = () => {
    setSafetyMessageVisible(false);
  };

  const renderSafetyMessageModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={safetyMessageVisible}
        onRequestClose={() => {
          setSafetyMessageVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={require('../../assets/images/Safety.png')} style={styles.image} />
            <Text style={styles.modalText}>
              Don't disturb the animals or their habitat.
            </Text>
            <Text style={styles.mesText}>
              Take only photos, leave only footprints.
            </Text>
            <View style={styles.verticalSpacer} />
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "#21C392" }}
              onPress={onSafetyMessageDismiss}
            >
              <Text style={styles.textStyle}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const [open, setOpen] = useState(false);

  const [value, setValue] = useState(['Koala', 'Eastern Grey Kangaroo', 'Swamp Wallaby', 'Common Wombat', 'Short-beaked Echidna', 'Platypus']);
  
  const [items, setItems] = useState([
    { label: 'Koala', value: 'Koala' },
    { label: 'Kangaroo', value: 'Eastern Grey Kangaroo' },
    { label: 'Wallaby', value: 'Swamp Wallaby' },
    { label: 'Wombat', value: 'Common Wombat' },
    { label: 'Echidnas', value: 'Short-beaked Echidna' },
    { label: 'Platypus', value: 'Platypus' },
  ]);

  const cancelSearch = () => {
    setSearchedLocation(null);
    setShowDirections(false);
    setDisplayDirections(false);
    reCenterMap();
  };

  const getAnimalIcon = (animalName: string) => {
    switch (animalName) {
      case 'Koala':
        return require('../../assets/images/icon/koala.png');
      case 'Eastern Grey Kangaroo':
        return require('../../assets/images/icon/kangaroo.png');
      case 'Platypus':
        return require('../../assets/images/icon/platypus.png');
      case 'Short-beaked Echidna':
        return require('../../assets/images/icon/echidna.png');
      case 'Swamp Wallaby':
        return require('../../assets/images/icon/wallaby.png');
      case 'Common Wombat':
        return require('../../assets/images/icon/wombat.png');
      default:
        return require('../../assets/images/icon/koala.png');
    }
  };

  const reCenterMap = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({});
    const newRegion = {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      // latitudeDelta: 0.0922,
      // longitudeDelta: 0.0421,n
      longitudeDelta: 0.2105,
    };
    setRecenteredLocation({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });
    if (mapRef.current) {
      mapRef.current.animateToRegion(newRegion, 1000);
    }
  };

  useEffect(() => {
    const animal = collection(db, 'Animals2.6')
    onSnapshot(animal,{
      next: (snapshot) => {
        const animalData: animal[]=[];
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          animalData.push({
            id: doc.id,
            name: data.name,
            sciname: data.sciname,
            date: data.date,
            latitude: data.latitude,
            longitude: data.longitude,
            fact: data.fact,
          });
        })
        setAnimalData(animalData)
      }
    })
    // return () => record();
  },[]);

  useEffect(() => {
    const updatedFilteredAnimals = animalData.filter((animal) =>
      value.includes(animal.name)
    );
    setFilteredAnimals(updatedFilteredAnimals);
  }, [value, animalData]);

  useEffect(() => {
    const getPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }
      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
  
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        // latitudeDelta: 0.0922,
        // longitudeDelta: 0.0421,
        latitudeDelta: 0.461,
        longitudeDelta: 0.2105,
      });
  
      reCenterMap();
      } catch (error) {
        console.log('Error while fetching current location: ', error);
      }
    };

    getPermission();
  }, []);

  if (!region) {
    return (
      <View style={styles.loadingContainer}>
        <Image
          source={require('../../assets/images/loading.png')}
          style={styles.loadingImage}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {renderSafetyMessageModal()}
      <GooglePlacesAutocomplete
        placeholder='Search location'
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
        }}
        onPress={(data, details = null) => {
          // console.log(data, details);
          setSearchedLocationDetails(details);

          const newRegion = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };
          setSearchedLocation({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          });
          setRegion(newRegion);
          mapRef.current.animateToRegion(newRegion, 1000);

          setShowDirections(true);

        }}

        query={{
          key: 'AIzaSyCMp3VmFm3KGv5igbMSPOtX15WQq9Nko1o',
          language: 'en',
          location: `${region.latitude},${region.longitude}`,
        }}
        styles={{
          container: {
            flex: 0,
            position: 'absolute',
            width: '90%', 
            marginLeft: '5%', 
            marginRight: '5%', 
            zIndex: 1,
            paddingTop: 15,
          },
          textInputContainer: {
            backgroundColor: 'white',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            paddingHorizontal: 10,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#ccc',
          },
          textInput: {
            height: 38,
            color: '#5d5d5d',
            fontSize: 16,
          },
          listView: {
            backgroundColor: 'white',
            marginTop: 10, 
            borderRadius: 5, 
            borderWidth: 1, 
            borderColor: '#ccc', 
          },
        }}
        renderLeftButton={() => (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}
            onPress={cancelSearch}
          >
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity> 
        )}
        renderRightButton={() => (
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}
            onPress={() => {searchRef.current?.setAddressText('')}}
          >
            <MaterialIcons name="clear" size={24} color="black" />
          </TouchableOpacity>
        )}
        ref={searchRef}
      />

      <View style={{
        position: 'absolute',
        backgroundColor: 'white',
        paddingHorizontal: 15,
        borderRadius: 10,
        borderWidth: 1,
        zIndex: 1,
        width: '70%', 
        marginRight: '3%', 
        marginLeft: '2%', 
        flex: 0,
        top: windowHeight * 0.865,
      }}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          
          maxHeight={500}
          dropDownDirection='AUTO'
          multiple={true}
          mode="BADGE"
          badgeDotColors={["#F9D162"]}
          placeholder="Select Species"
          style={{
            backgroundColor: 'white', 
            borderWidth: 0,
          }}
        />
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        customMapStyle={mapJson}
        // showsUserLocation={true}
      >
        {recenteredLocation && (
          <Marker
            coordinate={{
              latitude: recenteredLocation.latitude,
              longitude: recenteredLocation.longitude,
            }}
          >
            <Image
              source={require('../../assets/images/icon/location2.png')}
              style={{ height: 50, width: 50 }}
              resizeMode="contain"
            />
          </Marker>
        )}

        {searchedLocation && (
          <Marker
            coordinate={{
              latitude: searchedLocation.latitude,
              longitude: searchedLocation.longitude,
            }}
            onPress={() => {
              setShowDirections(true);
              setDisplayDirections(true);
            }}
          >
            <Image
              source={require('../../assets/images/icon/location.png')}
              style={{ height: 50, width: 50 }}
              resizeMode="contain"
            />
            <Callout tooltip>
              <View style={styles.customCallout}>
                <Text style={styles.calloutText}>{searchedLocationDetails.name}</Text>
                <Text style={styles.calloutSubText}>{searchedLocationDetails.formatted_address}</Text>
              </View>
            </Callout>
          </Marker>
        )}


        {filteredAnimals.map((animal) => (
          <Marker
            key={animal.id}
            tracksViewChanges={false}
            coordinate={{
              latitude: animal.latitude,
              longitude: animal.longitude,
            }}
          >
            <Image
              source={getAnimalIcon(animal.name)}
              style={{ height: 30, width: 30 }}
              resizeMode="contain"
            />
            <Callout style={styles.calloutContainer}>
              <Text style={styles.calloutText}>{animal.name}</Text>
              <Text style={styles.calloutSubText1}>{animal.sciname}</Text>
              <Text style={styles.calloutSubText}>Seen on: {animal.date}</Text>
              <Text style={styles.calloutSubText}>{animal.fact}</Text>
            </Callout>
          </Marker>
        ))}

        {recenteredLocation && showDirections && displayDirections && (
          <MapViewDirections
            origin={recenteredLocation}
            destination={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            apikey="AIzaSyCMp3VmFm3KGv5igbMSPOtX15WQq9Nko1o"
            strokeWidth={5}
            strokeColor="blue"
          />
        )}

      </MapView>

      <TouchableOpacity
        style={styles.reCenterButton}
        onPress={reCenterMap}
      >
        <MaterialIcons name="my-location" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  reCenterButton: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    zIndex: 2,
  },
  customMarker: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  calloutText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  calloutSubText: {
    fontSize: 12,
    color: '#666',
  },
  calloutSubText1: {
    fontSize: 10,
    color: '#666',
    fontStyle: 'italic',
  },
  calloutContainer: {
    width: 200, 
    hight: 100,
    borderRadius: 20,
  },
  directionsButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  directionsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  customCallout: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: 250,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 18,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 33,
    borderColor: "#21C392",
    borderWidth: 4,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    width: 80,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 19,
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  mesText: {
    textAlign: "center",
    fontSize: 13,
  },
  image: {
    width: 185,
    height: 160,
    marginBottom: 10,
  },
  verticalSpacer: {
    height: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingImage: {
    width: '100%',
    height: '100%',
  },

});
