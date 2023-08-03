import {   Dimensions } from 'react-native';
import React, { useState } from 'react';
import { Calendar } from '../../src/index';
import moment from 'moment';
// import {
//   customEventRenderer,
//   events,
//   spanningEvents,
// } from '../../stories/events';
import { colors } from '../../utils/colors';
import { AuthContext } from '../../utils/context';
import dayjs from 'dayjs'



const height = Dimensions.get('window').height;
const CalendarWeek3 = ({route}:any) => {
  const { calendar } = route.params;
  const [mode, setMode]:any = useState('week');
  const [calendarDate, setCalendarDate]:any = useState(moment([calendar.year, calendar.month -1, calendar.date]))


  return (
    <AuthContext.Provider value={{mode, setMode}}>
      <Calendar
        // events={events}
        events={[
          {
            title: 'Watch Boxing',
            start: dayjs().set('hour', 2).set('minute', 0).set('second', 0).toDate(),
            end: dayjs().set('hour', 4).set('minute', 30).toDate(),
          },
          {
            title: 'Meeting',
            start: dayjs().set('hour', 10).set('minute', 0).toDate(),
            end: dayjs().set('hour', 11).set('minute', 30).toDate(),
          },
        ]}
        height={height}
        mode={mode}
        date={calendarDate}
        showAllDayEventCell={false}
        calendarContainerStyle={{
          backgroundColor: colors.backgroundColor,
        }}
        bodyContainerStyle={{
          backgroundColor: colors.backgroundColor,
        }}
        headerContainerStyle={{
          backgroundColor: colors.secondary,
          paddingVertical: 20,
        }}
        headerContentStyle={{
          backgroundColor: colors.backgroundColor,
          marginHorizontal: 2,
          paddingVertical: 10,
          height: 70,
          borderRadius: 6,
        }}
        dayHeaderHighlightColor={colors.primary}
        dayHeaderStyle={{
          backgroundColor: 'white',
          
        }}
        weekDayHeaderHighlightColor={colors.primary}
        onPressEvent={(event: any) => {
          console.log(event);
        }}
        onPressCell={(date) => {
          // console.log(moment.parseZone(date, 'HH:mm'));
          console.log(date);
        }}
        onPressDateHeader={(date)=>{
          console.log(date)
          setCalendarDate(date)
          setMode('day')
        }}
      />
    </AuthContext.Provider>
  );
};

export default CalendarWeek3;


