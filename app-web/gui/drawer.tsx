import React from 'react';

export class AnimatedMobileDrawer extends React.PureComponent<GUI.IAnimatedMobileDrawerProps> {

  rendered: boolean
  backdropVisible: boolean
  animateMenu: gsap.TweenLite
  animateBackdrop: gsap.TweenLite
  divBackdrop: HTMLElement
  divMenu: HTMLElement

  render() {
    const { backdropVisible, animateMenu, animateBackdrop, divBackdrop, divMenu, rendered, props } = this
    const { duration, visibleOpacity, visibleLeft, content, menu, willBeVisible: tv, drawerWidth, hideDrawer } = props
    const willBeVisible = rendered ? tv : true
    let menuLeft: any = visibleLeft[willBeVisible ? 0 : 1]
    let backdropOpacity: any = visibleOpacity[willBeVisible ? 0 : 1]
    if (animateMenu) { menuLeft = divMenu.style.left; animateMenu.kill(); delete this.animateMenu } if (animateBackdrop) { backdropOpacity = divBackdrop.style.opacity; animateBackdrop.kill(); delete this.animateBackdrop }
    const doAnimate = () => {
      const { divBackdrop, divMenu, props } = this
      const { duration, visibleOpacity, visibleLeft, willBeVisible } = props
      const dur = duration || App.Consts.animationDurationMsec
      this.animateMenu = TweenLite.to(divMenu, dur / 1000, { left: visibleLeft[willBeVisible ? 1 : 0] })
      this.animateBackdrop = TweenLite.to(divBackdrop, dur / 1000, { opacity: visibleOpacity[willBeVisible ? 1 : 0], onComplete: () => { delete this.animateMenu; delete this.animateBackdrop; if (!willBeVisible) { this.backdropVisible = false; this.forceUpdate() } } })
    }
    let doAnimateInRef: (div: HTMLElement) => void
    if (!rendered)
      this.rendered = true
    else {
      if (willBeVisible /*zacatek animace backdropu*/) this.backdropVisible = true
      if (divBackdrop) doAnimate(); else doAnimateInRef = (div: HTMLElement) => {
        this.divBackdrop = div
        setTimeout(doAnimate, 1)
      }
    }
    return [
      React.cloneElement(content, { ...content.props, key: 0, style: { ...content.props.style, ...absoluteStretch } }),
      this.backdropVisible && <div key={1} ref={doAnimateInRef} onClick={hideDrawer} style={{ ...absoluteStretch, backgroundColor: 'gray', opacity: backdropOpacity } as CSSProperties} />,
      <div key={2} ref={div => this.divMenu = div} style={{ position: 'absolute', top: 0, bottom: 0, width: drawerWidth, display: 'flex', left: menuLeft }} >
        {React.cloneElement(menu, { ...menu.props, style: { ...menu.props.style, flex: 1 } })}
      </div>
    ] as any
  }
}


export const AnimatedTabletDrawer = AnimatedMobileDrawer

const absoluteStretch = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }
const topBottom = { position: 'absolute', top: 0, bottom: 0 }
