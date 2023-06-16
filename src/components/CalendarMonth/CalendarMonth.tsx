import 'react-native-gesture-handler'

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { ScrollView } from 'react-native';
import RenderCalendar from './renderCalendar';
import moment, { Moment } from 'moment';

const CalendarMonth: React.FC = () => {
  const animatedValue = useState(new Animated.Value(0))[0];
  let newTopItemIndex = 0;
  const [startMonth, setStartMonth] = useState<Moment>(
    moment().clone().add(0, 'month')
  );
  const [topItemIndex, setTopItemIndex] = useState(0);

  const [numberOfMonths, setNumberOfMonths] = useState(
    Array.from(Array(12).keys())
  );
  const [loader, setLoader] = useState(false);
  const scrollViewRef: any = useRef(null);
  var daysOfTheWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const handleScroll = (event: any): void => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

    const isAtBottom =
      parseInt(layoutMeasurement.height + contentOffset.y) + 100 >=
      parseInt(contentSize.height);

    const offsetY = event.nativeEvent.contentOffset.y;
    const itemHeight = 190;
    const newTopItemIndex = Math.floor(offsetY / itemHeight);
    if(newTopItemIndex !== topItemIndex)
      setTopItemIndex(newTopItemIndex);

    // const offsetY = event.nativeEvent.contentOffset.y;
    // const itemHeight = 190;
    // newTopItemIndex = Math.floor(offsetY / itemHeight);

    //   console.log(newTopItemIndex)
    //   Animated.timing(animatedValue, {
    //     toValue: newTopItemIndex,
    //     duration: 300,
    //     useNativeDriver: false,
    //   }).start();
    

    if (isAtBottom && loader == false) {
      setLoader(true);
      setTimeout(() => {
        setNumberOfMonths((prevMonths: any) => {
          for (let i = 0; i < 12; i++) {
            prevMonths.push(
              prevMonths.length > 0 ? prevMonths[prevMonths?.length - 1] + 1 : 0
            );
          }
          return prevMonths;
        });
        setLoader(false);
      }, 1000);
    }
  };

  const getOverlayPosition = () => {
    const inputRange = [newTopItemIndex,newTopItemIndex]
    const outputRange = [newTopItemIndex,newTopItemIndex]
    return animatedValue.interpolate({
        inputRange,
        outputRange,
        extrapolate: 'clamp',
    });
};
console.log(getOverlayPosition())

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={styles.header}>{startMonth.format('MMMM YYYY')}</Text>
      </View>
      <View style={styles.dayContainer}>
        {daysOfTheWeek.map((item, index) => (
          <Text style={styles.dayText} key={index}>
            {item}
          </Text>
        ))}
      </View>
      <ScrollView
        style={{ width: '100%', paddingBottom: 60 }}
        contentContainerStyle={{ paddingBottom: 60, flexGrow: 1 }}
        onScroll={handleScroll}
        ref={scrollViewRef}
      >
        {numberOfMonths.map((item, index) => (
          <RenderCalendar
            opacity={topItemIndex === index}
            // opacity={Number(getOverlayPosition()) === index}
            num={item}
            key={item}
          />
        ))}
        
        {loader && <ActivityIndicator size={'large'} />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  calendarContainer: {
    // marginBottom: 20,
    width: '100%',
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
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    borderBottomColor: '#40BA8E',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#40BA8E',
    width: 34,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    width: '100%',
  },
});

export default CalendarMonth;
