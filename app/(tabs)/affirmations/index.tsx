import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import AppGradient from '@/components/AppGradient'
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallery'
import GuidedAffirmationGallery from '@/components/GuidedAffirmationGallery'

const Affirmations = () => {
  return (
    <View className='flex-1'>
      <AppGradient colors={['#fff', '#fff', '#fff']}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className='text-4xl mt-10 font-bold text-zinc-900'>Change your beliefs with affirmations</Text>
          <View>
            {AFFIRMATION_GALLERY.map((g) => (
              <GuidedAffirmationGallery title={g.title} key={g.title} previews={g.data} />
            ))}
          </View>
        </ScrollView>
      </AppGradient>
    </View>
  )
}

export default Affirmations