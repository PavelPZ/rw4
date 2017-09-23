declare namespace Media {

  //https://mydevice.io/devices/
  const enum TMediaBoundaries { tablet = 768, desktop = 1025 }

  const enum Consts {
    WEB_CHANGE_MEDIA = 'media/WEB_CHANGE_MEDIA',
    NATIVE_CHANGE_DIMENSION = 'media/NATIVE_CHANGE_DIMENSION',
  }

  //****** celkem 5 moznosti pro velikost
  const enum TWindowSize {
    //indexy do web-media konstant
    mobile = 0x1/*just mobile [-] */, tablet = 0x2/*just tablet [--]*/, desktop = 0x4/*just desktop [---]*/,
    //rozsireni pro fela
    ltDesktop = TWindowSize.mobile | TWindowSize.tablet, // " < TMedias.desktop" ..at least tablet [-- or ---]
    gtMobile = TWindowSize.tablet | TWindowSize.ltDesktop,// " > TMedias.mobile" ..max tablet [- or --]
  } 
 

  interface IWebChangeMediaAction extends App.Action<Consts.WEB_CHANGE_MEDIA> { windowSize: TWindowSize }
  interface INativeChangeMediaAction extends App.Action<Consts.NATIVE_CHANGE_DIMENSION> { rnWidth: number; rnHeight:number }

  interface IDimensionsAddEventListener {
    screen: IDAELItem
    window: IDAELItem
  }
  interface IDAELItem {
    fontScale: number
    height: number
    scale: number
    width:number
  }

  //const enum TOS { ios = 'ios', android = 'android', web = 'web' }
  interface IState {
    windowSize?: TWindowSize
    rnWidth?: number
    rnHeight?: number
  }

  type IMediaProps = IState

}

interface IState {
  mediaQuery?: Media.IState
}