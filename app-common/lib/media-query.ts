
export const reducer = (state: Media.IState, action: Media.IWebChangeMediaAction | Media.INativeChangeMediaAction) => {
  if (!state) return { windowSize: Media.TWindowSize.mobile }
  switch (action.type) {
    case Media.Consts.WEB_CHANGE_MEDIA: return { ...state, windowSize: action.windowSize }
    case Media.Consts.NATIVE_CHANGE_DIMENSION: return {
      ...state,
      windowSize: action.windowSize,
      rnWidth: action.rnWidth,
      rnHeight: action.rnHeight
    } as Media.IState
    default: return state
  }
}
