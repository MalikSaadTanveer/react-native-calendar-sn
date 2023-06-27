import React, { useEffect, lazy, Suspense } from 'react';
import { LogBox, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarMonth from '../components/CalendarMonth/CalendarMonth';
// import CalendarWeek from '../components/CalendarWeek/CalendarWeek';
import CalendarWeek from '../components/CalendarWeek/CalendarWeek2';

import CalendarDate from '../components/CalendarDate/CalendarDate';
import { navigationString } from '../utils/navigationString';
// import { createSharedElementStackNavigator,SharedElement } from 'react-navigation-shared-element';
// createSharedElementStackNavigator
import Dummy from '../Dummy';
const Stack = createNativeStackNavigator();
// const Stack = createSharedElementStackNavigator();
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const CalendarWeekComponent = React.lazy(() => import('../components/CalendarWeek/CalendarWeek2'));

function CalendarNavigation() {
  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();
  }, []);

  const opacityTransition: object = {
    gestureDirection: 'horizontal', // we will swipe right if we want to close the screen;
    transitionSpec: {
      open: {
        animation: 'timing',
      },
      close: {
        animation: 'timing',
        config: {
          duration: 300,
        },
      },
    },
    cardStyleInterpolator: ({
      current,
    }: {
      current: { progress: number };
    }) => ({
      cardStyle: {
        opacity: current.progress,
      }, // updates the opacity depending on the transition progress value of the current screen
    }),
  };

  return (
    <GestureHandlerRootView
      style={{ width: '100%', flexGrow: 1, backgroundColor: 'white' }}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...opacityTransition,
          }}
        >
          <Stack.Screen
            name={navigationString.CalendarMonth}
            component={CalendarMonth}
          />
          <Stack.Screen name={navigationString.CalendarWeek}
           component={CalendarWeek}
          />
            {/* {() => {
              <Suspense fallback={<ActivityIndicator />}>
                <CalendarWeekComponent />
              </Suspense>;
            }} */}
          {/* </Stack.Screen> */}
          <Stack.Screen
            name={navigationString.CalendarDate}
            component={CalendarDate}
          />
          <Stack.Screen name="Dummy" component={Dummy} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
export default CalendarNavigation;
