import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapboxGL from '@rnmapbox/maps';

MapboxGL.setAccessToken('sk.eyJ1IjoiaGVoZWNodWNrbGUiLCJhIjoiY2xmeHI2NHo1MDB5ZTNlbXJtbWUxOXk3ZiJ9.Mgqcf3pR-8snJqXiZQZ0_Q');

export default function TabThreeScreen() {
    return (
      <View style={styles.container}>
        <View style={styles.container1}>
            <Text style={styles.title}>Animal Map</Text>
            <View style={styles.separator}/>
        </View>
        <View style={styles.mapcontainer}>
            <MapboxGL.MapView style={styles.map} />
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
        flex: 1
      }
  });