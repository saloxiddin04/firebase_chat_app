import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import React, {useState} from 'react';
import {useRouter, useSearchParams} from "expo-router";
import {StatusBar} from "expo-status-bar";
import ChatRoomHeader from "../../components/Chat/ChatRoomHeader";
import MessageList from "../../components/Message/MessageList";
import {heightPercentageToDP} from "react-native-responsive-screen";
import {Feather} from "@expo/vector-icons";
import CustomKeyboardView from "../../components/CustomKeyboardView";

export default function ChatRoom() {
  const item = useSearchParams()
  const router = useRouter()
  const [messages, setMessages] = useState([])
  
  return (
    <CustomKeyboardView inChat={true}>
      <View className={'flex-1 bg-white'}>
        <StatusBar style={'dark'}/>
        <ChatRoomHeader user={item} router={router}/>
        <View className={'h-3 border-b border-neutral-300'}/>
        <View className={'flex-1 justify-between bg-neutral-100 overflow-visible'}>
          <View className={'flex-1'}>
            <MessageList messages={messages}/>
          </View>
          <View className={'pt-2'} style={{marginBottom: heightPercentageToDP(1.7)}}>
            <View className={'flex-row mx-3 justify-between bg-white p-2 border border-neutral-300 rounded-full pl-5'}>
              <TextInput
                placeholder={'Type message...'}
                style={{fontSize: heightPercentageToDP(2)}}
                className={'flex-1 mr-2'}
              />
              <TouchableOpacity className={'bg-neutral-200 p-2 mr-[1px] rounded-full'}>
                <Feather name={'send'} size={heightPercentageToDP(2.7)} color={'#737373'}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  )
}

