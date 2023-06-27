import 'react-native-gesture-handler';

import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  VirtualizedList,
  FlatList,
} from 'react-native';
import { SharedValue, useSharedValue } from 'react-native-reanimated';
import RenderCalendar from './renderCalendar';
import moment, { Moment } from 'moment';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { SharedElement } from 'react-navigation-shared-element';

import { colors } from '../../utils/colors';

const CalendarMonth: React.FC = ({ navigation }: any) => {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  // const topItemIndex = useSharedValue(0)
  const [startMonth, setStartMonth] = useState<Moment>(
    moment().clone().add(0, 'month')
  );
  const [topItemIndex, setTopItemIndex] = useState(0);
  const [dynamicViewHeight, setDynamicViewHeight] = useState(200);
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
    // const itemHeight = viewHeight;
    const newTopItemIndex = Math.floor(offsetY / itemHeight);
    if (newTopItemIndex !== topItemIndex) setTopItemIndex(newTopItemIndex);

    if (isAtBottom && loader == false) {
      setLoader(true);
      setTimeout(() => {
        setNumberOfMonths((prevMonths: any) => {
          for (let i = 0; i < 12; i++) {
            prevMonths.push(
              prevMonths.length > 0 ? prevMonths[prevMonths?.length - 1] + 1 : 0
              // prevMonths.length > 0 ? i + 1 + prevMonths.length : 0
            );
          }
          return prevMonths;
        });
        setLoader(false);
      }, 1000);
    }
  };

  const DEBOUNCE_DELAY = 200;
  let debounceTimeout: any = null;

  const handleViewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0 ) {
      console.log('Hello', viewableItems[0]);
      setTopItemIndex(viewableItems[0].key);
      // topItemIndex.value = viewableItems[0].key
    }
    // if (debounceTimeout) {
    //   clearTimeout(debounceTimeout);
    // }

    // debounceTimeout = setTimeout(() => {
    //   // Perform state update or any other action here
    //   if (viewableItems.length > 0) {
    //     console.log('Hello', viewableItems[0]);
    //     setTopItemIndex(viewableItems[0].key);
    //   }
    //   console.log('Debounced state update');
    // }, DEBOUNCE_DELAY);
  };

  const viewabilityConfigCallbackPairs = React.useRef([
    {
      viewabilityConfig: {
        minimumViewTime: 50,
        itemVisiblePercentThreshold: 30,
      },
      onViewableItemsChanged: handleViewableItemsChanged,
    },
  ]);

  const onEndReached = ()=>{
    setLoader(true);
          setTimeout(() => {
            setNumberOfMonths((prevMonths: any) => {
              // for (let i = 0; i < 12; i++) {
              //   prevMonths.push(
              //     prevMonths.length > 0
              //       // ? prevMonths[prevMonths?.length - 1] + 1
              //       ? (prevMonths?.length - 1) + 1 + i
              //       : 0
              //   );
              // }
              // console.log('PRE', prevMonths);
              let arr = [...prevMonths]
              for (let i = 0; i < 12; i++) {
                arr.push((prevMonths?.length - 1) + 1 + i)
              }
              console.log('PRE', arr);

              return arr;
            });
            setLoader(false);
          }, 1000);
  }

  let renderItems = useMemo(() => {
    return (item: any) => (
      <RenderCalendar
        opacity={topItemIndex === item.index}
        num={item.index}
        key={item.index}
        navigation={navigation}
        setScrollEnabled={setScrollEnabled}
        setDynamicViewHeight={setDynamicViewHeight}
      />
    );
  }, [topItemIndex]);

  let CalendarComponentJSX = useMemo(() => {
    return (
      <VirtualizedList
        // snapToInterval={200}
        // data={numberOfMonths}
        style={{ flexGrow: 1 }}
        
        initialNumToRender={12}
        contentContainerStyle={{ marginBottom: 60 }}
        getItemCount={(_data: unknown) => numberOfMonths.length}
        getItem={(item: any,index:any) => numberOfMonths}
        keyExtractor={(item: any, index: any) => index}
        scrollEventThrottle={16}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        // scrollEnabled={scrollEnabled}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        renderItem={renderItems}
      />
    );
  }, [numberOfMonths,topItemIndex]);

  return (
    <GestureHandlerRootView
      style={{ width: '100%', flexGrow: 1, backgroundColor: 'white' }}
    >
      {/* <View style={styles.container}> */}
      {/* <View style={styles.buttonContainer}>
          <Text style={styles.header}>{startMonth.format('MMMM YYYY')}</Text>
        </View> */}
      <>
       {loader && <ActivityIndicator size={'large'} />}
        <View style={styles.dayContainer}>
          {daysOfTheWeek.map((item, index) => (
            <Text style={styles.dayText} key={index}>
              {item}
            </Text>
          ))}
        </View>
        {/* <ScrollView
          contentContainerStyle={{ paddingBottom: 60, flexGrow: 1 }}
          onScroll={handleScroll}
          ref={scrollViewRef}
          snapToInterval={200}
        >
          {numberOfMonths.map((item, index) => (
            <RenderCalendar
              opacity={topItemIndex === index}
              num={item}
              key={item}
              // setViewHeight={setViewHeight}
              navigation={navigation}
            />
          ))}
          {loader && <ActivityIndicator size={'large'} />}
        </ScrollView> */}

        {/* <VirtualizedList
          // snapToInterval={200}
          data={numberOfMonths}
          style={{ flexGrow: 1 }}
          contentContainerStyle={{ marginBottom: 60 }}
          getItemCount={(_data: unknown) => numberOfMonths.length}
          getItem={(_data: unknown) => _data}
          keyExtractor={(item: any, index: any) => index}
          scrollEventThrottle={16} 
          
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          // scrollEnabled={scrollEnabled}
          onEndReached={() => {
            setLoader(true);
            setTimeout(() => {
              setNumberOfMonths((prevMonths: any) => {
                for (let i = 0; i < 12; i++) {
                  prevMonths.push(
                    prevMonths.length > 0
                      ? prevMonths[prevMonths?.length - 1] + 1
                      : 0
                  );
                }
                console.log('PRE', prevMonths);
                return prevMonths;
              });
              setLoader(false);
            }, 1000);
          }}
          onEndReachedThreshold={0.5}
          renderItem={renderItems}
        /> */}
        {CalendarComponentJSX}
       
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
