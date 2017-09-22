
export const reducer = (state: Media.IState, action: Media.IWebChangeMediaAction | Media.INativeChangePortraitAction) => {
  if (!state) return { actMedia: Media.TMedias.mobile } as Media.IState
  switch (action.type) {
    case Media.Consts.WEB_CHANGE_MEDIA: return { ...state, actMedia: action.actMedia }
    case Media.Consts.NATIVE_CHANGE_DIMENSION: return {
      ...state,
      actMedia: action.width >= Media.TMediaBoundaries.desktop ? Media.TMedias.desktop : (action.width >= Media.TMediaBoundaries.tablet ? Media.TMedias.tablet : Media.TMedias.mobile),
      portrait: action.width > action.height
    }
    default: return state
  }
}
