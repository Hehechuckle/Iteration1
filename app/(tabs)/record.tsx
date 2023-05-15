import React from 'react';
import {ActivityIndicator,Button,Clipboard,FlatList,Image,Share,StyleSheet,Text,ScrollView,View,TouchableHighlight, ImageBackground
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
import { getDocs, collection, onSnapshot, addDoc} from 'firebase/firestore';
import { db } from '../../firebaseConfig';



import { useEffect, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { TextInput, StatusBar, TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';



const styles = StyleSheet.create({
	container: {
		flex: 1,
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
		left: "7%",
		top: 50
	},

	introContainer: {
		width: "90%",
		top: 60,
		left: "8%",
	},

	getStartedText: {
        fontWeight: 'bold',
        fontSize: 25,
        // textAlign: 'center',
        padding: 10,
        color: 'black',
		textAlign: 'left',
	},

	introText: {
		fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'left',
        padding: 10,
        color: 'black'
		
	},

	helpContainer: {
        width: "80%",
        height:"100%",
		left: "10%",
		top: 270,
		alignItems: 'center',
		justifyContent: 'center',
        backgroundColor: '#F5F5F5',
		position: 'absolute',
		borderColor: '#21C392', 
		borderWidth: 5, 
		borderRadius: 20,
	},

	helpContainerTwo: {
		width: "80%",
		height: "100%",
		left: "10%",
		top: 500,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F5F5F5',
		position: 'absolute',
		borderColor: '#21C392', 
		borderWidth: 5, 
		borderRadius: 20,
	  },

	buttonTouchable1: {
        marginTop: 0,
		marginLeft: 0,
        width: 200,
        height: 200,
		position: 'absolute',

    },
	buttonTouchable2: {
        marginTop: 0,
		marginLeft: 0,
        width: 200,
        height: 200,
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
		width: 80,
		height: 80,
	},

	contentContainer1: {
		marginTop: 120,
	},

	buttonText: {
		fontWeight: "bold",
		color: 'black',
		marginLeft: 5,
		fontSize: 14,
		marginBottom : 20,
	},

	verticalSpacer: {
		height: 20,
	},

	loadingImage: {
		width: '100%',
		height: '100%',
	},
	buttonContainer: {
		backgroundColor: '#F9D162', 
		paddingVertical: 10, 
		paddingHorizontal: 20, 
		borderRadius: 20, 
		alignItems: 'center',
		margin: 5,
		height: 80,
		flexDirection: 'row', 
    	justifyContent: 'space-between', 
	  },
	aniButtonText: {
		color: 'black', 
		fontSize: 16, 
		fontWeight: 'bold',
	},
	iconStyle: {
		width: 50,  
		height: 50, 
		resizeMode: 'contain', 
	},

	resultContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		width: "100%",
		height: 200,
		borderRadius: 20, 
		marginLeft: "3%",
		top: 20,
	},

	resultText: {
		fontWeight: 'bold',
        fontSize: 25,
        // textAlign: 'left',
        // padding: 10,
        color: 'black'
	},

	uploadContainer: {
		backgroundColor: '#F9D162', 
		paddingVertical: 10, 
		paddingHorizontal: 20, 
		borderRadius: 20, 
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		height: 80,
	},

	uploadContainer1: {
		borderRadius: 20, 
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		height: 80,
		width: 200, 
		top: 250
	},

	uploadButton: {
		height: 80,
		width: 200,
		position: 'absolute',
	}


	

});


export default class App extends React.Component {

	
	state = {
		image: null,
		uploading: false,
		googleResponse: null as { responses: { labelAnnotations?: { description: string }[], localizedObjectAnnotations?: { name: string, score: number }[] }[] } | null,
		location: null,
  		region: null,
		isImageSelected: false,
		selectedAnimal: null,
		showButtons:true,
		latitude: null,
  		longitude: null,
	  };
	  
	async componentDidMount() {
		await Camera.requestCameraPermissionsAsync();
		await MediaLibrary.requestPermissionsAsync();
		await ImagePicker.requestCameraPermissionsAsync();

		let { status } = await Location.requestForegroundPermissionsAsync();
  
		if (status !== 'granted') {
			console.log('Permission to access location was denied');
			return;
		}

		let location = await Location.getCurrentPositionAsync({});
		
		this.setState({
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
		});
	}



	render() { 
		let { image, region } = this.state;
		return (
		  <ImageBackground
			source={require('../../assets/images/recordImage.png')}
			style={styles.loadingImage}
			>
			<View style={styles.container}>
				<View style={styles.contentContainer}>
					
					<View style={styles.getStartedContainer}>
						{image ? null : (
							<Text style={styles.getStartedText}> Identify your sighting: </Text>
						)}
					</View>
					<View style={styles.introContainer}>
						{image ? null : (
							<Text style={styles.introText}> 
							Our species recognition tool can 
							help you identify the type of native
							Australian animal you've sighted.
							</Text>
						)}
					</View>

					{!this.state.isImageSelected && (	
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
					)}

					{!this.state.isImageSelected && (
					<View style={styles.helpContainerTwo}>
                        < View style = {styles.buttonTouchable2}>
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
					)}

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
		
			</View>
			</ImageBackground>
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
	
		const animals = ["Kangaroo", "Koala", "Wombat", "Wallaby", "Echidna", "Platypus"]; 

		const getAnimalIcon = (animalName: string) => {
			switch (animalName) {
			case 'koala':
				return require('../../assets/images/icon/koala.png');
			case 'Kangaroo':
				return require('../../assets/images/icon/kangaroo.png');
			case 'Platypus':
				return require('../../assets/images/icon/platypus.png');
			case 'Echidna':
				return require('../../assets/images/icon/echidna.png');
			case 'Wallaby':
				return require('../../assets/images/icon/wallaby.png');
			case 'Wombat':
				return require('../../assets/images/icon/wombat.png');
			default:
				return require('../../assets/images/icon/koala.png');
			}
		};

		const getAnimalImage = (animalName: string) => {
			switch (animalName) {
			  case 'Kangaroo':
				return require('../../assets/images/icon/kangaroo1.png');
			  case 'Koala':
				return require('../../assets/images/icon/koala1.png');
			  case 'Platypus':
				return require('../../assets/images/icon/platypus1.png');
			  case 'Echidna':
				return require('../../assets/images/icon/echidna1.png');
			  case 'Wallaby':
				return require('../../assets/images/icon/wallaby1.png');
			  case 'Wombat':
				return require('../../assets/images/icon/wombat1.png');
			  default:
				return require('../../assets/images/icon/koala1.png'); 
			}
		  };


	
		return (
			<View
				style={{
					marginTop: 0,
					width: "100%",
					elevation: 2,
				}}
			>
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
					<Image source={{ uri: image }} style={{ width: "100%", height: 300 }} />
				</View>
	
				<View style={styles.verticalSpacer} />

				<View>
					<Text style={styles.getStartedText}> Verify your sighting: </Text>
				</View>

				<View style={styles.verticalSpacer} />
	
				{this.state.showButtons ? (
					<View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
						{animals.map((animal, index) => (
						<View key={index} style={{ width: '45%', margin: 10 }}>
							<TouchableOpacity
							style={styles.buttonContainer}
							onPress={() => this.handleAnimalSelection(animal)}
							>
							<Image source={getAnimalIcon(animal)} style={styles.iconStyle} />
							<Text style={styles.aniButtonText}>{animal}</Text>
							</TouchableOpacity>
						</View>
						))}
					</View>
					) : (
						
					<View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
						
						{this.state.googleResponse &&
						this.state.googleResponse.responses[0] &&
						this.state.googleResponse.responses[0].localizedObjectAnnotations ? (
						(() => {
							const highestScoringObject = getHighestScoringObject(
							this.state.googleResponse.responses[0].localizedObjectAnnotations,
							);
							const detectedAnimal = highestScoringObject.name;
							console.log(detectedAnimal);
							if (detectedAnimal === "Animal" || detectedAnimal === "Otter" ||animals.includes(detectedAnimal)) {
							return (
								<View style={styles.resultContainer}>
									<Image source={getAnimalImage(this.state.selectedAnimal)} style={styles.loadingImage} />

									<View style={styles.verticalSpacer} />
									<Text style={styles.resultText}>
										{(highestScoringObject.score.toFixed(2) * 100)}% match
									</Text>

						
									<View style={styles.verticalSpacer} />

									<TouchableOpacity
										style={styles.uploadContainer1}
										onPress={this.uploadRecord}
										>
										<Image
											source={require('../../assets/images/upload.png')}
											style={styles.uploadButton}
											resizeMode="cover"
										/>

									</TouchableOpacity>


								</View>
							);
							} else {
							return (
								<View style={styles.resultContainer}>
									<Image source={require('../../assets/images/noMatch.png')} style={styles.loadingImage} />

									<View style={styles.verticalSpacer} />

									<TouchableOpacity
										style={styles.uploadContainer1}
										
										>
										<Image
											source={require('../../assets/images/tryAgain.png')}
											style={styles.uploadButton}
											resizeMode="cover"
										/>

									</TouchableOpacity>
								</View>
							);
							}
						})()
						) : null}
					</View>
					)}
			</View>
		);
	};
	

	handleAnimalSelection = (animal) => {
		this.setState(
		  {
			selectedAnimal: animal,
			showButtons: false,
		  },
		  () => {
			this.submitToGoogle(this.state.image);
		  }
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
	  
		  const asset = pickerResult.assets[0];
		  if (asset) {
			uploadUrl = asset.uri;
		  }
	  
		  this.setState({ image: uploadUrl , isImageSelected: true });
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


	uploadRecord = () => {
		const { selectedAnimal} = this.state;

		const officialAnimalNames = {
			"Kangaroo": "Eastern Grey Kangaroo",
			"Koala": "Koala",
			"Wombat": "Common Wombat",
			"Wallaby": "Swamp Wallaby",
			"Echidna": "Short-beaked Echidna",
			"Platypus": "Platypus",
		  };
		  
		  const scientificAnimalNames = {
			"Kangaroo": "Macropus giganteus",
			"Koala": "Phascolarctos cinereus",
			"Wombat": "Vombatus ursinus",
			"Wallaby": "Wallabia bicolor",
			"Echidna": "Tachyglossus aculeatus",
			"Platypus": "Ornithorhynchus anatinus",
		  };

		  let currentDate = new Date();

		  let hours = currentDate.getHours();
		  let minutes = currentDate.getMinutes();
		  let day = currentDate.getDate();
		  let month = currentDate.getMonth() + 1; 
		  let year = currentDate.getFullYear();
		  
		  let suffix = hours >= 12 ? 'pm' : 'am';
		  hours = hours % 12;
		  hours = hours ? hours : 12; // the hour '0' should be '12'
		  
		  minutes = minutes < 10 ? '0' + minutes : minutes;
		  
		  let formattedDate = `${hours}:${minutes}${suffix} - ${day}/${month}/${year}`;
		  
		  console.log(formattedDate);
		  

		  
		const recordData = {
		  name: officialAnimalNames[selectedAnimal],
		  sciname: scientificAnimalNames[selectedAnimal],
		  latitude: this.state.latitude,
    	  longitude: this.state.longitude,
		  date: formattedDate, 
		  fact: "User Record"
		};

		async function addRecord() {
			const docRef = await addDoc(collection(db, "Animals2.2"), {
			  name: recordData.name,
			  sciname: recordData.sciname,
			  date: recordData.date,
			  latitude: recordData.latitude,
			  longitude: recordData.longitude,
			  fact: recordData.fact
			});
			console.log("Document written with ID: ", docRef.id);
		  }
		addRecord()
	  };
}


  