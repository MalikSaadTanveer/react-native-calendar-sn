import { StyleSheet, Text,View, Dimensions,Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
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
import plusImage from '../../assets/plus.png'

const CalendarWeek = () => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const [weeks, setWeeks] = useState([]);
  const [slotHighlight, setSlotHightlight] = useState('');



  useEffect(() => {
    const date = moment([2023, 6 - 1, 19]);
    const startOfWeek = date.clone().startOf('isoWeek');
    const endOfWeek = date.clone().endOf('isoWeek');
    let weekArr: any = [{ day: null, date: null }];
    for (
      let day = startOfWeek.clone();
      day.isSameOrBefore(endOfWeek);
      day.add(1, 'day')
    ) {
      const dayOfWeek = day.format('dddd').substring(0, 3);
      const dayOfMonth = day.format('DD');
      weekArr.push({
        day: dayOfWeek,
        date: dayOfMonth,
      });
      console.log(dayOfWeek, dayOfMonth);
    }

    setWeeks(weekArr);
  }, []);

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
        { scaleY:scale.value > 1 ? scale.value : 1 },
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
      fontSize: 12 - (scale.value * 2)
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

  const handleSlotButton = (index:number,ind:number)=>{
    setSlotHightlight(`${index}${ind}`)
  }

  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}
    >
      <Animated.View style={[styles.container]}>
        <Animated.View style={[styles.top,{zIndex:1}]}>
          {weeks?.length > 0 &&
            weeks.map((item: any, index: number) => (
              <Animated.View
                key={index}
                style={[
                  styles.card,
                  {backgroundColor:
                    index === 0 ? 'transparent' : colors.backgroundColor,}
                ]}
              >
                <Text style={styles.weekDay}>{item.day}</Text>
                <Text style={styles.weekDate}>{item.date}</Text>
              </Animated.View>
            ))}
        </Animated.View>
        
        <Animated.ScrollView style={[styles.slotsContainer,slotStyle]}>
        
          {/* <AView style={rStyle} ></View> */}
          {timeSlots.map((item, index) => (
            <Animated.View key={index} style={styles.slotsInner}>
              <Animated.View style={styles.timeContainer}>
                <Animated.Text style={[styles.timeText,timeFontStyle]}>{item.time}</Animated.Text>
              </Animated.View>
              {
                Array.from({length: 7}, (_, index) => index + weeks[1]?.date || 0 ).map((_,ind) =>(
                  <TouchableOpacity style={[styles.singleSlot]} key={ind} onPress={()=>handleSlotButton(index,ind)}>
                    {
                      slotHighlight === `${index}${ind}` && 
                      <TouchableOpacity style={styles.clickSlot} onPress={()=>console.warn("I am pressed")}>  
                      <Image source={plusImage} style={{width:12,height:12}} />
                    </TouchableOpacity>}
                  </TouchableOpacity>
                ))
              }
            </Animated.View>
          ))}
        </Animated.ScrollView>
      </Animated.View>
    </PinchGestureHandler>
  );
};

export default CalendarWeek;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
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
    flexGrow:1
  },
  clickSlot:{
    width:'100%',
    height:'100%',
    borderWidth:0.5,
    borderColor:colors.primary,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:8,
  },
  timeContainer:{
    width:'12.3%',
    height:60,
    justifyContent:'flex-end',
    alignItems:'flex-end',
    // marginRight:4,
    paddingRight:4,
  },
  timeText: {
    color: colors.tertiary,
    fontSize:12,
  },
  singleSlot:{
    backgroundColor:'transparent',
    borderWidth:0.3,
    borderColor:'rgba(0, 0, 0, 0.16)',
    width:'12.1%',
    height:60,
  },
  slotsInner:{
    flexDirection:'row'
  }
});
