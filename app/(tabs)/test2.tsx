// import React from 'react';
// import {ActivityIndicator,Button,Clipboard,FlatList,Image,Share,StyleSheet,Text,ScrollView,View,TouchableHighlight, 
// } from 'react-native';
// import { Dimensions} from 'react-native';
// const deviceWidth = Dimensions.get('screen').width;
// const deviceHeight = Dimensions.get('screen').height;
// import * as ImagePicker from 'expo-image-picker';
// import { ImagePickerResult } from 'expo-image-picker';
// import * as MediaLibrary from 'expo-media-library';
// import { Camera } from 'expo-camera';
// import * as FileSystem from 'expo-file-system';
// import axios from 'axios';
// import google_api_key from '../../key/google_api_key';


// import { useEffect, useState } from 'react';
// import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import { TextInput, StatusBar, TouchableOpacity} from 'react-native';
// import * as Location from 'expo-location';


// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#F9D162',
// 		paddingBottom: 10
// 	},
// 	developmentModeText: {
// 		marginBottom: 20,
// 		color: 'rgba(0,0,0,0.4)',
// 		fontSize: 14,
// 		lineHeight: 19,
// 		textAlign: 'center'
// 	},
// 	contentContainer: {
// 		paddingTop: 50
// 	},

// 	contentContainerTwo: {
// 		paddingTop: 10
// 	},

// 	getStartedContainer: {
// 		alignItems: 'center',
// 		marginHorizontal: 50
// 	},

// 	getStartedText: {
//         fontWeight: 'bold',
//         fontSize: 25,
//         textAlign: 'center',
//         padding: 16,
//         color: 'black'
// 	},

// 	helpContainer: {
//         width: deviceWidth - 32,
//         height: deviceHeight / 4,
//         alignSelf: 'center',
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         borderWidth: 1,
//         borderRadius: 2,
//         borderColor: '#ddd',
//         borderBottomWidth: 0,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.8,
//         shadowRadius: 2,
//         elevation: 6,
//         marginLeft: 5,
//         marginRight: 5,
//         marginTop: 10,
//         backgroundColor: '#F5F5F5'
        
// 	},

// 	helpContainerTwo: {
//         width: deviceWidth - 32,
//         height: deviceHeight / 3,
//         alignSelf: 'center',
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         borderWidth: 1,
//         borderRadius: 2,
//         borderColor: '#ddd',
//         borderBottomWidth: 0,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.8,
//         shadowRadius: 2,
//         elevation: 6,
//         marginLeft: 5,
//         marginRight: 5,
//         marginTop: 10,
//         backgroundColor: '#F5F5F5'
        
// 	},

//     buttonTouchable: {
//         fontSize: 21,
//         backgroundColor: '#F9D162',
//         marginTop: 32,
//         width: deviceWidth - 62,
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: 44,
//         alignSelf:'center',
//         color: 'black'
//     },

// 	map: {
// 		width: '100%',
// 		height: '100%',
// 	  },
	
// });



// export default class App extends React.Component {
// 	state = {
// 		image: null,
// 		uploading: false,
// 		googleResponse: null as { responses: { labelAnnotations: { description: string }[] }[] } | null,
// 		//googleResponse: null
// 	};

// 	async componentDidMount() {
// 		await Camera.requestCameraPermissionsAsync();
// 		await MediaLibrary.requestPermissionsAsync();
// 		await ImagePicker.requestCameraPermissionsAsync();
// 	}

// 	render() {
// 		let { image } = this.state;
// 		return (
// 			<View style={styles.container}>
// 				<ScrollView
// 					style={styles.container}
// 					contentContainerStyle={styles.contentContainer}
// 				>
// 					<View style={styles.getStartedContainer}>
// 						{image ? null : (
// 							<Text style={styles.getStartedText}> ADD ANIMAL RECORD</Text>
// 						)}
// 					</View>

// 					<View style={styles.helpContainer}>
//                         < View style = {styles.buttonTouchable}>
//                         <Button 
// 							onPress={this._pickImage}
// 							title="Pick an image from camera roll"
//                             color="black"
// 						/>

//                         </View>

//                         < View style = {styles.buttonTouchable}>
//                         <Button 
//                             onPress={this._takePhoto} 
//                             title="Take a photo"
//                             color="black"
//                          />

//                         </View>                          
        
// 						{this.state.googleResponse && (
// 							<FlatList
// 								data={this.state.googleResponse.responses[0].labelAnnotations.map((item, index) => ({ id: `${index}`, description: item.description }))}
// 								extraData={this.state}
// 								keyExtractor={this._keyExtractor}
// 								renderItem={({ item }) => <Text>Item: {item.description}</Text>}
// 							/>
// 						)}
// 						{this._maybeRenderImage()}
// 						{this._maybeRenderUploadingOverlay()}
// 					</View>
// 				</ScrollView>
// 				<ScrollView
// 					style={styles.container}
// 					contentContainerStyle={styles.contentContainerTwo}
// 				>
// 					<View style={styles.getStartedContainer}>
// 						{image ? null : (
// 							<Text style={styles.getStartedText}> LOCATION </Text>
// 						)}
// 					</View>

// 					<View style={styles.helpContainerTwo}>
// 					<MapView
// 						style={styles.map}
// 						initialRegion={{
// 						latitude: -37.91402149942641, 
// 						longitude: 145.13470211162982,
// 						latitudeDelta: 0.0230,
// 						longitudeDelta: 0.0130,
// 						}}
// 					>
// 						<Marker
// 						coordinate={{ latitude: -37.91402149942641, longitude: 145.13470211162982 }}
// 						title="Marker Title"
// 						description="Marker Description"
// 						/>
// 					</MapView>
						


// 					</View>
// 				</ScrollView>
// 			</View>
// 		);
// 	}

// 	organize = (array: any[]) => {
// 		return array.map(function(item, i) {
// 			return (
// 				<View key={i}>
// 					<Text>{item}</Text>
// 				</View>
// 			);
// 		});
// 	};

// 	_maybeRenderUploadingOverlay = () => {
// 		if (this.state.uploading) {
// 			return (
// 				<View
// 					style={[
// 						StyleSheet.absoluteFill,
// 						{
// 							backgroundColor: 'rgba(0,0,0,0.4)',
// 							alignItems: 'center',
// 							justifyContent: 'center'
// 						}
// 					]}
// 				>
// 					<ActivityIndicator color="#fff" animating size="large" />
// 				</View>
// 			);
// 		}
// 	};

// 	_maybeRenderImage = () => {
// 		let { image, googleResponse } = this.state;
// 		if (!image) {
// 			return;
// 		}

// 		return (
// 			<View
// 				style={{
// 					marginTop: 20,
// 					width: 250,
// 					borderRadius: 3,
// 					elevation: 2
// 				}}
// 			>
// 				<TouchableHighlight style={{ marginBottom: 10 }}>
//           <Button onPress={() => this.submitToGoogle(this.state.image)} title="Analyze!" />
//         </TouchableHighlight>
				
// 				<View
// 					style={{
// 						borderTopRightRadius: 3,
// 						borderTopLeftRadius: 3,
// 						shadowColor: 'rgba(0,0,0,1)',
// 						shadowOpacity: 0.2,
// 						shadowOffset: { width: 4, height: 4 },
// 						shadowRadius: 5,
// 						overflow: 'hidden'
// 					}}
// 				>
// 					<Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
// 				</View>
// 				<Text
// 					onPress={this._copyToClipboard}
// 					onLongPress={this._share}
// 					style={{ paddingVertical: 10, paddingHorizontal: 10 }}
// 				/>

// 				<Text>Raw JSON:</Text>

// 				{googleResponse && (
// 					<Text
// 						onPress={this._copyToClipboard}
// 						onLongPress={this._share}
// 						style={{ paddingVertical: 10, paddingHorizontal: 10 }}
// 					>
// 						{JSON.stringify(googleResponse.responses)}
// 					</Text>
// 				)}
// 			</View>
// 		);
// 	};

// 	_keyExtractor = (item: { id: string }, index: number) => item.id;

// 	_renderItem = (item: { id: string }) => {
// 		<Text>response: {JSON.stringify(item)}</Text>;
// 	};

// 	_share = () => {
// 		const url = this.state.image || '';
// 		Share.share({
// 			message: this.state.googleResponse ? JSON.stringify(this.state.googleResponse.responses) : '',
// 			title: 'Check it out',
// 			url: url
// 		});
// 	};

// 	_copyToClipboard = () => {
// 		if (!this.state.image) {
// 			return;
// 		}
	
// 		Clipboard.setString(this.state.image);
// 		alert('Copied to clipboard');
// 	};

// 	_takePhoto = async () => {
// 		let pickerResult = await ImagePicker.launchCameraAsync({
// 			allowsEditing: true,
// 			aspect: [4, 3]
// 		});

// 		this._handleImagePicked(pickerResult);
// 	};

// 	_pickImage = async () => {
// 		let pickerResult = await ImagePicker.launchImageLibraryAsync({
// 			allowsEditing: true,
// 			aspect: [4, 3]
// 		});

// 		this._handleImagePicked(pickerResult);
// 	};

// 	_handleImagePicked = async (pickerResult: ImagePickerResult) => {
// 		try {
// 		  this.setState({ uploading: true });
// 		  let uploadUrl = '';
	  
// 		  if (pickerResult.canceled) {
// 			return;
// 		  }
	  
// 		  // Access the asset from the "assets" array instead of using the deprecated "uri"
// 		  const asset = pickerResult.assets[0];
// 		  if (asset) {
// 			uploadUrl = asset.uri;
// 		  }
	  
// 		  this.setState({ image: uploadUrl });
// 		} catch (e) {
// 		  console.log(e);
// 		  alert('Upload failed, sorry :(');
// 		} finally {
// 		  this.setState({ uploading: false });
// 		}
// 	};

// 	submitToGoogle = async (imageUri: string) => {
//     try {
//       this.setState({ uploading: true });
  
//       // Convert image URI to base64 format
//       const base64Image = await FileSystem.readAsStringAsync(imageUri, {
//         encoding: FileSystem.EncodingType.Base64,
//       });
  
//       let body = JSON.stringify({
//         requests: [
//           {
//             image: {
//               content: base64Image,
//             },
//             features: [
//               {
//                 type: "LABEL_DETECTION",
//                 maxResults: 10,
//               },
//             ],
//           },
//         ],
//       });
	  
// 		  let response = await fetch(
// 			'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCMp3VmFm3KGv5igbMSPOtX15WQq9Nko1o',
// 			{
// 			  headers: {
// 				Accept: 'application/json',
// 				'Content-Type': 'application/json',
// 			  },
// 			  method: 'POST',
// 			  body: body,
// 			}
// 		  );
	  
// 		  let responseJson = await response.json();
// 		  console.log(responseJson);
// 		  this.setState({
// 			googleResponse: responseJson,
// 			uploading: false,
// 		  });
// 		} catch (error) {
// 		  console.log(error);
// 		}
// 	};
// }


  