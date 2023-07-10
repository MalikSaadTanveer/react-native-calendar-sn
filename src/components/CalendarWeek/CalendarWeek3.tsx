import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { Calendar } from '../../src/index';
import moment from 'moment';
import {
  customEventRenderer,
  events,
  spanningEvents,
} from '../../stories/events';
import { colors } from '../../utils/colors';
import { AuthContext } from '../../utils/context';

const height = Dimensions.get('window').height;
const CalendarWeek3 = () => {
  const [mode, setMode]:any = useState('week');

  return (
    <AuthContext.Provider value={{mode, setMode}}>
      <Calendar
        events={events}
        height={height}
        mode={mode}
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
          console.log(moment.parseZone(date, 'HH:mm'));
        }}
      />
    </AuthContext.Provider>
  );
};

export default CalendarWeek3;

const styles = StyleSheet.create({});
