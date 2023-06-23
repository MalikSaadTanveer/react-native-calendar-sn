import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { colors } from '../../utils/colors'

const DateMeetingCard = () => {
  return (
    <View style={styles.card}>
      <Image source={require('../../assets/images/client.png')} style={styles.image}  />
      <View>
        <Text style={styles.title}>Design Meeting</Text>
        <Text style={styles.time}>09:00 AM - 10:00 AM</Text>
      </View>
    </View>
  )
}

export default DateMeetingCard

const styles = StyleSheet.create({
    card:{
        backgroundColor:colors.backgroundColor,
        paddingHorizontal:10,
        paddingVertical:6,
        width:'90%',
        flexDirection:'row',
        alignItems:'center',
        elevation:3,
        borderRadius:10,
    },
    image:{
        width:42,
        height:42,
        marginRight:10,
    },
    title:{
        color:colors.tertiary,
        fontSize:14,
    },
    time:{
        color:'lightgrey',
        fontSize:12,
    }

})