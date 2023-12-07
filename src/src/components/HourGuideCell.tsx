import type dayjs from 'dayjs'
import * as React from 'react'
import { TouchableWithoutFeedback, View,Text } from 'react-native'

import { u } from '../commonStyles'
import type { CalendarCellStyle } from '../interfaces'
import { useTheme } from '../theme/ThemeContext'

interface HourGuideCellProps {
  cellHeight: number
  onPress: (d: dayjs.Dayjs) => void
  date: dayjs.Dayjs
  hour: number
  index: number
  calendarCellStyle?: CalendarCellStyle,
  currentStateClicked?:any
}

const _HourGuideCell = ({
  cellHeight,
  onPress,
  date,
  hour,
  index,
  calendarCellStyle,
  currentStateClicked
}: HourGuideCellProps) => {
  const theme = useTheme()

  const getCalendarCellStyle = React.useMemo(
    () => (typeof calendarCellStyle === 'function' ? calendarCellStyle : () => calendarCellStyle),
    [calendarCellStyle],
  )
   
  return (
    <TouchableWithoutFeedback onPress={() => onPress(date.hour(hour).minute(0))}>
      <View
        style={[
          u['border-l'],
          u['border-b'],
          { borderColor: theme.palette.gray['200'] },
          { height: cellHeight },
          { ...getCalendarCellStyle(date.toDate(), index) },
          {justifyContent:'center',alignItems:'center'}
        ]}
      >
      {
      currentStateClicked.toString() === 
      date.hour(hour).minute(0).toDate().toString() && 
      <Text style={{color:'grey',fontSize:20}}>
        +
      </Text>  
      }
      </View>
      
    </TouchableWithoutFeedback>
  )
}

export const HourGuideCell = React.memo(_HourGuideCell)
