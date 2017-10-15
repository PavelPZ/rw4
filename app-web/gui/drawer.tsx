import React from 'react';
import { renderCSSs, renderCSS } from '../lib/fela'

export class AnimatedDrawer extends React.PureComponent<GUI.IAnimatedMobileDrawerProps> {

  tweens: gsap.TweenLite[] = []
  firstRender = true
  isVisible = this.props.drawerVisible

  render() {
    const { isVisible, tweens, props, firstRender } = this
    const { isTablet, duration: dur, content, menu, drawerVisible: willBeVisible, drawerWidth, showDrawer, refForAnimation } = props
    const duration = (dur || App.Consts.animationDurationMsec) / 1000

    const noAnimation = firstRender || isVisible == willBeVisible
    if (!noAnimation) this.isVisible = willBeVisible
    this.firstRender = false

    const animate = () => {
      if (noAnimation || refsNum == 0 || (!isTablet && refsNum < 2)) return
      tweens.forEach(t => t.reversed() ? t.play() : t.reverse())
    }

    let refsNum = 0
    const divCreated = (idx: number, div: HTMLElement, animationDiv: boolean, tweenLite: () => gsap.TweenLite) => {
      if (!div) return
      refsNum++
      if (!tweens[idx]) {
        tweens[idx] = tweenLite()
        refForAnimation && refForAnimation(div) //tablet: animace pro router
      }
      animate()
    }

    //if (!firstEnter) setTimeout(animate, 1)

    //const firstRender = () => tweens.length < (isTablet ? 1 : 2)
    //if (!firstRender()) tweens.forEach(t => t.reversed() ? t.play() : t.reverse())

    //https://codepen.io/rhernando/pen/ojvRaK
    if (isTablet) {
      return <div
        ref={div => divCreated(0, div, true, () => TweenLite.to(div, duration, { paused: true, reversed: true, left: isVisible ? -drawerWidth : 0 }))}
        className={renderCSSs(absoluteStretch, { flexDirection: 'row', display: 'flex', left: isVisible ? 0 : -drawerWidth })}
      >
        {React.cloneElement(menu, { ...menu.props, key: 1, style: { ...menu.props.style, width: drawerWidth } })}
        {React.cloneElement(content, { ...content.props, key: 0, style: { ...content.props.style, flex: 1 } })}
      </div>
    } else
      return <div ref={refForAnimation}>
        {React.cloneElement(content, { ...content.props, key: 1, style: { ...content.props.style, ...absoluteStretch } })}
        <div key={2}
          ref={div => divCreated(0, div, false, () => TweenLite.to(div, duration, { display: 'block', paused: true, reversed: true, opacity: 0.85 }))}
          className={renderCSSs(absoluteStretch, { backgroundColor: 'gray', opacity: 0, display: 'none' })}
          onClick={() => showDrawer(false)} />
        {!noAnimation && <div key={3}
          ref={div => divCreated(1, div, false, () => TweenLite.to(div, duration, { paused: true, reversed: true, left: 0 }))}
          className={renderCSS({ position: 'absolute', top: 0, bottom: 0, width: drawerWidth, display: 'flex', left: -drawerWidth } as CSSProperties)} >
          {React.cloneElement(menu, { ...menu.props, style: { ...menu.props.style, flex: 1 } })}
        </div>}
      </div>
  }
}


const absoluteStretch = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as CSSProperties

