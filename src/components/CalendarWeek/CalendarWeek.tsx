import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  // ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  // GestureHandlerRootView,
} from 'react-native-gesture-handler';

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  // withTiming,
} from 'react-native-reanimated';
import { colors } from '../../utils/colors';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
// const { width, height } = Dimensions.get('window');
// import { useRoute } from '@react-navigation/native';
import { navigationString } from '../../utils/navigationString';
// import { SharedElement } from 'react-navigation-shared-element'

const screenWidth = Dimensions.get('window').width;
const CalendarWeek = ({ navigation, route }: any) => {
  // const route = useRoute();
  const { calendar } = route.params;
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const [weeks, setWeeks] = useState<any>([]);
  const [slotHighlight, setSlotHightlight] = useState('');
  // console.log(calendar.year, calendar.month - 1, calendar.date)
  useEffect(() => {
    // weeksSetup();
    monthSetup();
  }, []);

  // const weeksSetup = () => {
  //   const date = moment([calendar.year, calendar.month - 1, calendar.date]);
  //   // const startOfWeek = date.clone().startOf('isoWeek');
  //   const startOfWeek = date.clone().startOf('week');
  //   // const endOfWeek = date.clone().endOf('isoWeek');
  //   const endOfWeek = date.clone().endOf('week');
  //   let weekArr: any = [{ day: null, date: null }];
  //   for (
  //     let day = startOfWeek.clone();
  //     day.isSameOrBefore(endOfWeek);
  //     day.add(1, 'day')
  //   ) {
  //     const dayOfWeek = day.format('dddd').substring(0, 3);
  //     const dayOfMonth = day.format('DD');
  //     weekArr.push({
  //       day: dayOfWeek,
  //       date: dayOfMonth,
  //     });
  //   }

  //   // setWeeks((pre): any => [...pre, ...weekArr]);
  // };

  const monthSetup = () => {
    const date = moment([calendar.year, calendar.month - 1, calendar.date]);
    const endOfMonth = date.clone().endOf('month'); // Get the end of the month
    let weekArr: any[] = []; // Create an array to store the weeks

    while (date.isSameOrBefore(endOfMonth)) {
      let week: any[] = [{day:null,date:null}]; // Create an array to store the days of the week

      // Iterate over the days of the week (starting from Sunday)
      for (let i = 0; i < 7; i++) {
        const dayOfWeek = date.format('dddd').substring(0, 3);
        const dayOfMonth = date.format('DD');

        week.push({
          day: dayOfWeek,
          date: dayOfMonth,
        });

        date.add(1, 'day'); // Move to the next day
      }

      weekArr.push(week); // Add the week to the array of weeks
    }

    setWeeks(weekArr);
  };
  console.log('weeks', weeks);

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: (event) => {
        scale.value = event.scale;
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      },
      onEnd: () => {
        // scale.value = withTiming(1);
      },
    });

  const slotStyle = useAnimatedStyle(() => {
    return {
      transform: [
        // { translateX: focalX.value },
        // { translateY: focalY.value },
        // { translateX: -width / 2 },
        // { translateY: -height / 2 },
        { scaleY: scale.value > 1 ? scale.value : 1 },
        // { translateX: -focalX.value },
        // { translateY: -focalY.value },
        // { translateX: width / 2 },
        // { translateY: height / 2 },
      ],
    };
  });

  const timeFontStyle = useAnimatedStyle(() => {
    return {
      // transform: [
      //   { translateX: focalX.value },
      //   { translateY: focalY.value },
      //   { translateX: -width / 2 },
      //   { translateY: -height / 2 },
      //   { scale:scale.value > 1 ? scale.value:1 },
      //   { translateX: -focalX.value },
      //   { translateY: -focalY.value },
      //   { translateX: width / 2 },
      //   { translateY: height / 2 },
      // ],
      // marginHorizontal:scale.value * 4
      fontSize: 12 - scale.value * 2,
    };
  });

  const timeSlots = [
    {
      time: '1 AM',
      slots: 7,
      duration: 60,
    },
    {
      time: '2 AM',
      slots: 7,
      duration: 60,
    },
    {
      time: '3 AM',
      slots: 7,
      duration: 60,
    },
    {
      time: '4 AM',
      slots: 7,
      duration: 60,
    },
    {
      time: '5 AM',
      slots: 7,
      duration: 60,
    },
    {
      time: '6 AM',
      slots: 7,
      duration: 60,
    },
    {
      time: '7 AM',
      slots: 7,
      duration: 60,
    },
    {
      time: '8 AM',
      slots: 7,
      duration: 60,
    },
    {
      time: '9 AM',
      slots: 7,
      duration: 60,
    },
    {
      time: '10 AM',
      slots: 7,
      duration: 60,
    },
    {
      time: '11 AM',
      slots: 7,
      duration: 60,
    },
    {
      time: '12 PM',
      slots: 7,
      duration: 60,
    },
    {
      time: '1 PM',
      slots: 7,
      duration: 60,
    },
    {
      time: '2 PM',
      slots: 7,
      duration: 60,
    },
    {
      time: '3 PM',
      slots: 7,
      duration: 60,
    },
    {
      time: '4 PM',
      slots: 7,
      duration: 60,
    },
    {
      time: '5 PM',
      slots: 7,
      duration: 60,
    },
    {
      time: '6 PM',
      slots: 7,
      duration: 60,
    },
    {
      time: '7 PM',
      slots: 7,
      duration: 60,
    },
    {
      time: '8 PM',
      slots: 7,
      duration: 60,
    },
    {
      time: '9 PM',
      slots: 7,
      duration: 60,
    },
    {
      time: '10 PM',
      slots: 7,
      duration: 60,
    },
    {
      time: '11 PM',
      slots: 7,
      duration: 60,
    },
    {
      time: '12 PM',
      slots: 7,
      duration: 60,
    },
  ];

  const handleSlotButton = (index: number, ind: number) => {
    setSlotHightlight(`${index}${ind}`);
  };

  return (
    // <GestureHandlerRootView style={{ width: '100%', flexGrow: 1, backgroundColor: 'white' }}>

    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <Animated.ScrollView
        horizontal
        contentContainerStyle={{ flexGrow: 1 }}
        snapToInterval={screenWidth}
        decelerationRate={0.2}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      >
        {weeks?.map((fullWeek:any,index:any) => (
          <Animated.View key={index} style={[styles.container]}>
            <View style={[styles.top, { zIndex: 1 }]}>
              {fullWeek?.length > 0 &&
                fullWeek.map((item: any, index: number) => (
                  <View
                    key={index}
                    style={[
                      styles.card,
                      {
                        backgroundColor:
                          index == 0 ? 'transparent' : colors.backgroundColor,
                      },
                    ]}
                  >
                    <Text style={styles.weekDay}>{item.day}</Text>
                    <Text style={styles.weekDate}>{item.date}</Text>
                  </View>
                ))}
            </View>

            <Animated.ScrollView style={[styles.slotsContainer, slotStyle]}>
              {timeSlots.map((item, index) => (
                <Animated.View key={index} style={styles.slotsInner}>
                  <Animated.View style={styles.timeContainer}>
                    <Animated.Text style={[styles.timeText, timeFontStyle]}>
                      {item.time}
                    </Animated.Text>
                  </Animated.View>
                  {Array.from(
                    { length: item.slots },
                    (_, index) => index + weeks[1]?.date || 0
                  ).map((_, ind) => (
                    <TouchableOpacity
                      style={[styles.singleSlot]}
                      key={ind}
                      onPress={() => handleSlotButton(index, ind)}
                    >
                      {slotHighlight === `${index}${ind}` && (
                      <TouchableOpacity
                        style={styles.clickSlot}
                        onPress={() =>
                          navigation.navigate(navigationString.CalendarDate)
                        }
                      >
                        <Image
                          source={require('../../assets/icons/plus.png')}
                          style={{ width: 12, height: 12 }}
                        />
                      </TouchableOpacity>
                    )}
                    </TouchableOpacity>
                  ))}
                </Animated.View>
              ))}
            </Animated.ScrollView>
          </Animated.View>
        ))}
      </Animated.ScrollView>
    </PinchGestureHandler>

    // <View>
    //   <Text>Hello</Text>
    // </View>
    // </GestureHandlerRootView>
  );
};

export default CalendarWeek;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    width: screenWidth,
  },
  top: {
    backgroundColor: colors.secondary,
    flexDirection: 'row',
    paddingVertical: 21,
  },
  card: {
    backgroundColor: colors.backgroundColor,
    width: '11.1%',
    marginHorizontal: '0.5%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 10,
  },
  weekDay: {
    color: colors.primary,
    fontSize: 12,
  },
  weekDate: {
    color: colors.tertiary,
    fontSize: 14,
  },
  slotsContainer: {
    // backgroundColor: 'red',
    // width:'140%'
    flexGrow: 1,
  },
  clickSlot: {
    width: '100%',
    height: '100%',
    borderWidth: 0.5,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  timeContainer: {
    width: '12.3%',
    height: 60,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // marginRight:4,
    paddingRight: 4,
  },
  timeText: {
    color: colors.tertiary,
    fontSize: 12,
  },
  singleSlot: {
    backgroundColor: 'transparent',
    borderWidth: 0.3,
    borderColor: 'rgba(0, 0, 0, 0.16)',
    width: '12.1%',
    height: 60,
  },
  slotsInner: {
    flexDirection: 'row',
  },
});
