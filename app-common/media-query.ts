import { Platform } from '../polyfill/index'

export const reducer = (state, action: Media.IChangeMediaAction | Media.IChangePortraitAction) => {
  if (!state) return { actMedia: Media.TMedias.mobile, portrait: false, OS: Platform.OS } as Media.IState
  switch (action.type) {
    case Media.Consts.CHANGE_MEDIA: return { ...state, actMedia: action.actMedia }
    case Media.Consts.CHANGE_PORTRAIT:
      if (action.portrait == state.portrait) return state
      return { ...state, portrait: action.portrait }
    default: return state
  }
}
