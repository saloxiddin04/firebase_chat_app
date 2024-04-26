import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react';
import {heightPercentageToDP} from "react-native-responsive-screen";

export default function ChatItem({item, index, noBorder, router}) {
  return (
    <TouchableOpacity className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder ? '' : 'border-b border-b-neutral-200'}`}>
      <Image source={{uri: item.profileUrl}} style={{height: heightPercentageToDP(6), width: heightPercentageToDP(6)}} className={'rounded-full'} />
      
      <View className={'flex-1 gap-1'}>
        <View className={'flex-row justify-between'}>
          <Text style={{fontSize: heightPercentageToDP(1.8)}} className={'font-semibold text-neutral-800'}>{item.username}</Text>
          <Text style={{fontSize: heightPercentageToDP(1.8)}} className={'font-semibold text-neutral-800'}>Time</Text>
        </View>
        <Text style={{fontSize: heightPercentageToDP(1.6)}} className={'font-semibold text-neutral-500'}>Last Message</Text>
      </View>
    </TouchableOpacity>
  )
}

