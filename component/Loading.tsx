
import { ActivityIndicator, View } from 'react-native'

export function Loader() {
  return (
    <View
      className='flex flex-1 justify-center items-center bg-blue-600'
    >
      <ActivityIndicator size="large" className='bg-blue-600' />
    </View>
  )
}
