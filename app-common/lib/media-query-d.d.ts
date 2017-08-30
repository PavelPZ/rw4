declare namespace Media {

  //https://mydevice.io/devices/
  const enum TMediaBoundaries { tablet = 768, desktop = 1025 }

  const enum Consts {
    CHANGE_MEDIA = 'media/CHANGE_MEDIA',
    CHANGE_PORTRAIT = 'media/CHANGE_PORTRAIT',
  }

  //****** celkem 5 moznosti pro velikost
  export const enum TMedias {
    //indexy do web-media konstant
    mobile/*just mobile [-] */, tablet/*just tablet [--]*/, desktop/*just desktop [---]*/,
    //rozsireni pro fela
    ltDesktop, // " < TMedias.desktop" ..at least tablet [-- or ---]
    gtMobile // " > TMedias.mobile" ..max tablet [- or --]
  } 
 

  export interface IChangeMediaAction extends App.Action<Consts.CHANGE_MEDIA> { actMedia: TMedias }
  export interface IChangePortraitAction extends App.Action<Consts.CHANGE_PORTRAIT> { portrait: boolean }

  const enum TOS { ios = 'ios', android = 'android', web = 'web' }

  interface IState {
    actMedia: TMedias
    portrait: boolean
    OS: TOS
  }

}

interface IState {
  mediaQuery?: Media.IState
}