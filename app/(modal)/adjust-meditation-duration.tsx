import { View, Text, Pressable } from 'react-native'
import React, { useContext } from 'react'
import AppGradient from '@/components/AppGradient'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import CustomButton from '@/components/CustomButton'
import { TimerContext } from '@/context/timerContext'

const AdjustMeditationDuration = () => {
  const { setDuration } = useContext(TimerContext)

  const handlePress = (duration: number) => {
    setDuration(duration)
    router.back()
  }

  return (
    <View className='flex-1 relative'>
      <AppGradient colors={['#fff', '#fff', '#fff']}>
        <Pressable onPress={() => router.back()} className='absolute top-16 left-6 z-10'>
          <Ionicons name="arrow-back" size={30} color='black' />
        </Pressable>

        <View className="h-4/5 justify-center">
          <Text className="font-bold text-3xl text-center text-black mb-8">Adjust your meditation duration</Text>
        
          <View>
            <CustomButton title='10 seconds' containerStyles='mb-5 border' onPress={() => handlePress(10)} />
            <CustomButton title='5 minutes' containerStyles='mb-5 border' onPress={() => handlePress(5 * 60)} />
            <CustomButton title='10 minutes' containerStyles='mb-5 border' onPress={() => handlePress(10 * 60)} />
            <CustomButton title='15 minutes' containerStyles='mb-5 border' onPress={() => handlePress(15 * 60)} />
          </View>
        </View>
      </AppGradient>
    </View>
  )
}

export default AdjustMeditationDuration