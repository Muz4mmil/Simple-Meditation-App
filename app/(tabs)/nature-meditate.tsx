import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import AppGradient from '@/components/AppGradient'
import { MEDITATION_DATA } from '@/constants/MeditationData'
import { ImageBackground } from 'react-native'
import meditationImages from '@/constants/meditation-images'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'

const NatureMeditate = () => {
  return (
    <View className='flex-1'>
      <AppGradient colors={['#fff', '#fff', '#eee']}>
        <View className='mb-5 mt-10'>
          <Text className='mb-3 text-gray-900 font-bold text-4xl text-left'>{'Welcome\nMuzammil'}</Text>
          <Text className='text-gray-500 font-medium text-xl'>Start your medition practice today</Text>
        </View>
        <View>
          <FlatList
            data={MEDITATION_DATA}
            className='mb-44'
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => router.push(`/meditate/${item.id}`)}
                className='h-48 rounded-lg my-3 overflow-hidden'
              >
                <ImageBackground
                  source={meditationImages[item.id - 1]}
                  resizeMode='cover'
                  className='rounded-lg flex-1 justify-center'
                >
                  <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} className='flex-1 justify-center items-center'>
                    <Text className='text-gray-100 font-bold text-3xl'>{item.title}</Text>
                  </LinearGradient>
                </ImageBackground>

              </Pressable>
            )}
          />
        </View>
      </AppGradient>
    </View>
  )
}

export default NatureMeditate