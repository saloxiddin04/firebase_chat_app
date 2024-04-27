import {View, Text} from 'react-native'
import React from 'react';
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";

export default function MessageItem({currentUser, message}) {
  if (currentUser?.userId === message?.userId) {
    return (
      <View className={'flex-row justify-end mb-3 mr-3'}>
        <View style={{width: widthPercentageToDP(80)}}>
          <View className={'flex self-end p-3 rounded-2xl bg-white border border-neutral-200'}>
            <Text style={{fontSize: heightPercentageToDP(1.9)}}>
              {message?.text}
            </Text>
          </View>
        </View>
      </View>
    )
  } else {
    return (
      <View style={{width: widthPercentageToDP(80)}} className={'ml-3 mb-3'}>
        <View className={'flex self-start p-3 px-4 rounded-2xl bg-indigo-200 border border-indigo-200'}>
          <Text style={{fontSize: heightPercentageToDP(1.9)}}>{message?.text}</Text>
        </View>
      </View>
    )
  }
}

