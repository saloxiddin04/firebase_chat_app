import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react';
import {heightPercentageToDP} from "react-native-responsive-screen";
import {Image} from "expo-image";
import {blurhash} from "../../utils/common";

export default function ChatItem({item, index, noBorder, router}) {
  
  const openChatRoom = () => {
    router.push({pathname: '/chatRoom', params: item})
  }
  
  return (
    <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder ? '' : 'border-b border-b-neutral-200'}`}>
      <Image
        source={item.profileUrl}
        style={{height: heightPercentageToDP(6), width: heightPercentageToDP(6), borderRadius: 100}}
        placeholder={blurhash}
        transition={500}
      />
      
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

