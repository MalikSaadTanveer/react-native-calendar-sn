import * as React from 'react';
import {Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootStackScreen from './RootStack';
import { CalendarMonth } from 'react-native-calendar-sn';


export default function App() {
  return (

    <NavigationContainer independent={true}>
      <RootStackScreen/>
    </NavigationContainer>
      // <CalendarMonth  events={[]}  // type="day"  eventDate={{ year:2023, month:9, date:23, }}
      // />
    
  );
}
