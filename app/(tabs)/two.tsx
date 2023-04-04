// import { getDocs, collection, onSnapshot } from 'firebase/firestore';
// import { db } from '../../firebaseConfig';
// import React, { useEffect, useState } from 'react';
// import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import { StyleSheet, View, Text, TextInput, StatusBar, Button } from 'react-native';

// interface animal {
//   id: string;
//   name: string;
//   year: number;
//   latitude: number;
//   longitude: number;
// }

// export default function App() {

//   const [animalData, setAnimalData] = useState<animal[]>([]);

//   useEffect(() => {
//     const animal = collection(db, 'Test')
//     const record = onSnapshot(animal,{
//       next: (snapshot) => {
//         const animalData: animal[]=[];
//         snapshot.docs.forEach((doc) => {
//           const data = doc.data();
//           animalData.push({
//             id: doc.id,
//             name: data.vernacularName,
//             year: data.year,
//             latitude: data.decimalLatitude,
//             longitude: data.decimalLongitude,
//           });
//         })
//         setAnimalData(animalData)
//       }
//     })
//     return () => record();
//   },[]);


//   return (
//     <View>
//       { animalData.map(animal => (
//         <Text key={animal.id}>
//           {animal.name}
//           {animal.latitude}
//           {animal.longitude}
//         </Text>
//       ))
//       }
//     </View>
//   )
// }


