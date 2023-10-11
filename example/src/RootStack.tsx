import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import CalScreen from './CalScreen';
import OuterScreen from './OuterScreen';


const RootStack = createNativeStackNavigator ();

const RootStackScreen = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName='CalendarScreen'>
        
        <RootStack.Screen name={'CalendarScreen'} component={CalScreen} />
        <RootStack.Screen name={'OuterScreen'} component={OuterScreen} />
      </RootStack.Navigator>
  )
}

export default RootStackScreen

const styles = StyleSheet.create({})