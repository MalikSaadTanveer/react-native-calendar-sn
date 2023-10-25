import {   Dimensions } from 'react-native';
import React, { useState,useContext, useEffect } from 'react';
import { Calendar } from '../../src/index';
import moment from 'moment';
import { colors } from '../../utils/colors';
import { AuthContext, EventContext } from '../../utils/context';



const height = Dimensions.get('window').height;
const CalendarWeek3 = ({route}:any) => {
  const { calendar, eventInfo } = route.params;

  
  const [mode, setMode]:any = useState('week');
  const { myEvents,type, onEventPress, eventDate, setEventDate }: any = useContext(EventContext);
  const _calendar = eventDate || eventInfo || calendar
  const [calendarDate, setCalendarDate]:any = useState(moment([_calendar.year, _calendar.month -1, _calendar.date]))

  useEffect(()=>{
    if(eventDate){
      const _calendar = eventDate || eventInfo || calendar
      setCalendarDate(moment([_calendar.year, _calendar.month -1, _calendar.date]))
    }

    return ()=>{
      if(setEventDate){
        setEventDate()
      }
    }
  },[eventDate])

  return (
    <AuthContext.Provider value={{mode, setMode}}>
      <Calendar
        events={myEvents}
        height={height}
        mode={type || mode}
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
          console.log("I am event",event);
          
          if(onEventPress) onEventPress(event)
        
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


