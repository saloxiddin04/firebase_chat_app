import {View, TextInput, TouchableOpacity, Alert, Keyboard} from 'react-native'
import React, {useEffect, useRef, useState} from 'react';
import {useRouter, useSearchParams} from "expo-router";
import {StatusBar} from "expo-status-bar";
import ChatRoomHeader from "../../components/Chat/ChatRoomHeader";
import MessageList from "../../components/Message/MessageList";
import {heightPercentageToDP} from "react-native-responsive-screen";
import {Feather} from "@expo/vector-icons";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import {useAuth} from "../../context/authContext";
import {setDoc, Timestamp, doc, collection, addDoc, query, orderBy, onSnapshot} from "firebase/firestore";
import {db} from '../../firebaseConfig'
import {getRoomId} from "../../utils/common";

export default function ChatRoom() {
  const item = useSearchParams()
  const router = useRouter()
  const {user} = useAuth()
  const [messages, setMessages] = useState([])
  const textRef = useRef('')
  const inputRef = useRef(null)
  const scrollViewRef = useRef(null)
  
  console.log("item", item?.profileUrl)
  
  useEffect(() => {
    createRoomIfNotExists()
    
    let roomId = getRoomId(user?.userId, item?.userId)
    const docRef = doc(db, 'rooms', roomId)
    const msgRef = collection(docRef, 'messages')
    const q = query(msgRef, orderBy('createdAt', 'asc'))
    
    const unsub = onSnapshot(q, (snapshot)  => {
      let allMsg = snapshot.docs.map(doc => {
        return doc.data()
      })
      setMessages([...allMsg])
    })
    
    const KeyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow', updateScrollView
    )
    
    return () => {
      unsub()
      KeyboardDidShowListener.remove()
    }
  }, [])
  
  useEffect(() => {
    return () => {
      updateScrollView()
    };
  }, [messages]);
  
  
  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({animated: true})
    }, 100)
  }
  
  const createRoomIfNotExists = async () => {
    let roomId = getRoomId(user?.userId, item?.userId)
    await setDoc(doc(db, 'rooms', roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date())
    })
  }
  
  const handleSendMsg = async () => {
    let msg = textRef.current.trim()
    if (!msg) return;
    try {
      let roomId = getRoomId(user?.userId, item?.userId)
      const docRef = doc(db, 'rooms', roomId)
      const msgRef = collection(docRef, 'messages')
      
      textRef.current = ''
      if (inputRef) inputRef?.current?.clear()
      const newDoc = await addDoc(msgRef, {
        userId: user?.userId,
        text: msg,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date())
      })
    } catch (e) {
      Alert.alert('Message', e.message)
    }
  }
  
  return (
    <CustomKeyboardView inChat={true}>
      <View className={'flex-1 bg-white'}>
        <StatusBar style={'dark'}/>
        <ChatRoomHeader user={item} router={router}/>
        <View className={'h-3 border-b border-neutral-300'}/>
        <View className={'flex-1 justify-between bg-neutral-100 overflow-visible'}>
          <View className={'flex-1'}>
            <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={user}/>
          </View>
          <View className={'pt-2'} style={{marginBottom: heightPercentageToDP(1.7)}}>
            <View className={'flex-row mx-3 justify-between bg-white p-2 border border-neutral-300 rounded-full pl-5'}>
              <TextInput
                ref={inputRef}
                placeholder={'Type message...'}
                placeholderTextColor={'#737373'}
                style={{fontSize: heightPercentageToDP(2)}}
                className={'flex-1 mr-2'}
                onChangeText={value => textRef.current = value}
              />
              <TouchableOpacity onPress={handleSendMsg} className={'bg-neutral-200 p-2 mr-[1px] rounded-full'}>
                <Feather name={'send'} size={heightPercentageToDP(2.7)} color={'#737373'}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  )
}

