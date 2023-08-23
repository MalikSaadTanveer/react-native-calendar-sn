import * as React from 'react';

import { CalendarMonth } from 'react-native-calendar-sn';

export default function App() {

  return (
      <CalendarMonth  events={[]}  // type="day"  eventDate={{ year:2023, month:9, date:23, }}
      />
    
  );
}

