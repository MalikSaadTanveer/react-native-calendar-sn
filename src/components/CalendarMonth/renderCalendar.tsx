import React, {  useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment, { Moment } from 'moment';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  // withTiming,
} from 'react-native-reanimated';
import {
  PinchGestureHandler,
  State,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { navigationString } from '../../utils/navigationString';
import { colors } from '../../utils/colors';

type RenderCalendarTypes = {
  num: number;
  opacity?: boolean;
  setViewHeight?: any;
  navigation?: any;
  setScrollEnabled?: any;
  onLayout?:any,
  scrollViewRef?: any;
  monthAPIData?: any;
};

const RenderCalendar = ({
  opacity,
  num,
  onLayout,
  // setViewHeight,
  navigation,
  // setScrollEnabled,
  // setDynamicViewHeight,
  
  monthAPIData,
}: RenderCalendarTypes): JSX.Element => {
  
  const currentDate1 = moment().clone().add(num, 'month');
  // useState<Moment>(moment().clone().add(num,'month'));
  const monthStart: Moment = currentDate1.clone().startOf('month');
  const monthEnd: Moment = currentDate1.clone().endOf('month');
  const startDate: Moment = monthStart.clone().startOf('week');
  const endDate: Moment = monthEnd.clone().endOf('week');
  const dynamicViewRef: any = useRef(null);

  // const [matchingSlots, setMatchingSlots] = useState([]);
  const timeSlots: any = [];

  const viewRef = useRef(null);
  useEffect(() => {}, []);


  let renderSlotsStripes = (timeSlotsArray: any) => {
    const matchingSlots: any = [];
    let currentTime = moment('00:00', 'HH:mm');
    const endTime = moment('23:00', 'HH:mm');

    while (currentTime.isSameOrBefore(endTime)) {
      // const slotStartTime = currentTime.format('HH:mm');
      // const slotEndTime = currentTime.add(1, 'hours').format('HH:mm');
      const slotStartTime = moment.parseZone(currentTime, 'HH:mm');
      const slotEndTime = moment.parseZone(
        currentTime.add(1, 'hours'),
        'HH:mm'
      );

      timeSlots.push({ start: slotStartTime, end: slotEndTime });
    }
    const slotStartTime = moment.parseZone('23:00', 'HH:mm');
    const slotEndTime = moment.parseZone('00:00', 'HH:mm').add(1, 'day');

    timeSlots.push({ start: slotStartTime, end: slotEndTime });

    for (let i = 0; i < timeSlotsArray.length; i++) {
      const inputStartTime = moment.parseZone(
        timeSlotsArray[i].startSlot,
        'HH:mm'
      );
      const inputEndTime = moment
        .parseZone(timeSlotsArray[i].endSlot, 'HH:mm')
        .isSameOrBefore(moment.parseZone(timeSlotsArray[i].startSlot, 'HH:mm'))
        ? moment.parseZone(timeSlotsArray[i].endSlot, 'HH:mm').add(1, 'day')
        : moment.parseZone(timeSlotsArray[i].endSlot, 'HH:mm');
      
      
      timeSlots.forEach((slot: any, index: number) => {
        if (
          (inputStartTime.isSameOrBefore(slot.start) &&
            inputEndTime.isSameOrAfter(slot.end)) ||
          inputStartTime.isBetween(slot.start, slot.end, null, '[)') ||
          inputEndTime.isBetween(slot.start, slot.end, null, '()')
        ) {
          matchingSlots.push(index);
        }
      });
    }

    return (
      <>
        <View style={styles.slotsStripsContainer}>
          {Array.from({ length: 24 }, (_, index) => index).map(
            (item, index) => (
              <View
                key={index}
                style={{
                  ...styles.singleStip,
                  backgroundColor: matchingSlots.includes(item)
                    ? 'rgba(0, 0, 0, 0.1)'
                    : 'transparent',
                }}
              />
            )
          )}
        </View>
      </>
    );
  };

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
        // baseScale.value = scale.value;
        // scale.value = withTiming(1);
      },
    });

  const animatedStyle = useAnimatedStyle(() => {
    // return {
    //     transform: [{ scale: scale.value }],
    // }
    if (scale.value > 1) {
      return {
        // paddingVertical:20 * scale.value,
        transform: [{ scaleY: scale.value > 1.2 ? 1.2 : scale.value }],
        // transform: [{ scaleY: scale.value }],
      };
    } else {
      return {
        // paddingVertical:  scale.value,
        transform: [{ scaleY: scale.value < 0.95 ? 0.95 : scale.value }],
      };
    }
  });

  // const handleZoomEnd = () => {
  //   console.warn(" I am zoomed in")
  // };

  const handleZoomIn = () => {
    
    const actualData = moment().clone().add(num, 'month');
    const data = {
      year:
        actualData.format('YYYY-MM') == moment(new Date()).format('YYYY-MM')
          ? parseInt(moment(new Date()).format('YYYY'))
          : parseInt(actualData.format('YYYY')),
      month:
        actualData.format('YYYY-MM') == moment(new Date()).format('YYYY-MM')
          ? parseInt(moment(new Date()).format('MM'))
          : parseInt(actualData.format('MM')),
      date:
        actualData.format('YYYY-MM') == moment(new Date()).format('YYYY-MM')
          ? parseInt(moment(new Date()).format('DD'))
          : 1,
    };
    
    navigation.navigate(navigationString.CalendarWeek, {
      calendar: data,
    });
    scale.value = 1;

  };
  // const handleZoomOut = () => {};

  const calendar: JSX.Element[] = [];
  let currentDate: Moment = startDate.clone();

  const getBorder = (date: any) => {
    if (moment(new Date()).format('YYYY-MM-DD') === date) {
      return {
        borderColor: colors.primary,
        borderRadius: 6,
        borderWidth: 1,
      };
    } else {
      return undefined;
    }
  };

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
      } else {
        let timeSlotsfromAPIData = monthAPIData.filter(
          (item: any) => item.date == currentDate.format('YYYY-MM-DD')
        );
        week.push(
          <View
            style={styles.row}
            key={`${currentDate.format('YYYY-MM-DD')}-week-${i}`}
          >
            {timeSlotsfromAPIData.length > 0 &&
              renderSlotsStripes(timeSlotsfromAPIData[0]?.timeSlots)}
            <View
              style={{
                ...styles.dateContainer,
                ...getBorder(currentDate.format('YYYY-MM-DD')),
              }}
            >
              <Text style={styles.dateText}>{currentDate.format('D')}</Text>
            </View>
          </View>
        );
      }
      currentDate = currentDate.add(1, 'day');
    }

    calendar.push(
      
      <View style={styles.row} key={`${currentDate.format('YYYY-MM-DD')}-week`}>
        {week}
      </View>
     
    );
  }

  
  return (
    <>
      <PinchGestureHandler
        ref={pinchRef}
        // waitFor={() => !scrollViewRef.current.isScrolling}
        onGestureEvent={opacity ? pinchGestureHandler : undefined}
        onHandlerStateChange={
          opacity
            ? ({ nativeEvent }) => {
                if (nativeEvent.state === State.BEGAN) {
                  // handleZoomIn();
                }
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
          onLayout={onLayout}
            ref={dynamicViewRef}
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
    // height:208,
    // backgroundColor:'red'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 2,
    position: 'relative',
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
    paddingVertical: 6,
    width: 34,
  },
  dateText: {
    fontSize: 16,
    color: 'black',
  },
  slotsStripsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
  },
  singleStip: {
    height: '4.30%',
   
  },

});

// export default React.memo(RenderCalendar);
export default RenderCalendar;
