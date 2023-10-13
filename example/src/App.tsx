import * as React from 'react';

import { CalendarMonth } from 'react-native-calendar-sn';


export default function App() {
  return (
    <CalendarMonth
      events={[
        // {
        //   title: 'Hello to everyone',
        //   start: dayjs().add(0, 'day').set('hour', 2).set('minute', 0).toDate(),
        //   end: dayjs().add(0, 'day').set('hour', 7).set('minute', 30).toDate(),
        // },
        // {
        //   title: 'Hello to everyone',
        //   start: dayjs().add(0, 'day').set('hour', 5).set('minute', 0).toDate(),
        //   end: dayjs().add(0, 'day').set('hour', 10).set('minute', 30).toDate(),
        // },
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
          start: new Date("2023-10-10T16:00:05.327+00:00".slice(0,19)),
          end: new Date("2023-10-13T05:00:02.333+00:00".slice(0,19)),
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
          start: new Date("2023-10-15T23:00:05.327+00:00".slice(0,19)),
          end: new Date("2023-10-15T23:59:02.333+00:00".slice(0,19)),
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
          start: new Date("2023-10-15T03:00:05.327+00:00".slice(0,19)),
          end: new Date("2023-10-15T03:30:02.333+00:00".slice(0,19)),
          status: "false",
          createdAt: "2023-10-11T10:23:07.929+00:00",
          updatedAt: "2023-10-11T10:23:07.929+00:00",
      },
      // {
      //     _id: "6526778bdc9e2ed3f468613c",
      //     title: "Level 3",
      //     location: "Model town",
      //     participants: [],
      //     description: " ",
      //     user_id: "65267702dc9e2ed3f4685a09",
      //     start: new Date("2023-10-11T07:00:05.327+00:00"),
      //     end: new Date("2023-10-11T08:00:05.333+00:00"),
      //     status: "false",
      //     createdAt: "2023-10-11T10:23:07.929+00:00",
      //     updatedAt: "2023-10-11T10:23:07.929+00:00",
      // },
      // {
      //     _id: "6526778bdc9e2ed3f468613c",
      //     title: "Level 4",
      //     location: "Model town",
      //     participants: [],
      //     description: " ",
      //     user_id: "65267702dc9e2ed3f4685a09",
      //     start: new Date("2023-10-11T16:00:00.327"),
      //     end: new Date("2023-10-12T19:00:00.333"),
      //     status: "false",
      //     createdAt: "2023-10-11T10:23:07.929+00:00",
      //     updatedAt: "2023-10-11T10:23:07.929+00:00",
      // },
      ]} // type="day"  eventDate={{ year:2023, month:9, date:23, }}
    />
  );
}
