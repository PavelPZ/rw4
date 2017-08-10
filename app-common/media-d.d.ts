declare namespace Media {

  const enum TMediaBoundaries { tablet = 768, desktop = 1025 }

  const enum Consts {
    CHANGE_MEDIA = 'media/CHANGE_MEDIA',
    CHANGE_PORTRAIT = 'media/CHANGE_PORTRAIT',
  }

  export const enum TMedias { ltTablet, tablet, gtTablet, } //mensi, stejny nebo vetsi nez tablet

  export interface IChangeMediaAction extends App.Action<Consts.CHANGE_MEDIA> { actMedia: TMedias }
  export interface IChangePortraitAction extends App.Action<Consts.CHANGE_PORTRAIT> { portrait: boolean }

  interface IState {
    actMedia: TMedias
    portrait: boolean
  }

  interface IPlatform {
    init: () => void
  }

}

interface IState {
  media?: Media.IState
}

interface IPlatforms {
  mediaPlatform?: Media.IPlatform
}