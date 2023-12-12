import 'react-native-gesture-handler';
import _ from 'lodash';
import React, {
  useState,
  useRef,
  useMemo,
  useContext,
  useEffect,
  // useCallback,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  VirtualizedList,
} from 'react-native';

import RenderCalendar from './renderCalendar';
import moment from 'moment';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { EventContext } from '../../utils/context';
import { colors } from '../../utils/colors';
import dayjs from 'dayjs';
const CalendarMonth: React.FC = ({ navigation }: any) => {
  const { myEvents,jumpToCurrentMonth,setEventDate, setJumpToCurrentMonth }: any = useContext(EventContext);
  const [topItemIndex, setTopItemIndex] = useState(12); //0
  const [numberOfMonths, setNumberOfMonths] = useState(
    // Array.from(Array(12).keys())
    Array.from(Array(25).keys(), (item) => item - 12)
  );
  const [itemHeights, setItemHeights] = useState<any>([]);
  const hasEffectRun = useRef(false);

  const [loader, setLoader] = useState(false);
  const [isCalendarListTouched, setIsCalendarListTouched]: any =
    useState(false);
  const [isMonthListTouched, setIsMonthListTouched]: any = useState(false);

  const scrollViewRef: any = useRef(null);
  const monthNamesRef: any = useRef(null);
  var daysOfTheWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const monthAPIData = useMemo(() => convertFormat1(myEvents), [myEvents]);
  function convertFormat1(data: any) {
    const result: any = [];

    data?.forEach((item: any) => {
      const startDate = dayjs(item.start).format('YYYY-MM-DD');
      const endDate = dayjs(item.end).format('YYYY-MM-DD');

      const date1 = dayjs(startDate);
      const date2 = dayjs(endDate);
      const diffInDays = date2.diff(date1, 'day');

      for (let i = 0; i <= diffInDays; i++) {
        const currentDate = date1.add(i, 'day').format('YYYY-MM-DD');
        const existingDate = result.find((el: any) => el.date === currentDate);

        if (existingDate) {
          existingDate.timeSlots.push({
            startSlot:
              i == 0
                ? new Date(item.start).toTimeString().slice(0, 5)
                : '00:00',
            endSlot:
              i == diffInDays
                ? new Date(item.end).toTimeString().slice(0, 5)
                : '23:59',
          });
        } else {
          result.push({
            date: currentDate,
            timeSlots: [
              {
                startSlot:
                  i == 0
                    ? new Date(item.start).toTimeString().slice(0, 5)
                    : '00:00',
                endSlot:
                  i == diffInDays
                    ? new Date(item.end).toTimeString().slice(0, 5)
                    : '23:59',
              },
            ],
          });
        }
      }
    });

    return result;
  }
  const handleScrollBegin = (listType: any) => {
    if (listType === 'calendar') {
      setIsCalendarListTouched(true);
      setIsMonthListTouched(false);
    } else if (listType === 'month') {
      setIsMonthListTouched(true);
      setIsCalendarListTouched(false);
    }
  };
  const isCalendarListTouchedRef = useRef(isCalendarListTouched);
  const isMonthListTouchedRef = useRef(isMonthListTouched);
  useEffect(() => {
    isCalendarListTouchedRef.current = isCalendarListTouched;
    isMonthListTouchedRef.current = isMonthListTouched;
  }, [isCalendarListTouched, isMonthListTouched]);

  const handleViewableItemsChanged = ({ viewableItems }: any) => {
    
    if (viewableItems.length > 0 && isCalendarListTouchedRef.current) {
      setTopItemIndex(viewableItems[0].key);
      monthNamesRef.current.scrollToIndex({
        index: viewableItems[0].key,
        animated: true,
        viewPosition: 0.5,
      });
    }
  };
  const handleViewableItemsChanged2 = ({ viewableItems }: any) => {
    // console.log(viewableItems, 'viewableItem2');
    if (viewableItems.length > 0 && isMonthListTouchedRef.current) {
      setTopItemIndex(viewableItems[0].key);
      scrollViewRef.current.scrollToIndex({
        index: viewableItems[0].key,
        animated: true,
        viewPosition: 0.5,
      });
    }
  };
  const viewabilityConfigCallbackPairs = React.useRef([
    {
      viewabilityConfig: {
        minimumViewTime: 50,
        itemVisiblePercentThreshold: 80,
      },
      onViewableItemsChanged: handleViewableItemsChanged,
    },
  ]);

  const viewabilityConfigCallbackPairs2 = React.useRef([
    {
      viewabilityConfig: {
        minimumViewTime: 50,
        itemVisiblePercentThreshold: 80,
      },
      onViewableItemsChanged: handleViewableItemsChanged2,
    },
  ]);

  const onEndReached = () => {
    setLoader(true);
    setTimeout(() => {
    // setNumberOfMonths((prevMonths: any) => {
    //   let arr = [...prevMonths];
    //   for (let i = 0; i < 12; i++) {
    //     arr.push(prevMonths?.length - 1 + 1 + i);
    //   }
    //   return arr;
    // });

    const lastItem = numberOfMonths[numberOfMonths.length - 1];
    const newItems = Array.from(Array(12).keys()).map(
      (item) => item + (lastItem !== undefined ? lastItem : 0) + 1
    );
    setNumberOfMonths((prevArray) => prevArray.concat(newItems));

    setLoader(false);
    }, 200);
  };

  const handleItemLayout =
    // useCallback((event: any, index: any) =>
    (event: any, index: any) => {
      const { height } = event.nativeEvent.layout;
      setItemHeights((prevHeights: any) => {
        const newHeights = [...prevHeights];
        newHeights[index] = height;
        return newHeights;
      });
    };
  // ,[]);
  // console.log(itemHeights)
  // const getItemLayout = useMemo(
  //   () => (_: any, index: any) => ({
  //     length: itemHeights[index] || 200, // Use the measured height or a default height
  //     offset: itemHeights[index - 1] ? itemHeights[index - 1] : 0,
  //     index,
  //   }),
  //   [itemHeights]
  // );

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    // Set a threshold value to determine when you are at the top
    const threshold = 0;
    // console.log("offsetY",offsetY)
    if (offsetY <= threshold) {
      setLoader(true);
      setTimeout(() => {
        // console.log('Reached the top!');
        const newStartingPoint = numberOfMonths[0] || 0;
        const newNegativeItems = Array.from(Array(12).keys())
          .map((item) => newStartingPoint - (item + 1))
          .reverse();
        setNumberOfMonths((prevArray) => [...newNegativeItems, ...prevArray]);
        // console.log(newNegativeItems, numberOfMonths)
        if (itemHeights.length > 12) {
          // const offset = itemHeights
          //   .slice(0, 12)
          //   .reduce((sum: any, height: any) => sum + height, 0);

          // Scroll to the calculated offset when the component mounts
          // scrollViewRef.current.scrollToOffset({
          //   offset,
          //   animated: false,
          // });
          setTopItemIndex(12);
          scrollViewRef.current.scrollToIndex({
            index: 12,
            animated: false,
          });
          monthNamesRef.current.scrollToIndex({
            index: 12,
            animated: false,
          });
          setLoader(false);
        }
      }, 200);
    }
  };


  useEffect(()=>{
    if(jumpToCurrentMonth && scrollViewRef.current){
      let index = numberOfMonths.indexOf(0)
      setTopItemIndex(index)
      scrollViewRef.current.scrollToIndex({
        index:index+1,
        animated: false,
        viewPosition: 0.5,
      });
      monthNamesRef.current.scrollToIndex({
        index:index+1,
        animated: false,
        viewPosition: 0.5,
      });
      if(setJumpToCurrentMonth)  {
        setJumpToCurrentMonth(false)
        setEventDate()
      }
    
   }
  },[jumpToCurrentMonth])

  let renderItems = (item: any) => {
    return (
      <RenderCalendar
        onLayout={(event: any) => handleItemLayout(event, item.index)}
        opacity={topItemIndex === item.index}
        // num={item.index}
        num={item.item[item.index]}
        key={item.index}
        navigation={navigation}
        // scrollViewRef={scrollViewRef}
        monthAPIData={monthAPIData}
      />
    );
  };

  useEffect(() => {
    if (!hasEffectRun.current) {
      // console.log('hello1');
      if (itemHeights.length > 12) {
        // console.log('hello2');

        hasEffectRun.current = true;
        const offset = itemHeights
          .slice(0, 12)
          .reduce((sum: any, height: any) => sum + height, 0);

        // Scroll to the calculated offset when the component mounts
        scrollViewRef.current.scrollToOffset({
          offset,
          animated: false,
        });
        monthNamesRef.current.scrollToOffset({
          offset: 440,
          animated: false,
        });
      }
    }
  }, [itemHeights]);

  // useEffect(() => {
  //   scrollViewRef.current.scrollToOffset({
  //     offset: 2496,
  //     animated: false,
  //   });
  //   monthNamesRef.current.scrollToOffset({
  //     offset: 440,
  //     animated: false,
  //   });
  // }, []);

  // useEffect(() => {
  //   if (itemHeights.length > 12) {
  //     // Reverse the index because the data is inverted
  //     const index = itemHeights.length - 1 - 12;

  //     // Scroll to the calculated index when the component mounts
  //     scrollViewRef.current.scrollToIndex({
  //       index,
  //       animated: true,
  //     });
  // }, [itemHeights]);
  //   }

  // console.log("scrollViewRef",scrollViewRef )
  let CalendarComponentJSX = useMemo(() => {
    return (
      <VirtualizedList
        initialNumToRender={25}
        // initialScrollIndex={13}
        style={{ flexGrow: 1 }}
        contentContainerStyle={{ marginBottom: 60 }}
        getItemCount={(_data: unknown) => numberOfMonths.length}
        getItem={() => numberOfMonths}
        keyExtractor={(_: any, index: any) => index}
        scrollEventThrottle={16}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        renderItem={renderItems}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={() => handleScrollBegin('calendar')}
        refreshing={true}
        // getItemLayout={getItemLayout}
        onScroll={handleScroll}
        // onMomentumScrollEnd={(event) => {
        //   const offsetY = event.nativeEvent.contentOffset.y;
        //   const index = Math.floor(offsetY / 208); // ITEM_HEIGHT is the height of each item

        //   setTopItemIndex(index);
        // }}
      />
    );
  }, [numberOfMonths,topItemIndex, myEvents]);

  let renderMonthNames = useMemo(() => {
    return (item: any) => (
      <View style={styles.monthNamesItems}>
        <Text
          style={{
            ...styles.monthNamesItemsText,
            color: topItemIndex === item.index ? 'black' : 'lightgrey',
            fontWeight: topItemIndex === item.index ? 'bold' : 'normal',
            fontSize: topItemIndex === item.index ? 18 : 14,
          }}
        >
          {moment()
            .clone()
            // .add(item.index, 'month')
            .add(item.item[item.index], 'month')
            .format('MMMM')
            .toUpperCase()
            .substring(0, 3)}
          ,
          {' ' +
            moment().clone().add(item.item[item.index], 'month').format('YYYY')}
        </Text>
      </View>
    );
  }, [topItemIndex, numberOfMonths]);

  return (
    <GestureHandlerRootView
      style={{ width: '100%', flexGrow: 1, backgroundColor: 'white' }}
    >
      <>
        {loader && <ActivityIndicator size={'large'} />}

        <View style={{ height: 120 }}>
          <VirtualizedList
            initialNumToRender={25}
            getItemCount={(_data: unknown) => numberOfMonths.length}
            getItem={() => numberOfMonths}
            keyExtractor={(_: any, index: any) => index}
            renderItem={renderMonthNames}
            contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
            ref={monthNamesRef}
            // scrollEnabled={false}
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs2.current
            }
            disableIntervalMomentum={false}
            disableScrollViewPanResponder={false}
            onScrollBeginDrag={() => handleScrollBegin('month')}
            // onScroll={handleScroll}
          />
        </View>
        <View style={styles.dayContainer}>
          {daysOfTheWeek.map((item, index) => (
            <Text style={styles.dayText} key={index}>
              {item}
            </Text>
          ))}
        </View>

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
  monthNamesItems: {
    // backgroundColor:'red',
    padding: 8,
    height: 37,
  },
  monthNamesItemsText: {
    fontSize: 14,
  },
});

export default CalendarMonth;
