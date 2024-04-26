import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react';
import {Stack} from "expo-router";
import {Entypo} from "@expo/vector-icons";
import {heightPercentageToDP} from "react-native-responsive-screen";
import {Image} from "expo-image";

export default function ChatRoomHeader({user, router}) {
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
                source={user?.profileUrl}
                style={{height: heightPercentageToDP(4.5), aspectRatio: 1, borderRadius: 100}}
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

