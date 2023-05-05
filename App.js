import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Search from './Components/Search';
import FilmDetail from './Components/FilmDetails';
import WatchlistScreen from './Components/WatchlistScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Search"
        screenOptions={({ navigation }) => ({ // update screenOptions with ({ navigation })
          headerStyle: {
            backgroundColor: '#FFFFFF',
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 1,
          },
          headerTintColor: '#000000',
          headerTitleAlign: 'center',
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => navigation.navigate('Watchlist')}
              >
                <Ionicons name="heart-outline" size={24} color="#000000" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="settings-outline" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
          ),
          
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Image 
                style={{marginLeft: 10, width: 120, height: 30}}
                source={require('./cineverse_logo.png')} 
              />
            </TouchableOpacity>
          ),
          headerTitle: '' //empty ^^ 
        })}
      >
        <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen name="FilmDetail" component={FilmDetail}/>
        <Stack.Screen name="Watchlist" component={WatchlistScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
