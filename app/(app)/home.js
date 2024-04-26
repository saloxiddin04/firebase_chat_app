import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react';
import {useAuth} from "../../context/authContext";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {StatusBar} from "expo-status-bar";

export default function Home() {
  const {logout} = useAuth()
  
  const handleLogout = async () => {
    await logout()
  }
  return (
    <View>
      <StatusBar style={'dark'}/>
      <Text>Home</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={{fontSize: hp(2.7)}} className={'text-dark font-bold tracking-wider'}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

