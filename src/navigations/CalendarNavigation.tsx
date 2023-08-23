import React, { useEffect,  } from 'react';
import { LogBox } from 'react-native';
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
import { EventContext } from '../utils/context';
// import dayjs from 'dayjs';
interface CalendarEventProps {
  events: any;
  type?:any;
  eventDate?:any
}

function CalendarNavigation({ events, type, eventDate }: CalendarEventProps) {
  // const [myEvents, setMyEvents] = useState<any>( events ||
  //   [{
  //     title: 'Hello to everyone',
  //     start: dayjs().add(1, 'day').set('hour', 2).set('minute', 45).toDate(),
  //     end: dayjs().add(1, 'day').set('hour', 7).set('minute', 30).toDate(),
  //   },]
  //   );

  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();
    // setMyEvents(events ||
    //   [{
    //     title: 'Hello to everyone',
    //     start: dayjs().add(1, 'day').set('hour', 2).set('minute', 45).toDate(),
    //     end: dayjs().add(1, 'day').set('hour', 7).set('minute', 30).toDate(),
    //   },])
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
    <EventContext.Provider value={{ myEvents:events, type }}>
      <GestureHandlerRootView
        style={{ width: '100%', flexGrow: 1, backgroundColor: 'white' }}
      >
        <NavigationContainer independent={true}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              // ...opacityTransition,
            }}
            initialRouteName={type ? navigationString.CalendarWeek : navigationString.CalendarMonth}
          >
            <Stack.Screen
              name={navigationString.CalendarMonth}
              component={CalendarMonth}
            />
            <Stack.Screen
              name={navigationString.CalendarWeek}
              component={CalendarWeek}
              initialParams={{ eventInfo: eventDate ? {
                year: eventDate.year,
                month: eventDate.month,
                date: eventDate.date
              }
              :
              null
            }}
            />

            <Stack.Screen
              name={navigationString.CalendarDate}
              component={CalendarDate}
            />
            {/* <Stack.Screen name="Dummy" component={Dummy} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </EventContext.Provider>
  );
}
export default CalendarNavigation;
