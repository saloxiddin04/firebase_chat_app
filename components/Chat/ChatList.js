import {View, Text, FlatList} from 'react-native'
import React from 'react';
import ChatItem from "./ChatItem";
import {useRouter} from "expo-router";

export default function ChatList({users}) {
  
  const router = useRouter()
  
  return (
    <View className={'flex-1'}>
      <FlatList
        data={users}
        renderItem={({item, index}) => <ChatItem item={item} index={index} noBorder={index + 1 === users.length} router={router} />}
        keyExtractor={item => Math.random(item)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flex: 1, paddingVertical: 25}}
      />
    </View>
  )
}
