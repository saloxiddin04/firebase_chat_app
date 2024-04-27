import {View, Text, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react';
import {heightPercentageToDP} from "react-native-responsive-screen";
import {Image} from "expo-image";
import {blurhash, formatDate, getRoomId} from "../../utils/common";
import {collection, doc, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "../../firebaseConfig";

export default function ChatItem({item, noBorder, router, currentUser}) {
  
  const [lastMsg, setLastMsg] = useState(undefined)
  
  console.log('item item', item?.profileUrl)
  
  useEffect(() => {
    let roomId = getRoomId(currentUser?.userId, item?.userId)
    const docRef = doc(db, 'rooms', roomId)
    const msgRef = collection(docRef, 'messages')
    const q = query(msgRef, orderBy('createdAt', 'desc'))
    
    return onSnapshot(q, (snapshot)  => {
      let allMsg = snapshot.docs.map(doc => {
        return doc.data()
      })
      setLastMsg(allMsg[0] ? allMsg[0] : null)
    })
  }, [])
  
  const openChatRoom = () => {
    router.push({pathname: '/chatRoom', params: item})
  }
  
  const renderTime = () => {
    if (lastMsg) {
      let date = lastMsg?.createdAt;
      return formatDate(new Date(date?.seconds * 1000))
    }
  }
  
  const renderLastMsg = () => {
    if (typeof lastMsg === 'undefined') return 'Loading...'
    if (lastMsg) {
      if (currentUser?.userId === lastMsg?.userId) return "You: " + lastMsg?.text
      return lastMsg?.text
    } else {
      return 'Say Hi ✌️'
    }
  }
  
  return (
    <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder ? '' : 'border-b border-b-neutral-200'}`}>
      <Image
        source={{uri: item.profileUrl}}
        style={{height: heightPercentageToDP(6), width: heightPercentageToDP(6), borderRadius: 100}}
        placeholder={blurhash}
        transition={500}
      />
      
      <View className={'flex-1 gap-1'}>
        <View className={'flex-row justify-between'}>
          <Text style={{fontSize: heightPercentageToDP(1.8)}} className={'font-semibold text-neutral-800'}>{item.username}</Text>
          <Text style={{fontSize: heightPercentageToDP(1.8)}} className={'font-semibold text-neutral-800'}>{renderTime()}</Text>
        </View>
        <Text style={{fontSize: heightPercentageToDP(1.6)}} className={'font-semibold text-neutral-500'}>{renderLastMsg()}</Text>
      </View>
    </TouchableOpacity>
  )
}

