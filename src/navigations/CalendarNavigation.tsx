import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarMonth from '../components/CalendarMonth/CalendarMonth';
import CalendarWeek from '../components/CalendarWeek/CalendarWeek';
import CalendarDate from '../components/CalendarDate/CalendarDate';
import { navigationString } from '../utils/navigationString';
import { createSharedElementStackNavigator, } from 'react-navigation-shared-element';
// createSharedElementStackNavigator


// const Stack = createNativeStackNavigator();
const Stack = createSharedElementStackNavigator();

function CalendarNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown:false
      }}>
        <Stack.Screen name={navigationString.CalendarMonth} component={CalendarMonth} />
        <Stack.Screen name={navigationString.CalendarWeek} component={CalendarWeek}
          sharedElements={(route,otherRoute,showing)=>{
            return ['item']
          }}
        />
        <Stack.Screen name={navigationString.CalendarDate} component={CalendarDate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default CalendarNavigation