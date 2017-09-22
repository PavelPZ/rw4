import { Dimensions } from 'react-native';


//screen a window jsou odlisne pro INIT a CHANGE (jsou zameneny)
export const init = () => {
  console.log('Dimensions.init:', Dimensions.get('window'), Dimensions.get('screen'))
  const { width, height } = Dimensions.get('window')
  window.lmGlobal.store.dispatch<Media.INativeChangePortraitAction>({ type: Media.Consts.NATIVE_CHANGE_DIMENSION, width, height })
  Dimensions.addEventListener('change', (res: Media.IDimensionsAddEventListener) => {
    console.log('Dimensions.addEventListener:', res)
    window.lmGlobal.store.dispatch<Media.INativeChangePortraitAction>({ type: Media.Consts.NATIVE_CHANGE_DIMENSION, width: res.window.width, height: res.window.height })
  })
}

