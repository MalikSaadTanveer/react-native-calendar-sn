import 'react-native-gesture-handler';

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import RenderCalendar from './renderCalendar';
import moment, { Moment } from 'moment';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { colors } from '../../utils/colors';

const CalendarMonth: React.FC = ({ navigation }: any) => {
  const [viewHeight, setViewHeight] = useState(0);

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
    // const itemHeight = 190;
    const itemHeight = viewHeight;
    const newTopItemIndex = Math.floor(offsetY / itemHeight);
    if (newTopItemIndex !== topItemIndex) setTopItemIndex(newTopItemIndex);

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

  return (
    <GestureHandlerRootView
      style={{ width: '100%', flexGrow: 1, backgroundColor: 'white' }}
    >
      {/* <View style={styles.container}> */}
      {/* <View style={styles.buttonContainer}>
          <Text style={styles.header}>{startMonth.format('MMMM YYYY')}</Text>
        </View> */}
      <>
        <View style={styles.dayContainer}>
          {daysOfTheWeek.map((item, index) => (
            <Text style={styles.dayText} key={index}>
              {item}
            </Text>
          ))}
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 60, flexGrow: 1 }}
          onScroll={handleScroll}
          ref={scrollViewRef}
          snapToInterval={210}
        >
          {numberOfMonths.map((item, index) => (
            <RenderCalendar
              opacity={topItemIndex === index}
              num={item}
              key={item}
              setViewHeight={setViewHeight}
              navigation={navigation}
            />
          ))}
          {loader && <ActivityIndicator size={'large'} />}
        </ScrollView>
      </>
    </GestureHandlerRootView>
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
    color: colors.primary,
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
