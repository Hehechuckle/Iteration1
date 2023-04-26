// import React, { useState } from 'react';

// import { View } from 'react-native';

// import DropDownPicker from 'react-native-dropdown-picker';

// export default function App() {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(['italy', 'spain', 'finland']);
//   const [items, setItems] = useState([
//     {label: 'Spain', value: 'spain'},
//     {label: 'Madrid', value: 'madrid'},
//     {label: 'Barcelona', value: 'barcelona'},
//     {label: 'Italy', value: 'italy'},
//     {label: 'Rome', value: 'rome'},
//     {label: 'Finland', value: 'finland'}
//   ]);

//   return (
//     <View style={{
//       backgroundColor: '#171717',
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//       paddingHorizontal: 15
//     }}>
//       <DropDownPicker
//         open={open}
//         value={value}
//         items={items}
//         setOpen={setOpen}
//         setValue={setValue}
//         setItems={setItems}

//         maxHeight={500}
//         dropDownDirection='AUTO'

//         theme="DARK"
//         multiple={true}
//         mode="BADGE"
//         badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
//       />
//     </View>
//   );
// }