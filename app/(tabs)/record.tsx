import React from 'react';
import {ActivityIndicator,Button,Clipboard,FlatList,Image,Share,StyleSheet,Text,ScrollView,View,TouchableHighlight, 
} from 'react-native';
import { Dimensions} from 'react-native';
const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult } from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import google_api_key from '../../key/google_api_key';



import { useEffect, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { TextInput, StatusBar, TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
		paddingBottom: 10
	},
	developmentModeText: {
		marginBottom: 20,
		color: 'rgba(0,0,0,0.4)',
		fontSize: 14,
		lineHeight: 19,
		textAlign: 'center'
	},
	contentContainer: {
		paddingTop: 0
	},

	contentContainerTwo: {
		paddingTop: 0
	},

	getStartedContainer: {
		right: 60,
		top: 20
	},

	getStartedText: {
        fontWeight: 'bold',
        fontSize: 23,
        textAlign: 'center',
        padding: 10,
        color: 'black'
	},

	helpContainer: {
        width: 160,
        height: 160,
		left: 30,
		top: 80,
        backgroundColor: '#E8E5E5',
		position: 'absolute',
		borderColor: '#21C392', 
		borderWidth: 5, 
		borderStyle: 'dashed', 
	},

	helpContainerTwo: {
		width: 160,
		height: 160,
		left: 220,
		top: 80,
		backgroundColor: '#E8E5E5',
		position: 'absolute',
		borderColor: '#21C392', 
		borderWidth: 5, 
		borderStyle: 'dashed', 
	  },
	  

	map: {
		height: 200,
		width: '92%', 
        marginLeft: '4%', 
        marginRight: '4%', 
		top: 600,
		position: 'absolute',
	},
	buttonTouchable1: {
        marginTop: 0,
		marginLeft: 0,
        width: 160,
        height: 160,
		position: 'absolute',

    },
	buttonTouchable2: {
        marginTop: 0,
		marginLeft: 0,
        width: 160,
        height: 160,
		position: 'absolute',

    },
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 0,
		borderRadius: 5,
		overflow: 'hidden', 
	},
	buttonBackground: {
		position: 'absolute',
		width: 70,
		height: 70,
	},
	contentContainer1: {
		marginTop: 90,
	},
	buttonText: {
		fontWeight: "bold",
		color: 'black',
		marginLeft: 5,
		fontSize: 14,
		marginBottom : 20,
	},
	verticalSpacer: {
		height: 10,
	},
	
});


export default class App extends React.Component {
	state = {
		image: null,
		uploading: false,
		googleResponse: null as { responses: { labelAnnotations?: { description: string }[], localizedObjectAnnotations?: { name: string, score: number }[] }[] } | null,
		location: null,
  		region: null,
	  };
	  
	async componentDidMount() {
		await Camera.requestCameraPermissionsAsync();
		await MediaLibrary.requestPermissionsAsync();
		await ImagePicker.requestCameraPermissionsAsync();

		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status === "granted") {
			let location = await Location.getCurrentPositionAsync({});
			this.setState({
			location,
			region: {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			},
			});
		}
	}

	render() {
		let { image, region } = this.state;
		return (
			<View style={styles.container}>
				<View style={styles.contentContainer}>
					
					<View style={styles.getStartedContainer}>
						{image ? null : (
							<Text style={styles.getStartedText}> Verify your sighting: </Text>
						)}
					</View>

					<View style={styles.helpContainer}>

					<View style={styles.buttonTouchable1}>
						<TouchableOpacity
						style={styles.button}
						onPress={this._takePhoto}>
						<Image
							source={require('../../assets/images/camera.png')}
							style={styles.buttonBackground}
							resizeMode="cover"
						/>
						<View style={styles.verticalSpacer} />
						<View style={styles.contentContainer1}>
							<Text style={styles.buttonText}>Take a photo</Text>
						</View>
						</TouchableOpacity>
					</View>
					</View>
					<View style={styles.helpContainerTwo}>

                        < View style = {styles.buttonTouchable2}>
                        {/* <Button 
							onPress={this._pickImage}
							title="Upload Image"
                            color="#F9D162"
						/> */}
						<TouchableOpacity
						style={styles.button}
						onPress={this._pickImage}>
						<Image
							source={require('../../assets/images/image.png')}
							style={styles.buttonBackground}
							resizeMode="cover"
						/>
						<View style={styles.verticalSpacer} />
						<View style={styles.contentContainer1}>
							<Text style={styles.buttonText}>Upload Image</Text>
						</View>
						</TouchableOpacity>
                    </View>

						
					</View>
					{this.state.googleResponse && this.state.googleResponse.responses[0] && this.state.googleResponse.responses[0].labelAnnotations ? (
						<FlatList
							data={this.state.googleResponse.responses[0].labelAnnotations.map((item, index) => ({ id: `${index}`, description: item.description }))}
							extraData={this.state}
							keyExtractor={this._keyExtractor}
							renderItem={({ item }) => <Text>Item: {item.description}</Text>}
						/>
						) : null}
						{this._maybeRenderImage()}
						{this._maybeRenderUploadingOverlay()}
				</View>
				
				
				{region ? (
					
					<MapView
						provider={PROVIDER_GOOGLE}
						style={styles.map}
						region={region}
						showsUserLocation={true}
					>
						<Marker coordinate={region} />
					</MapView>
					
				) : (
					<ActivityIndicator size="large" />
				)}

			</View>
		);
	}

	organize = (array: any[]) => {
		return array.map(function(item, i) {
			return (
				<View key={i}>
					<Text>{item}</Text>
				</View>
			);
		});
	};

	_maybeRenderUploadingOverlay = () => {
		if (this.state.uploading) {
			return (
				<View
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: 'rgba(0,0,0,0.4)',
							alignItems: 'center',
							justifyContent: 'center'
						}
					]}
				>
					<ActivityIndicator color="#fff" animating size="large" />
				</View>
			);
		}
	};

	// _maybeRenderImage = () => {
	// 	let { image, googleResponse } = this.state;
	// 	if (!image) {
	// 	  return;
	// 	}
	  
	// 	return (
	// 	  <View
	// 		style={{
	// 		  marginTop: 260,
	// 		  left : 85,
	// 		  width: 250,
	// 		  borderRadius: 3,
	// 		  elevation: 2,
	// 		}}
	// 	  >
	// 		<TouchableHighlight style={{ marginBottom: 10 }}>
	// 		  <Button
	// 			onPress={() => this.submitToGoogle(this.state.image)}
	// 			title="Analyze!"
	// 			color={'#21C392'}
	// 		  />
	// 		</TouchableHighlight>
	  
	// 		<View
	// 		  style={{
	// 			borderTopRightRadius: 3,
	// 			borderTopLeftRadius: 3,
	// 			shadowColor: 'rgba(0,0,0,1)',
	// 			shadowOpacity: 0.2,
	// 			shadowOffset: { width: 4, height: 4 },
	// 			shadowRadius: 5,
	// 			overflow: 'hidden',
	// 		  }}
	// 		>
	// 		  <Image source={{ uri: image }} style={{ width: 250, height: 200 }} />
	// 		</View>
	  
	// 		{googleResponse &&
	// 		googleResponse.responses[0] &&
	// 		googleResponse.responses[0].localizedObjectAnnotations ? (
	// 		  <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
	// 			<Text style={{ fontWeight: 'bold' }}>Detected Species:</Text>
	// 			{googleResponse.responses[0].localizedObjectAnnotations.map(
	// 			  (object, index) => (
	// 				<Text key={index}>
	// 				  {object.name} - {(object.score.toFixed(2)*100)}% match
	// 				</Text>
	// 			  ),
	// 			)}
	// 		  </View>
	// 		) : null}
	// 	  </View>
	// 	);
	//   };
	_maybeRenderImage = () => {
		let { image, googleResponse } = this.state;
		if (!image) {
		  return;
		}

		const getHighestScoringObject = (objects) => {
			let highestScoringObject = objects[0];
			objects.forEach((object) => {
			  if (object.score > highestScoringObject.score) {
				highestScoringObject = object;
			  }
			});
			return highestScoringObject;
		  };
	  
		return (
		  <View
			style={{
			  marginTop: 260,
			  left: 85,
			  width: 250,
			  borderRadius: 3,
			  elevation: 2,
			}}
		  >
			<TouchableHighlight style={{ marginBottom: 10 }}>
			  <Button
				onPress={() => this.submitToGoogle(this.state.image)}
				title="Analyze!"
				color={'#21C392'}
			  />
			</TouchableHighlight>
	  
			<View
			  style={{
				borderTopRightRadius: 3,
				borderTopLeftRadius: 3,
				shadowColor: 'rgba(0,0,0,1)',
				shadowOpacity: 0.2,
				shadowOffset: { width: 4, height: 4 },
				shadowRadius: 5,
				overflow: 'hidden',
			  }}
			>
			  <Image source={{ uri: image }} style={{ width: 250, height: 200 }} />
			</View>
	  
			{googleResponse &&
			googleResponse.responses[0] &&
			googleResponse.responses[0].localizedObjectAnnotations ? (
				<View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
				<Text style={{ fontWeight: 'bold' }}>Detected Species:</Text>
				{(() => {
					const highestScoringObject = getHighestScoringObject(
					googleResponse.responses[0].localizedObjectAnnotations,
					);
					return (
					<Text>
						{highestScoringObject.name} - {(highestScoringObject.score.toFixed(2) * 100)}% match
					</Text>
					);
				})()}
				</View>
			) : null}
			</View>
		);
	  };
	  

	_keyExtractor = (item: { id: string }, index: number) => item.id;

	_renderItem = (item: { id: string }) => {
		<Text>response: {JSON.stringify(item)}</Text>;
	};

	_share = () => {
		const url = this.state.image || '';
		Share.share({
			message: this.state.googleResponse ? JSON.stringify(this.state.googleResponse.responses) : '',
			title: 'Check it out',
			url: url
		});
	};

	_copyToClipboard = () => {
		if (!this.state.image) {
			return;
		}
	
		Clipboard.setString(this.state.image);
		alert('Copied to clipboard');
	};

	_takePhoto = async () => {
		let pickerResult = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3]
		});

		this._handleImagePicked(pickerResult);
	};

	_pickImage = async () => {
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3]
		});

		this._handleImagePicked(pickerResult);
	};

	_handleImagePicked = async (pickerResult: ImagePickerResult) => {
		try {
		  this.setState({ uploading: true });
		  let uploadUrl = '';
	  
		  if (pickerResult.canceled) {
			return;
		  }
	  
		  // Access the asset from the "assets" array instead of using the deprecated "uri"
		  const asset = pickerResult.assets[0];
		  if (asset) {
			uploadUrl = asset.uri;
		  }
	  
		  this.setState({ image: uploadUrl });
		} catch (e) {
		  console.log(e);
		  alert('Upload failed, sorry :(');
		} finally {
		  this.setState({ uploading: false });
		}
	};

	submitToGoogle = async (imageUri: string) => {
    try {
      this.setState({ uploading: true });
  
      // Convert image URI to base64 format
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      let body = JSON.stringify({
        requests: [
          {
            image: {
              content: base64Image,
            },
            features: [
              {
                type: "OBJECT_LOCALIZATION",
                maxResults: 10,
              },
            ],
          },
        ],
      });
	  
		  let response = await fetch(
			'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCMp3VmFm3KGv5igbMSPOtX15WQq9Nko1o',
			{
			  headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			  },
			  method: 'POST',
			  body: body,
			}
		  );
	  
		  let responseJson = await response.json();
		  console.log(responseJson);
		  this.setState({
			googleResponse: responseJson,
			uploading: false,
		  });
		} catch (error) {
		  console.log(error);
		}
	};
}


  