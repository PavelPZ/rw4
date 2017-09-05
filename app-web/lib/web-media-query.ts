//https://www.w3schools.com/cssref/css3_pr_mediaquery.asp

export const init = () => {
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
      const actMedia = !mql.matches && idx == 0 ? Media.TMedias.mobile : (idx == 0 ? Media.TMedias.tablet : Media.TMedias.desktop)
      window.lmGlobal.store.dispatch<Media.IChangeMediaAction>({ type: Media.Consts.CHANGE_MEDIA, actMedia })
    }
    mql.addListener(listener)
    return { mql, listener }
  })

  const portrait = (() => {
    var mql = window.matchMedia('(orientation: portrait)');
    const listener = mql => window.lmGlobal.store.dispatch<Media.IChangePortraitAction>({ type: Media.Consts.CHANGE_PORTRAIT, portrait: mql.matches })
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
}

export const fela = {
  [Media.TMedias.mobile]: `@media (max-width: ${Media.TMediaBoundaries.tablet - 1}px)`,
  [Media.TMedias.tablet]: `@media (min-width: ${Media.TMediaBoundaries.tablet}px) and (max-width: ${Media.TMediaBoundaries.desktop - 1}px)`,
  [Media.TMedias.desktop]: `@media (min-width: ${Media.TMediaBoundaries.desktop}px)`,
  [Media.TMedias.gtMobile]: `@media (min-width: ${Media.TMediaBoundaries.tablet}px)`,
  [Media.TMedias.ltDesktop]: `@media (max-width: ${Media.TMediaBoundaries.desktop - 1}px)`,
}


