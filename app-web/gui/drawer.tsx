import React from 'react';
import { renderCSS } from '../lib/fela'

export class AnimatedDrawer extends React.PureComponent<GUI.IAnimatedMobileDrawerProps> {

  tweens: gsap.TweenLite[] = []

  render() {
    const { tweens, props } = this
    const { isTablet, duration: dur, content, menu, willBeVisible, drawerWidth, doShowDrawer } = props
    const duration = (dur || App.Consts.animationDurationMsec) / 1000
    const firstRender = () => tweens.length < (isTablet ? 1 : 2)
    if (!firstRender()) tweens.forEach(t => t.reversed() ? t.play() : t.reverse())

    //https://codepen.io/rhernando/pen/ojvRaK
    if (isTablet)
      return <div
        ref={div => firstRender() && tweens.push(TweenLite.to(div, duration, { paused: true, reversed: true, left: -drawerWidth }))}
        className={renderCSS({ left: 0, position: 'absolute', top: 0, right: 0, bottom: 0, flexDirection: 'row', display: 'flex' })}
      >
        {React.cloneElement(menu, { ...menu.props, key: 1, style: { ...menu.props.style, width: drawerWidth } })}
        {React.cloneElement(content, { ...content.props, key: 0, style: { ...content.props.style, flex: 1 } })}
      </div>
    else
      return [
        React.cloneElement(content, { ...content.props, key: 0, style: { ...content.props.style, ...absoluteStretch } }),
        <div key={1}
          ref={div => firstRender() && tweens.push(TweenLite.to(div, duration, { display: 'block', paused: true, reversed: true, opacity: 0.85 }))}
          className={renderCSS({ ...absoluteStretch, backgroundColor: 'gray', opacity: 0, display: 'none' })}
          onClick={() => doShowDrawer(false)} />,
        <div key={2}
          ref={div => firstRender() && tweens.push(TweenLite.to(div, duration, { paused: true, reversed: true, left: 0 }))}
          className={renderCSS({ position: 'absolute', top: 0, bottom: 0, width: drawerWidth, display: 'flex', left: -drawerWidth })} >
          {React.cloneElement(menu, { ...menu.props, style: { ...menu.props.style, flex: 1 } })}
        </div>
      ] as any
  }
}


const absoluteStretch = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as CSSProperties

