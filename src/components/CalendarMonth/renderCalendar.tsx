import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment, { Moment } from 'moment';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { PinchGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';


type RenderCalendarTypes = {
  num: number;
  opacity: boolean
};

const RenderCalendar = ({ opacity, num }: RenderCalendarTypes): JSX.Element => {
  const currentDate1 = moment().clone().add(num, 'month');
  // useState<Moment>(moment().clone().add(num,'month'));
  const monthStart: Moment = currentDate1.clone().startOf('month');
  const monthEnd: Moment = currentDate1.clone().endOf('month');
  const startDate: Moment = monthStart.clone().startOf('week');
  const endDate: Moment = monthEnd.clone().endOf('week');
  let scale = useSharedValue(1);
  let baseScale = useSharedValue(1);
  const pinchRef = useRef();


  const pinchGestureHandler = useAnimatedGestureHandler({
    onActive: ({ scale: pinchScale }) => {
      scale.value = baseScale.value * pinchScale;
    },
    onEnd: () => {
      baseScale.value = scale.value;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    // return {
    //     transform: [{ scale: scale.value }],
    // }
    if (scale.value > 1) {
      return {
        transform: [{ scale: scale.value > 1.1 ? 1.1 : scale.value }],
      }
    }
    else {
      return {
        transform: [{ scale: scale.value < 0.95 ? 0.95 : scale.value }],
      };
    }
  });

  const handleZoomEnd = () => {
    console.warn(" I am zoomed in")
  };




  const calendar: JSX.Element[] = [];
  let currentDate: Moment = startDate.clone();

  while (currentDate.isSameOrBefore(endDate)) {
    const week: JSX.Element[] = [];

    for (let i = 0; i < 7; i++) {
      if (
        currentDate.isBefore(monthStart)
        ||
        currentDate.isAfter(monthEnd)
      ) {
        week.push(
          <View
            style={styles.row}
            key={`${currentDate.format('YYYY-MM-DD')}-week-${i}`}
          >
            <View style={styles.dateContainer}>
            </View>
          </View>);
        currentDate = currentDate.add(1, 'day');
      } else {
        week.push(
          <View
            style={styles.row}
            key={`${currentDate.format('YYYY-MM-DD')}-week-${i}`}
          >
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{currentDate.format('D')}</Text>
              <View style={styles.dateTextBottom} />
            </View>
          </View>
        );
        currentDate = currentDate.add(1, 'day');
      }
    }

    calendar.push(
      <View style={styles.row} key={`${currentDate.format('YYYY-MM-DD')}-week`}>
        {week}
      </View>
    );
  }

  {/* <Text style={styles.header}>{currentDate1.format('MMMM YYYY')}</Text> */}
  return (
    <>
       <PinchGestureHandler
                ref={pinchRef}
                onGestureEvent={opacity && pinchGestureHandler}
                onHandlerStateChange={ opacity ?  ({ nativeEvent }) => {
                    if (nativeEvent.state === State.END) {
                        console.log(scale.value, baseScale.value)
                        if (scale.value < 1) {
                            console.log("go back")
                            return
                        }
                        handleZoomEnd();
                    }
                }:undefined}
            >
                <Animated.View style={[styles.calendarContainer,(opacity && animatedStyle), { opacity: opacity ? 1 : 0.3 }]} key={num}>
                

            {calendar}
                </Animated.View>
            </PinchGestureHandler>



    {/* <View style={[styles.calendarContainer, { opacity: opacity ? 1 : 0.3 }]} key={num}>
      {calendar}
    </View> */}
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  calendarContainer: {
    // backgroundColor:'red',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  header: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    width: 34,
    position: 'relative'
  },
  dateText: {
    fontSize: 16,
    color: 'black',
  },
  dateTextBottom: {
    height: 16,
    width: 34,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    position: 'absolute',
    bottom: 0,
  },
});


export default RenderCalendar;