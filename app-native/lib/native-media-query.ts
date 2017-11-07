import { Dimensions } from 'react-native';


//screen a window jsou odlisne pro INIT a CHANGE (jsou zameneny)
export const init = () => {
  //console.log('Dimensions.init:', Dimensions.get('window'), Dimensions.get('screen'))
  const { width: rnWidth, height: rnHeight } = Dimensions.get('window')
  const winSize = (rnWidth) => rnWidth >= Media.TMediaBoundaries.desktop ? Media.TWindowSize.desktop : (rnWidth >= Media.TMediaBoundaries.tablet ? Media.TWindowSize.tablet : Media.TWindowSize.mobile)
  window.store.dispatch<Media.INativeChangeMediaAction>({ type: Media.Consts.NATIVE_CHANGE_DIMENSION, rnWidth, rnHeight, windowSize: winSize(rnWidth) })
  Dimensions.addEventListener('change', () => {
    const { width: rnWidth, height: rnHeight } = Dimensions.get('window')
    //console.log('Dimensions.addEventListener:', res)
    //const { width: rnWidth, height: rnHeight } = res.window
    window.store.dispatch<Media.INativeChangeMediaAction>({ type: Media.Consts.NATIVE_CHANGE_DIMENSION, rnWidth, rnHeight, windowSize: winSize(rnWidth) })
  })
}

