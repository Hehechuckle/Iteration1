// import React from 'react';
// import {
//   View,
//   SafeAreaView,
//   Image
// } from 'react-native';
// import Carousel from 'react-native-snap-carousel';

// export default class App extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = {
//           activeIndex:0,
//           carouselItems: [
//             {
//               image: require('../../assets/images/hotspots/koala1.png'),
//             },
//             {
//                 image: require('../../assets/images/hotspots/echidna1.png'),
//               },
//             {
//               image: require('../../assets/images/hotspots/kangaroo1.png'),
//             },
//             {
//                 image: require('../../assets/images/hotspots/wallaby1.png'),
//               },
//             {
//               image: require('../../assets/images/hotspots/wombat1.png'),
//             },
//             {
//                 image: require('../../assets/images/hotspots/platypus.png'),
//               },
//             {
//              image: require('../../assets/images/hotspots/koala2.png'),
//             },
//             {
//                 image: require('../../assets/images/hotspots/echidna2.png'),
//               },
//             {
//              image: require('../../assets/images/hotspots/kangaroo2.png'),
//             },
//             {
//                 image: require('../../assets/images/hotspots/koala3.png'),
//               },
//             {
//              image: require('../../assets/images/hotspots/wallaby3.png'),
//             },
//             {
//                 image: require('../../assets/images/hotspots/wombat2.png'),
//               },
//               {
//                 image: require('../../assets/images/hotspots/koala4.png'),
//               },
//               {
//                 image: require('../../assets/images/hotspots/kangaroo3.png'),
//               },
//               {
//                 image: require('../../assets/images/hotspots/wombat3.png'),
//               },
//               {
//                 image: require('../../assets/images/hotspots/koala5.png'),
//               },
//               {
//                 image: require('../../assets/images/hotspots/kangaroo4.png'),
//               },
//               {
//                 image: require('../../assets/images/hotspots/wombat4.png'),
//               },
//               {
//                 image: require('../../assets/images/hotspots/koala6.png'),
//               },
//               {
//                 image: require('../../assets/images/hotspots/echidna3.png'),
//               },
            
//           ]
//         }
//     }

//     _renderItem({item,index}){
//         return (
//           <View style={{
//               borderRadius: 5,
//               height: 300,  
//               padding: 50,
//               marginLeft: 10,
//               }}>
//             <Image source={item.image} style={{width: '100%', height: '100%'}} resizeMode='contain' />
//           </View>
//         )
//     }

//     render() {
//         return (
//           <SafeAreaView style={{flex: 1, paddingTop: 50, }}>
//             <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
//                 <Carousel
//                   layout={"default"} 
//                   ref={ref => this.carousel = ref}
//                   data={this.state.carouselItems}
//                   sliderWidth={400}  
//                   itemWidth={400}  
//                   renderItem={this._renderItem}
//                   onSnapToItem = { index => this.setState({activeIndex:index}) } />
//             </View>
//           </SafeAreaView>
//         );
//     }
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative',
//     alignItems: 'center',
// 	justifyContent: 'center',
//   },
//   guideImage: {
//     width: 400,
//     height: 100,
//   },

//   hotspotImage:{
//     width: '100%',
//     height: undefined,
//     aspectRatio: 1,
//   },

//   link: {
//     width: '100%',
//     height: 150,
// 	top: 140,
// 	position: 'absolute',
//     borderRadius: 20, 
// 	alignItems: 'center',
//     left:10
//   },

//   hotspotContainer: {
//     width: '93%',
//     height: 300,
//     // position: 'absolute',
//     top: -60,
//     left: 5
//   },

//   recentContainer: {
//     width: '93%',
//     height: 300,
//     position: 'absolute',
//     top: 450,
//     left: 18
//   },

//   verticalSpacer: {
//     height: 20,
//   },

//   loadingImage: {
//     width: '100%',
//     height: '100%',
//   },

//   slideImage: {
//     width: 300, 
//     height: 100, 
//     marginRight: 10, 
//   },

// });
