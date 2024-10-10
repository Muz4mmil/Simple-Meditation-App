import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import beachImage from '@/assets/meditation-images/beach.webp'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { useRouter } from 'expo-router'
import AppGradient from '@/components/AppGradient'

const App = () => {
  const router = useRouter()
  return (
    <View className='flex-1'>
      <ImageBackground source={beachImage} resizeMode='cover' className='flex-1'>
        <AppGradient  colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}>
            <SafeAreaView className='flex-1 px-1 justify-between'>
              <View>
                <Text className='text-center text-white text-4xl font-bold'>Simple Meditation</Text>
                <Text className='text-center text-white text-2xl mt-3'>Simplifying Meditation for everyone</Text>
              </View>
              <View>
                <CustomButton title='Getting Started' onPress={() => router.push("/nature-meditate")} />
              </View>
            </SafeAreaView>
        </AppGradient>
      </ImageBackground>
    </View>
  )
}

export default App