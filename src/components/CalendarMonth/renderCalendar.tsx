import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment, { Moment } from 'moment';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  PinchGestureHandler,
  State,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { navigationString } from '../../utils/navigationString';

type RenderCalendarTypes = {
  num: number;
  opacity: boolean;
  setViewHeight: any;
  navigation:any
};

const RenderCalendar = ({
  opacity,
  num,
  setViewHeight,
  navigation,
}: RenderCalendarTypes): JSX.Element => {
  const currentDate1 = moment().clone().add(num, 'month');
  // useState<Moment>(moment().clone().add(num,'month'));
  const monthStart: Moment = currentDate1.clone().startOf('month');
  const monthEnd: Moment = currentDate1.clone().endOf('month');
  const startDate: Moment = monthStart.clone().startOf('week');
  const endDate: Moment = monthEnd.clone().endOf('week');

  const viewRef = useRef(null);
  useEffect(() => {
    if (viewRef.current) {
      if (opacity === true) {
        // viewRef?.current?.measure((x, y, width, height) => {
        //   console.log(height)
        //   setViewHeight(height);
        // });
      }
    }
  }, [opacity]);

  let scale = useSharedValue(1);
  let baseScale = useSharedValue(1);
  const pinchRef = useRef();

  const pinchGestureHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: ({ scale: pinchScale }: any) => {
        scale.value = baseScale.value * pinchScale;
        // scale.value =  pinchScale;
      },
      onEnd: () => {
        baseScale.value = scale.value;
        // scale.value = withTiming(1);
      },
    });

  const animatedStyle = useAnimatedStyle(() => {
    // return {
    //     transform: [{ scale: scale.value }],
    // }
    if (scale.value > 1) {
      return {
        transform: [{ scaleY: scale.value > 1.2 ? 1.2 : scale.value }],
      };
    } else {
      return {
        transform: [{ scaleY: scale.value < 0.95 ? 0.95 : scale.value }],
      };
    }
  });

  // const handleZoomEnd = () => {
  //   console.warn(" I am zoomed in")
  // };

  const handleZoomIn = () => {
    console.log("I am going to calendarWeek")
    navigation.navigate(navigationString.CalendarWeek)
  };
  const handleZoomOut = () => {
    
  };

  const calendar: JSX.Element[] = [];
  let currentDate: Moment = startDate.clone();

  while (currentDate.isSameOrBefore(endDate)) {
    const week: JSX.Element[] = [];

    for (let i = 0; i < 7; i++) {
      if (currentDate.isBefore(monthStart) || currentDate.isAfter(monthEnd)) {
        week.push(
          <View
            style={styles.row}
            key={`${currentDate.format('YYYY-MM-DD')}-week-${i}`}
          >
            <View style={styles.dateContainer}></View>
          </View>
        );
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

  {
    /* <Text style={styles.header}>{currentDate1.format('MMMM YYYY')}</Text> */
  }
  return (
    <>
      <PinchGestureHandler
        ref={pinchRef}
        onGestureEvent={opacity && pinchGestureHandler}
        onHandlerStateChange={
          opacity
            ? ({ nativeEvent }) => {
                console.log("hello")
                if (nativeEvent.state === State.END) {
                  if (scale.value < 1) {
                    console.warn('go back');
                    return;
                  }
                  handleZoomIn();
                }
              }
            : undefined
        }
      >
        <Animated.View ref={viewRef}>
          <Animated.View
            style={[
              styles.calendarContainer,
              opacity && animatedStyle,
              { opacity: opacity ? 1 : 0.3 },
            ]}
            key={num}
          >
            {calendar}
          </Animated.View>
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
    position: 'relative',
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
