import { View, Text, ImageBackground, Pressable } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import MEDITATION_IMAGES from '@/constants/meditation-images'
import AppGradient from '@/components/AppGradient'
import { router, useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import CustomButton from '@/components/CustomButton'
import { Audio } from 'expo-av'
import { MEDITATION_DATA, AUDIO_FILES } from '@/constants/MeditationData'
import { TimerContext } from '@/context/timerContext'
import { StatusBar } from 'expo-status-bar'

const Meditate = () => {
  const { id } = useLocalSearchParams();

  const { duration: secondsRemaining, setDuration: setSecondsRemaining } = useContext(TimerContext)
  // const [secondsRemaining, setSecondsRemaining] = useState(10)
  const [isMeditating, setIsMeditating] = useState(false)
  const [audioSound, setAudioSound] = useState<Audio.Sound>()
  const [isPlayingAudio, setPlayingAudio] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (secondsRemaining === 0) {
      setIsMeditating(false)
      return
    }

    if (isMeditating) {
      timerId = setTimeout(() => {
        setSecondsRemaining(secondsRemaining - 1)
      }, 1000)
    }

    return () => {
      clearTimeout(timerId)
    }
  }, [secondsRemaining, isMeditating])

  useEffect(() => {
    return () => {
      setSecondsRemaining(10)
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  const toggleSound = async () => {
    const sound = audioSound ? audioSound : await initializeSound();

    const status = await sound?.getStatusAsync();

    if (status?.isLoaded && !isPlayingAudio) {
      await sound?.playAsync();
      setPlayingAudio(true);
    } else {
      await sound?.pauseAsync();
      setPlayingAudio(false);
    }
  };

  const toggleMeditationSessionStatus = async () => {
    if (secondsRemaining === 0) setSecondsRemaining(10)

    setIsMeditating(!isMeditating)

    await toggleSound();
  }

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName])

    setAudioSound(sound)
    return sound
  }

  const handleAdjustDuration = () => {
    if(isMeditating) toggleMeditationSessionStatus()

    router.push('/(modal)/adjust-meditation-duration')
  }

  const formttedTimeMinutes = String(Math.floor(secondsRemaining / 60)).padStart(2, "0")
  const formttedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0")

  return (
    <View className='flex-1'>
      <ImageBackground source={MEDITATION_IMAGES[Number(id) - 1]} resizeMode='cover' className='flex-1'>
        <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
          <Pressable onPress={() => router.back()} className='absolute top-16 left-6 z-10'>
            <Ionicons name="arrow-back" size={30} color='white' />
          </Pressable>

          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-100 justify-center items-center h-44 w-44 rounded-full">
              <Text className='text-4xl text-blue-800 font-rmono'>{formttedTimeMinutes}:{formttedTimeSeconds}</Text>
            </View>
          </View>

          <View className="mb-5">
            <CustomButton title='Set Duration' onPress={handleAdjustDuration} containerStyles='bg-transparent border border-white' textStyles='text-white' />
            <CustomButton title={isMeditating ? 'Stop' : 'Start Meditation'} onPress={toggleMeditationSessionStatus} containerStyles='mt-4' />
          </View>
        </AppGradient>
      </ImageBackground>
      <StatusBar style='light' />
    </View>
  )
}

export default Meditate