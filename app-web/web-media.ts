export const platform: Media.IPlatform = {
  init: () => {
    //************** DEFINE MEDIA CHANGE ACTION
    const countMedia = (m: Media.TMediaBoundaries) => `(min-width: ${m}px)`
    const countPortrait = (portrait = 0) => ['(orientation: portrait)', '(orientation: landscape)'][portrait]
    const mediaQuery = [countMedia(Media.TMediaBoundaries.tablet), countMedia(Media.TMediaBoundaries.desktop),]
    const portraitQuery = [countPortrait(0), countPortrait(1)]
    const matchMedias = mediaQuery.map((w, i) => {
      var mql = window.matchMedia(w);
      const idx = i
      const listener = mql => {
        if (!mql.matches && idx > 0) return
        const actMedia = !mql.matches && idx == 0 ? Media.TMedias.ltTablet : (idx == 0 ? Media.TMedias.tablet : Media.TMedias.gtTablet) 
        const act: Media.IChangeMediaAction = { type: Media.Consts.CHANGE_MEDIA, actMedia }
        window.lmGlobal.store.dispatch(act)
      }
      mql.addListener(listener)
      return { mql, listener }
    })

    const portrait = (() => {
      var mql = window.matchMedia('(orientation: portrait)');
      const listener = mql => {
        const act: Media.IChangePortraitAction = { type: Media.Consts.CHANGE_PORTRAIT, portrait: mql.matches }
        window.lmGlobal.store.dispatch(act)
      }
      mql.addListener(listener)
      return { mql, listener }
    })()

    //*************** init media / prvni matches od nejvetsiho
    for (let i = matchMedias.length - 1; i >= 0; i--) {
      const m = matchMedias[i]
      if (!m.mql.matches) continue
      m.listener(m.mql)
      break
    }
    //********************** init portrait
    portrait.listener(portrait.mql)
  },
}


