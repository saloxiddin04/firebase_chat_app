import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react';
import {Stack} from "expo-router";
import {Entypo} from "@expo/vector-icons";
import {heightPercentageToDP} from "react-native-responsive-screen";
import {Image} from "expo-image";
import {blurhash} from "../../utils/common";

export default function ChatRoomHeader({user, router}) {
  
  const modifyProfileUrl = (url) => {
    const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/fir-chat-16d1d.appspot.com/o/profileImages';
    const modifiedUrl = url.replace(`${baseUrl}/`, `${baseUrl}%2F`);
    return modifiedUrl;
  };
  
  console.log("user", modifyProfileUrl(user?.profileUrl))
  return (
    <Stack.Screen
      options={{
        title: '',
        headerShadowVisible: false,
        headerLeft: () => (
          <View className={'flex-row items-center gap-4'}>
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo name={'chevron-left'} size={heightPercentageToDP(4)} color={'#737373'} />
            </TouchableOpacity>
            <View className={'flex-row items-center gap-3'}>
              <Image
                source={{uri: modifyProfileUrl(user?.profileUrl)}}
                style={{height: heightPercentageToDP(4.5), aspectRatio: 1, borderRadius: 100}}
                placeholder={blurhash}
                transition={500}
              />
              <Text style={{fontSize: heightPercentageToDP(2.5)}} className={'text-neutral-700 font-medium'}>
                {user?.username}
              </Text>
            </View>
          </View>
        )
      }}
    />
  )
}

