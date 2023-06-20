import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { CalendarMonth } from 'react-native-calendar-sn';

export default function App() {

  return (
    
      <CalendarMonth />
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'red'
    // alignItems: 'center',
    // justifyContent: 'center',
  },
 
});
