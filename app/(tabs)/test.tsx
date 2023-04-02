import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import { getDocs, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';


Mapbox.setAccessToken('sk.eyJ1IjoiaGVoZWNodWNrbGUiLCJhIjoiY2xmeHI2NHo1MDB5ZTNlbXJtbWUxOXk3ZiJ9.Mgqcf3pR-8snJqXiZQZ0_Q');

interface Animal {
    id: string;
    name: string;
    year: number;
    latitude: number;
    longitude: number;
  }

export default function TabThreeScreen() {

    const [animalData, setAnimalData] = useState<Animal[]>([]);

    useEffect(() => {
        const getRecord = onSnapshot(collection(db, 'Animals'), (querySnapshot) => {
            const Animals: Animal[] = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                Animals.push({
                    id: doc.id,
                    name: data.vernacularName,
                    year: data.year,
                    latitude: data.decimalLatitude,
                    longitude: data.decimalLongitude,
                });
            });
            setAnimalData(Animals);
        });
        return () => getRecord();
    }, []);

    const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

    const handleAnnotationPress = (animal: Animal) => {
        setSelectedAnimal(animal);
    };

  
    return (
        <View style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.title}>Animal Map</Text>
                <View style={styles.separator} />
            </View>
            <View style={styles.mapcontainer}>
                <Mapbox.MapView style={styles.map}>
                    <Mapbox.Camera zoomLevel={12} centerCoordinate={[-37.840, 144.946]} />
                    {animalData.map((animal) => (
                        <Mapbox.PointAnnotation
                            key={animal.id}
                            id={animal.id}
                            coordinate={[animal.longitude, animal.latitude]}
                            onSelected={() => handleAnnotationPress(animal)}
                        >
                            <View />    
                        </Mapbox.PointAnnotation>
                    ))}
                </Mapbox.MapView>
                {selectedAnimal && (
                    <View style={styles.callout}>
                        <Text>{selectedAnimal.name}</Text>
                        <Text>Year: {selectedAnimal.year}</Text>
                        <TouchableOpacity onPress={() => setSelectedAnimal(null)}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    width: '80%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapcontainer: {
    height: 400,
    width: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
  callout: {
    position: 'absolute',
    bottom: 20,
    left: '5%',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    zIndex: 1000,
  },
});
