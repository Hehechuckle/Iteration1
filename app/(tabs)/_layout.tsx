import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Text, View} from '../../components/Themed';
import { Pressable, useColorScheme, Image } from 'react-native';


import Colors from '../../constants/Colors';


function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        header: () => <View style={{ height: 30 }} />,
        tabBarActiveTintColor: '#21C392', // Change this value to your desired color
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/map.png')}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="test"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      /> */}
      <Tabs.Screen
        name="two"
        options={{
          title: 'Info',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/Info.png')}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="record"
        options={{
          title: 'Record',
          tabBarIcon: ({ color }) => <TabBarIcon name="camera" color={color} />,
        }}
      />
    </Tabs>
  );
}
