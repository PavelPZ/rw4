declare namespace Media {

  //https://mydevice.io/devices/
  const enum TMediaBoundaries { tablet = 768, desktop = 1025 }

  const enum Consts {
    WEB_CHANGE_MEDIA = 'media/WEB_CHANGE_MEDIA',
    NATIVE_CHANGE_DIMENSION = 'media/NATIVE_CHANGE_DIMENSION',
  }

  //****** celkem 5 moznosti pro velikost
  const enum TMedias {
    //indexy do web-media konstant
    mobile = 0x1/*just mobile [-] */, tablet = 0x2/*just tablet [--]*/, desktop = 0x4/*just desktop [---]*/,
    portrait = 0x8,
    //rozsireni pro fela
    ltDesktop = TMedias.mobile | TMedias.tablet, // " < TMedias.desktop" ..at least tablet [-- or ---]
    gtMobile = TMedias.tablet | TMedias.ltDesktop,// " > TMedias.mobile" ..max tablet [- or --]
    portraitMobile = TMedias.mobile | TMedias.portrait,
    portraitTablet = TMedias.tablet | TMedias.portrait,
  } 
 

  interface IWebChangeMediaAction extends App.Action<Consts.WEB_CHANGE_MEDIA> { actMedia: TMedias }
  interface INativeChangePortraitAction extends App.Action<Consts.NATIVE_CHANGE_DIMENSION> { width: number; height:number }

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
    actMedia: TMedias
    portrait: boolean
    //OS: TOS
  }

}

interface IState {
  mediaQuery?: Media.IState
}