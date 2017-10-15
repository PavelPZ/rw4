import React from 'react';
import { renderCSSs, renderCSS } from '../lib/fela'

export class AnimatedDrawer extends React.PureComponent<GUI.IAnimatedMobileDrawerProps> {

  tweens: gsap.TweenLite[] = [] 
  secondRender:boolean

  render() {
    const { tweens, props, secondRender } = this
    const { isTablet, duration: dur, content, menu, willBeVisible, drawerWidth, doShowDrawer, refForAnimation } = props
    const duration = (dur || App.Consts.animationDurationMsec) / 1000
    const firstEnter = !secondRender; this.secondRender = true

    const animate = () => !firstEnter && tweens[0] && (isTablet || tweens[1]) && tweens.forEach(t => t.reversed() ? t.play() : t.reverse())

    const divCreated = (idx: number, div: HTMLElement, animationDiv: boolean, tweenLite: gsap.TweenLite) => {
      if (tweens[idx]) return //optimalizace: skutecny DIV html element se vytvari jen jednou, React DIV komponenta ale pri kazdem Render
      tweens[idx] = tweenLite
      refForAnimation && refForAnimation(div) //tablet: animace pro router
      animate()
    }

    if (!firstEnter) animate()

    //const firstRender = () => tweens.length < (isTablet ? 1 : 2)
    //if (!firstRender()) tweens.forEach(t => t.reversed() ? t.play() : t.reverse())

    //https://codepen.io/rhernando/pen/ojvRaK
    if (isTablet)
      return <div
        ref={div => div && divCreated(0, div, true, TweenLite.to(div, duration, { paused: true, reversed: true, left: -drawerWidth }))}
        className={renderCSSs(absoluteStretch, { flexDirection: 'row', display: 'flex' })}
      >
        {React.cloneElement(menu, { ...menu.props, key: 1, style: { ...menu.props.style, width: drawerWidth } })}
        {React.cloneElement(content, { ...content.props, key: 0, style: { ...content.props.style, flex: 1 } })}
      </div>
    else
      return <div ref={refForAnimation}>
        {React.cloneElement(content, { ...content.props, key: 1, style: { ...content.props.style, ...absoluteStretch } })}
        <div key={2}
          ref={div => div && divCreated(0, div, false, TweenLite.to(div, duration, { display: 'block', paused: true, reversed: true, opacity: 0.85 }))}
          className={renderCSSs(absoluteStretch, { backgroundColor: 'gray', opacity: 0, display: 'none' })}
          onClick={() => doShowDrawer(false)} />
        {!firstEnter && <div key={3}
          ref={div => div && divCreated(1, div, false, TweenLite.to(div, duration, { paused: true, reversed: true, left: 0 }))}
          className={renderCSS({ position: 'absolute', top: 0, bottom: 0, width: drawerWidth, display: 'flex', left: -drawerWidth } as CSSProperties)} >
          {React.cloneElement(menu, { ...menu.props, style: { ...menu.props.style, flex: 1 } })}
        </div>}
      </div>
  }
}


const absoluteStretch = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as CSSProperties

