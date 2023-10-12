import * as React from 'react';

import { CalendarMonth } from 'react-native-calendar-sn';
import dayjs from 'dayjs';

export default function App() {
  return (


      <CalendarMonth  events={ [
        {
        title: 'Hello to everyone',
        start: dayjs().add(0, 'day').set('hour', 2).set('minute', 0).toDate(),
        end: dayjs().add(0, 'day').set('hour', 7).set('minute', 30).toDate(),
      },
        {
        title: 'Hello to everyone',
        start: dayjs().add(0, 'day').set('hour', 5).set('minute', 0).toDate(),
        end: dayjs().add(0, 'day').set('hour', 10).set('minute', 30).toDate(),
      },
  
    ]}  // type="day"  eventDate={{ year:2023, month:9, date:23, }}
      />
     
  );
}
