import { Dimensions } from 'react-native';


//screen a window jsou odlisne pro INIT a CHANGE (jsou zameneny)
export const init = () => {
  //console.log('Dimensions.init:', Dimensions.get('window'), Dimensions.get('screen'))
  const { width: rnWidth, height: rnHeight } = Dimensions.get('window')
  window.lmGlobal.store.dispatch<Media.INativeChangeMediaAction>({ type: Media.Consts.NATIVE_CHANGE_DIMENSION, rnWidth, rnHeight })
  Dimensions.addEventListener('change', (res: Media.IDimensionsAddEventListener) => {
    //console.log('Dimensions.addEventListener:', res)
    const { width: rnWidth, height: rnHeight } = res.window
    window.lmGlobal.store.dispatch<Media.INativeChangeMediaAction>({ type: Media.Consts.NATIVE_CHANGE_DIMENSION, rnWidth, rnHeight })
  })
}

