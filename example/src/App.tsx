import * as React from 'react';

import { CalendarMonth } from 'react-native-calendar-sn';


export default function App() {
  return (
    <CalendarMonth
      events={[
        {
          _id: "6526778bdc9e2ed3f468613c",
          title: "Level 1",
          location: "Model town",
          participants: [],
          description: " ",
          user_id: "65267702dc9e2ed3f4685a09",
          start: new Date("2023-10-10T10:00:05.327+00:00".slice(0,19)),
          end: new Date("2023-10-10T12:00:05.327+00:00".slice(0,19)),
          status: "false",
          createdAt: "2023-10-11T10:23:07.929+00:00",
          updatedAt: "2023-10-11T10:23:07.929+00:00",
      },
        {
          _id: "6526778bdc9e2ed3f468613c",
          title: "Level 2",
          location: "Model town",
          participants: [],
          description: " ",
          user_id: "65267702dc9e2ed3f4685a09",
          start: new Date("2023-12-10T16:00:05.327+00:00".slice(0,19)),
          end: new Date("2023-12-13T05:00:02.333+00:00".slice(0,19)),
          status: "false",
          createdAt: "2023-12-12T10:23:07.929+00:00",
          updatedAt: "2023-12-12T10:23:07.929+00:00",
      },
        {
          _id: "6526778bdc9e2ed3f468613c",
          title: "Level 2",
          location: "Model town",
          participants: [],
          description: " ",
          user_id: "65267702dc9e2ed3f4685a09",
          start: new Date("2023-12-15T23:00:05.327+00:00".slice(0,19)),
          end: new Date("2023-12-15T23:59:02.333+00:00".slice(0,19)),
          status: "false",
          createdAt: "2023-12-12T10:23:07.929+00:00",
          updatedAt: "2023-12-12T10:23:07.929+00:00",
      },
        {
          _id: "6526778bdc9e2ed3f468613c",
          title: "Level 2",
          location: "Model town",
          participants: [],
          description: " ",
          user_id: "65267702dc9e2ed3f4685a09",
          start: new Date("2023-12-17T03:00:05.327+00:00".slice(0,19)),
          end: new Date("2023-12-17T08:30:02.333+00:00".slice(0,19)),
          status: "false",
          createdAt: "2023-12-11T10:23:07.929+00:00",
          updatedAt: "2023-12-11T10:23:07.929+00:00",
      },
   
      ]} // type="day"  eventDate={{ year:2023, month:9, date:23, }}
      // onEmptySlotPress={(date:any)=>{console.log("I am outer",date)}}
    />
  );
}
