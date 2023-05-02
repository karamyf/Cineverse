import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Search from './Components/Search';
import FilmDetail from './Components/FilmDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
              initialRouteName="Search"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#FFFFFF',
                  shadowColor: '#000000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 2,
                  elevation: 1,
                },
                headerTintColor: '#000000',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
                headerRight: () => (
                  <View style={{flexDirection: 'row', marginRight: 10}}>
                    <TouchableOpacity style={{marginRight: 10}}>
                      <Ionicons name="notifications-outline" size={24} color="#000000" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Ionicons name="settings-outline" size={24} color="#000000" />
                    </TouchableOpacity>
                  </View>
                ),
                headerLeft: () => (
                  <Image 
                    style={{marginLeft: 10, width: 120, height: 30}}
                    source={{uri: 'https://dummyimage.com/120x30/000000/fff.png&text=Logo'}} 
                  />
                )
              }}>
                <Stack.Screen name="Search" component={Search}/>
                <Stack.Screen name="FilmDetail" component={FilmDetail}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
