import React from 'react';
import { renderCSS, renderCSSs } from '../lib/fela'

import { Divider, BottomNavigation, Toolbar, FontIcon, Button } from 'react-md'
import { View } from '../../app-common/gui/gui'
import { providerConnector } from '../../app-common/gui/drawer'

export const getDrawerHeader = (isContent: boolean, props: Drawer.IHeader) => getToolbar({ key: 10, ...props, isContent: isContent })

const drawerButtonShow: React.SFC<Drawer.IProps> = ({ drawerVisible, windowSize, showDrawer }) => !drawerVisible && (windowSize == Media.TWindowSize.tablet || windowSize == Media.TWindowSize.mobile) &&
  <Button icon onClick={() => showDrawer(true)} className='md-btn--toolbar md-toolbar--action-left'>menu</Button>
const DrawerButtonShow = providerConnector(drawerButtonShow)
const drawerButtonHide: React.SFC<Drawer.IProps> = ({ drawerVisible, windowSize, showDrawer }) => drawerVisible && (windowSize == Media.TWindowSize.tablet || windowSize == Media.TWindowSize.mobile) &&
  <Button icon onClick={() => showDrawer(false)} className='md-btn--toolbar'>close</Button>
const DrawerButtonHide = providerConnector(drawerButtonHide)

const getToolbar = (props: Drawer.IHeader & { isContent: boolean }) => {
  const { left, title, right, key, isContent, drawerVisible, windowSize, showDrawer } = props
  let toolbar: JSX.Element
  if (isContent) {
    toolbar = <Toolbar key={key} colored zDepth={2}
      nav={left || <DrawerButtonShow {...{ drawerVisible, windowSize, showDrawer}} />}
      title={title}
      actions={right}
    />
  } else {
    toolbar = <Toolbar key={key}
      nav={left}
      title={title}
      actions={right || <DrawerButtonHide {...{ drawerVisible, windowSize, showDrawer }} />}
    />
  }
  return [
    toolbar,
    <Divider key={'d' + key} style={{ marginTop: -1 }} />
  ]
}

export class AnimatedDrawer extends React.PureComponent<GUI.IAnimatedMobileDrawerProps> {

  tweens: gsap.TweenLite[] = []
  firstRender = true
  isVisible = this.props.drawerVisible

  render() {
    const { isVisible, tweens, props, firstRender } = this
    const { isTablet, duration: dur, content, menu, drawerVisible: willBeVisible, drawerWidth, showDrawer, refForAnimation, getMenu, getContent } = props
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

    //https://codepen.io/rhernando/pen/ojvRaK
    if (isTablet) {
      return <div
        ref={div => divCreated(0, div, true, () => TweenLite.to(div, duration, { paused: true, reversed: true, left: isVisible ? -drawerWidth : 0 }))}
        className={renderCSSs(absoluteStretch as CSSProperties, { flexDirection: 'row', display: 'flex', left: isVisible ? 0 : -drawerWidth })}
      >
        {getMenu(menu, { key: 0, style: { width: drawerWidth } })}
        {getContent(content, { key: 1, style: { flex: 1 } })} 
      </div>
    } else
      return <div ref={refForAnimation}>
        {getContent(content, { key: 1, style: absoluteStretch as ReactNative.ViewProperties })}
        <div key={2}
          ref={div => divCreated(0, div, false, () => TweenLite.to(div, duration, { display: 'block', paused: true, reversed: true, opacity: 0.85 }))}
          className={renderCSSs(absoluteStretch as CSSProperties, { backgroundColor: 'gray', opacity: 0, display: 'none' })}
          onClick={() => showDrawer(false)} />
        {!noAnimation && <div key={3}
          ref={div => divCreated(1, div, false, () => TweenLite.to(div, duration, { paused: true, reversed: true, left: 0 }))}
          className={renderCSS({ position: 'absolute', top: 0, bottom: 0, width: drawerWidth, display: 'flex', left: -drawerWidth } as CSSProperties)} >
          {getMenu(menu, { key: 0, style: { flex: 1 } })}
        </div>}
      </div>
  }
}

const absoluteStretch = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }
