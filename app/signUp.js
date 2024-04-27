import React, {useRef, useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert, Button} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";
import {StatusBar} from "expo-status-bar";
import {Feather, Octicons} from "@expo/vector-icons";
import {useRouter} from "expo-router";
import Loading from "../components/Loading";
import CustomKeyboardView from "../components/CustomKeyboardView";
import {useAuth} from "../context/authContext";
import * as ImagePicker from 'expo-image-picker';

import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {storage} from "../firebaseConfig"

export default function SignUp() {
  const router = useRouter()
  const {register} = useAuth()
  const [loading, setLoading] = useState(false)
  
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const usernameRef = useRef('')
  const profileRef = useRef('')
  
  const [image, setImage] = useState(null);
  
  const pickImage = async () => {
    // setLoading(true)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      setImage(null)
      setLoading(false)
    }
  };
  
  const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response)
      }
      xhr.onerror = function (e) {
        console.log(e)
        reject(new TypeError('Network request error'))
      }
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true)
      xhr.send(null)
    })
    
    try {
      const storageRef = ref(storage, `profileImages/image-${Date.now()}`)
      await uploadBytesResumable(storageRef, blob)
      blob.close();
      return await getDownloadURL(storageRef)
    } catch (e) {
      Alert.alert('Error', e)
    }
  }
  
  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
      Alert.alert('Sign In', 'Please fill all the fields!')
      return;
    }
    
    setLoading(true)
    await uploadImageAsync(image).then(async (res) => {
      const response = await register(emailRef.current, passwordRef.current, usernameRef.current, res)
      setLoading(false)
      
      if (!response.success) {
        Alert.alert('Sign Up', response.msg)
      }
    })
  }
  
  return (
    <CustomKeyboardView>
      <StatusBar style={'dark'}/>
      <View style={{paddingTop: hp(8), paddingHorizontal: wp(5)}} className={'flex-1 gap-12'}>
        <View className={'items-center'}>
          <Image style={{height: hp(25)}} resizeMode={'contain'} source={require('../assets/images/register.png')}/>
        </View>
        
        <View className={'gap-10'}>
          <Text style={{fontSize: hp(4)}} className={'text-neutral-800 font-bold tracking-wider text-center'}>Sign
            Up</Text>
          
          <View className={'gap-4'}>
            <View style={{height: hp(7)}} className={'flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl'}>
              <Octicons name={'mail'} size={hp(2.7)} color={'gray'}/>
              <TextInput
                onChangeText={value => emailRef.current = value}
                style={{fontSize: hp(2)}}
                className={'flex-1 font-semibold text-neutral-700'}
                placeholder={'Email address'}
                placeholderTextColor={'gray'}
                editable={!loading}
              />
            </View>
            <View style={{height: hp(7)}} className={'flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl'}>
              <Feather name={'user'} size={hp(2.7)} color={'gray'}/>
              <TextInput
                onChangeText={value => usernameRef.current = value}
                style={{fontSize: hp(2)}}
                className={'flex-1 font-semibold text-neutral-700'}
                placeholder={'User Name'}
                placeholderTextColor={'gray'}
                editable={!loading}
              />
            </View>
            <View style={{height: hp(7)}} className={'flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl'}>
              <Feather name={'image'} size={hp(2.7)} color={'gray'}/>
              <TouchableOpacity
                onPress={pickImage}
                style={{height: hp(6.5)}}
                className={'justify-center items-center'}
                disabled={loading}
              >
                <Text style={{fontSize: hp(2)}} className={'text-gray-400 font-semibold'}>Profile Image</Text>
              </TouchableOpacity>
            </View>
            <View style={{height: hp(7)}} className={'flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl'}>
              <Octicons name={'lock'} size={hp(2.7)} color={'gray'}/>
              <TextInput
                onChangeText={value => passwordRef.current = value}
                style={{fontSize: hp(2)}}
                className={'flex-1 font-semibold text-neutral-700'}
                placeholder={'Password'}
                placeholderTextColor={'gray'}
                textContentType={'password'}
                secureTextEntry={true}
                editable={!loading}
              />
            </View>
            
            {loading ? (
              <View className={'flex-row justify-center'}>
                <Loading size={hp(6)}/>
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleRegister}
                style={{height: hp(6.5)}}
                className={'bg-indigo-500 rounded-xl justify-center items-center'}
              >
                <Text style={{fontSize: hp(2.7)}} className={'text-white font-bold tracking-wider'}>Sign Up</Text>
              </TouchableOpacity>
            )}
            
            <View className={'flex-row justify-center'}>
              <Text style={{fontSize: hp(1.8)}} className={'font-semibold text-neutral-500'}>Already have an
                account? </Text>
              <Pressable disabled={loading} onPress={() => router.push('signIn')}>
                <Text style={{fontSize: hp(1.8)}} className={'font-bold text-indigo-500'}>Sign In</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  )
}

