import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarMonth from '../components/CalendarMonth/CalendarMonth';
import CalendarWeek from '../components/CalendarWeek/CalendarWeek';
import CalendarDate from '../components/CalendarDate/CalendarDate';
import { navigationString } from '../utils/navigationString';
// import { createSharedElementStackNavigator,SharedElement } from 'react-navigation-shared-element';
// createSharedElementStackNavigator
import Dummy from '../Dummy'
const Stack = createNativeStackNavigator();
// const Stack = createSharedElementStackNavigator();

function CalendarNavigation() {
  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={navigationString.CalendarMonth}
          component={CalendarMonth}
        />
        <Stack.Screen
          name={navigationString.CalendarWeek}
          component={CalendarWeek}
          // sharedElements={(route, otherRoute, showing) => {
          //   return [`calendar${route.params.calendar}`];
          // }}
        />
        <Stack.Screen
          name={navigationString.CalendarDate}
          component={CalendarDate}
        />
        <Stack.Screen
          name="Dummy"
          component={Dummy}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default CalendarNavigation;
