import React, { useEffect, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Text, TextInput, StatusBar, Button, TouchableOpacity, Image} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { getDocs, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { MaterialIcons } from '@expo/vector-icons';

interface animal {
  id: string;
  name: string;
  year: number;
  latitude: number;
  longitude: number;
}

export default function App() {
  const mapRef = React.useRef(null);

  const [region, setRegion] = React.useState();

  const [animalData, setAnimalData] = useState<animal[]>([]);

  const [recenteredLocation, setRecenteredLocation] = useState(null);

  const reCenterMap = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({});
    const newRegion = {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    setRecenteredLocation({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });
    mapRef.current.animateToRegion(newRegion, 1000);
  };

  useEffect(() => {
    const animal = collection(db, 'Test')
    const record = onSnapshot(animal,{
      next: (snapshot) => {
        const animalData: animal[]=[];
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          animalData.push({
            id: doc.id,
            name: data.vernacularName,
            year: data.year,
            latitude: data.decimalLatitude,
            longitude: data.decimalLongitude,
          });
        })
        setAnimalData(animalData)
      }
    })
    return () => record();
  },[]);

  useEffect(() => {
    const getPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      // console.log("Location");
      // console.log(currentLocation.coords.latitude);
      // console.log(currentLocation.coords.longitude);

      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    };
    getPermission();
  }, [])

  if (!region) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
        }}
        onPress={(data, details = null) => {
          // console.log(data, details);
          const newRegion = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };
          setRegion(newRegion);
          mapRef.current.animateToRegion(newRegion, 1000);
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
      />

      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
      >
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
        {animalData.map((animal) => (
          <Marker
            key={animal.id}
            coordinate={{
              latitude: animal.latitude,
              longitude: animal.longitude,
            }}
          >
            <View style={styles.customMarker}>
              <Text style={styles.markerText}>?</Text>
            </View>
            <Callout style={styles.calloutContainer}>
              <Text style={styles.calloutText}>{animal.name}</Text>
              <Text style={styles.calloutSubText}>Year: {animal.year}</Text>
            </Callout>
          </Marker> 
        ))}
        {recenteredLocation && (
          <Marker
            coordinate={{
              latitude: recenteredLocation.latitude,
              longitude: recenteredLocation.longitude,
            }}
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
  calloutContainer: {
    width: 200, 
    hight: 100,
    borderRadius: 20,
  },


});
