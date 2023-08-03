import React, { useEffect, } from 'react';
import { LogBox, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarMonth from '../components/CalendarMonth/CalendarMonth';
// import CalendarWeek from '../components/CalendarWeek/CalendarWeek';
// import CalendarWeek from '../components/CalendarWeek/CalendarWeek2';
import CalendarWeek from '../components/CalendarWeek/CalendarWeek3';

import CalendarDate from '../components/CalendarDate/CalendarDate';
import { navigationString } from '../utils/navigationString';
// import Dummy from '../Dummy';
const Stack = createNativeStackNavigator();
import { GestureHandlerRootView } from 'react-native-gesture-handler';



function CalendarNavigation() {
  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();
  }, []);

  // const opacityTransition: object = {
  //   gestureDirection: 'horizontal', // we will swipe right if we want to close the screen;
  //   transitionSpec: {
  //     open: {
  //       animation: 'timing',
  //     },
  //     close: {
  //       animation: 'timing',
  //       config: {
  //         duration: 300,
  //       },
  //     },
  //   },
  //   cardStyleInterpolator: ({
  //     current,
  //   }: {
  //     current: { progress: number };
  //   }) => ({
  //     cardStyle: {
  //       opacity: current.progress,
  //     }, // updates the opacity depending on the transition progress value of the current screen
  //   }),
  // };

  return (
    <GestureHandlerRootView
      style={{ width: '100%', flexGrow: 1, backgroundColor: 'white' }}
    >
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            // ...opacityTransition,
          }}
        >
          <Stack.Screen
            name={navigationString.CalendarMonth}
            component={CalendarMonth}
          />
          <Stack.Screen name={navigationString.CalendarWeek}
           component={CalendarWeek}
          />

          <Stack.Screen
            name={navigationString.CalendarDate}
            component={CalendarDate}
          />
          {/* <Stack.Screen name="Dummy" component={Dummy} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
export default CalendarNavigation;
