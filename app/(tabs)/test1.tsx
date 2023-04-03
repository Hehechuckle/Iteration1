import React, { useEffect, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Text, TextInput, StatusBar, Button } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { getDocs, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function App() {
  const mapRef = React.useRef(null);

  const [region, setRegion] = React.useState();


  // interface Animal {
  //   id: string;
  //   name: string;
  //   year: number;
  //   latitude: number;
  //   longitude: number;
  // }

  // const [animalData, setAnimalData] = useState<Animal[]>([]);

  // useEffect(() => {
  //     const getRecord = onSnapshot(collection(db, 'Poor'), (querySnapshot) => {
  //         const Animals: Animal[] = [];
          
  //         querySnapshot.forEach((doc) => {
  //             const data = doc.data();
  //             Animals.push({
  //                 id: doc.id,
  //                 name: data.vernacularName,
  //                 year: data.year,
  //                 latitude: data.decimalLatitude,
  //                 longitude: data.decimalLongitude,
  //             });
  //         });
  //         setAnimalData(Animals);
  //     });
  //     return () => getRecord();
  // }, []);

  // const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  // const handleAnnotationPress = (animal: Animal) => {
  //     setSelectedAnimal(animal);
  // };

  useEffect(() => {
    const getPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      console.log("Location");
      console.log(currentLocation.coords.latitude);
      console.log(currentLocation.coords.longitude);

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
    <View style={{ marginTop: 50, flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
        }}
        onPress={(data, details = null) => {
          console.log(data, details);
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
          key: 'AIzaSyCMp3VmFm3KGv5igbMSPOtX15WQq9Nko1o' ,
          language: 'en',
          location: `${region.latitude},${region.longitude}`,
        }}
        styles={{
          container: { flex: 0, position: 'absolute', width: '100%', zIndex: 1 },
          listView: { backgroundColor: 'white' },
        }}
      />

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
      >
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />

        {/* {wildlifeRecords.map((record) => (
        <Marker
          key={record.id}
          coordinate={{
            latitude: record.latitude,
            longitude: record.longitude,
          }}
        >
        <Callout>
          <Text>{record.vernacularName} - {record.year}</Text>
          </Callout>
        </Marker>
        ))} */}

        {/* <Marker
          coordinate={{
            latitude: -37.8136,
            longitude: 144.9631,
          }}>
          <Callout>
            <Text>Koala</Text>
          </Callout>
        </Marker> */}
        
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
