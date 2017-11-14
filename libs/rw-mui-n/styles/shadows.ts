//https://github.com/alekhurst/react-native-elevated-view/blob/master/index.js
import { Platform } from 'react-native' 
import range from 'lodash/range'

const round = (value: number) => Math.round(value * 1e5) / 1e5
const shadow = (deep: number) => {
  if (deep == undefined) return null
  //if (Platform.OS === 'android') return { elevation: deep } as RN.ViewStyle
  return {
    elevation: deep,
    shadowOpacity: round(0.0015 * deep + 0.18),
    shadowRadius: round(0.54 * deep),
    shadowOffset: {
      height: 0.6 * deep,
    },
  } as RN.ViewStyle
}

const shadows: Array<RN.ViewProperties> = [
  undefined,
  ...range(0, 24).map(deep => shadow(deep))
]

export type Shadows = typeof shadows
export default shadows
