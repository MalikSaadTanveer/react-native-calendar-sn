# react-native-calendar-sn

React Native Calendar Library from SiliconNexus

## Installation

```sh
npm install react-native-calendar-sn
```

## Usage

```js
import { CalendarMonth } from 'react-native-calendar-sn';;

// ...
<CalendarMonth
      events={[
        {
          title: "Level 1",
          start: new Date("2023-10-10T10:00:05.327+00:00".slice(0,19)),
          end: new Date("2023-10-10T12:00:05.327+00:00".slice(0,19)),
        },
   
      ]} // type="day"  eventDate={{ year:2023, month:9, date:23, }}
    />
```

## For Single Date
```js
<CalendarMonth
      events={[
        {
          title: "Level 1",
          start: new Date("2023-10-10T10:00:05.327+00:00".slice(0,19)),
          end: new Date("2023-10-10T12:00:05.327+00:00".slice(0,19)),
        },
   
      ]} 
      type="day"  //types are -> day | 3day | week | month
      eventDate={{ year:2023, month:9, date:23, }} // it is mandatory if you want to use 'type' attribute.
    />

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.( you can't )

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
