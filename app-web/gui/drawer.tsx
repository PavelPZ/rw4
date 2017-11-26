import React from 'react';
import { rulesToClassNames} from 'rw-mui-w/styles/fela'

import { Divider, BottomNavigation, Toolbar } from 'react-md'
import { View, Button } from '../../app-common/gui/gui'
import { providerConnector } from '../../app-common/gui/drawer'

const getDrawerContent = (pars: Drawer.IContent, st: Drawer.IStyled) => <Content {...pars} {...st} />
const getDrawerMenu = (pars: Drawer.IMenu, st: Drawer.IStyled) => <Menu {...pars} {...st} />

class Content extends React.Component<Drawer.IContent> {

  shouldComponentUpdate(nextProps: Drawer.IContent) { return false }

  render() {
    const { header, content, node, style, web, webStyle, children, ...rest } = this.props
    const styled = { web, style: [viewStyle, style, webStyle] } as Drawer.IStyled
    if (node) return node(styled)
    return <View {...styled} >
      {getToolbar({ key: 10, ...header, isContent: true })}
      {contentContent({ ...content, ...rest, key: 20 })}
    </View>
  }
}

const contentContent = ({ node, style, key, web, webStyle, items, ...rest }: Drawer.IContentContent) => {
  const styled: Drawer.IStyled = { key: key, style: { flex: 1, padding: 8 }, webStyle: { overflow: 'auto' } }
  if (node) return node(styled)
  return <View {...styled}>
    {items}
  </View>
}

class Menu extends React.Component<Drawer.IMenu> {

  shouldComponentUpdate(nextProps) { return false }

  render() {
    const { header, content, node, style, web, webStyle, children, ...rest } = this.props
    const styled = { style: [style, { zIndex: 1, backgroundColor: 'white' }, webStyle], web: { ...web, className: 'md-paper--1' } } as Drawer.IStyled
    if (node) return node(styled)
    return <View {...styled}>
      {getToolbar({ key: 10, ...header, isContent: false })}
      {menuContent({ ...content, ...rest, key: 30 })}
    </View>
  }
}

const menuContent = (props: Drawer.IMenuContent) => {
  const { node, style, items, key, ...rest } = props
  const styled: Drawer.IStyled = { key: key, style: { flex: 1, padding: 8 }, webStyle: { overflow: 'auto' } }
  if (node) return node(styled)
  return <View {...styled}>
    {items}
  </View>
}


const drawerButtonShow: React.SFC<Drawer.IStateDispatch> = ({ drawerVisible, windowSize, showDrawer }) => !drawerVisible && (windowSize == Media.TWindowSize.tablet || windowSize == Media.TWindowSize.mobile) &&
  <Button flat iconName={GUI.mdi_icons.menu} onPress={() => showDrawer(true)} web={{ className: 'md-btn--toolbar md-toolbar--action-left' }} />
const DrawerButtonShow = providerConnector(drawerButtonShow)
const drawerButtonHide: React.SFC<Drawer.IStateDispatch> = ({ drawerVisible, windowSize, showDrawer }) => drawerVisible && (windowSize == Media.TWindowSize.tablet || windowSize == Media.TWindowSize.mobile) &&
  <Button flat iconName={GUI.mdi_icons.close} onPress={() => showDrawer(false)} web={{ className: 'md-btn--toolbar' }} />
const DrawerButtonHide = providerConnector(drawerButtonHide)

const getToolbar = (props: Drawer.IHeader & { isContent: boolean }) => {
  const { left, title, right, key, isContent, drawerVisible, windowSize, showDrawer } = props
  let toolbar: JSX.Element
  if (isContent) {
    toolbar = <Toolbar key={key} colored zDepth={2}
      nav={left || <DrawerButtonShow {...{ drawerVisible, windowSize, showDrawer }} />}
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
    const { windowSize, duration: dur, content, menu, drawerVisible: willBeVisible, drawerWidth, showDrawer, refForAnimation } = props
    const duration = (dur || App.Consts.animationDurationMsec) / 1000
    const isTablet = windowSize === Media.TWindowSize.tablet

    const animation = !firstRender && isVisible != willBeVisible
    if (animation) this.isVisible = willBeVisible
    this.firstRender = false

    const animate = () => {
      if (!animation || refsNum == 0 || (!isTablet && refsNum < 2)) return
      tweens.forEach(t => t.reversed() ? t.play() : t.reverse())
    }

    let refsNum = 0
    const divCreated = (idx: number, div: HTMLElement, animationDiv: boolean, tweenLite: () => gsap.TweenLite) => {
      if (!div) return
      refsNum++
      if (!tweens[idx]) {
        tweens[idx] = tweenLite()
        animationDiv && refForAnimation && refForAnimation(div) //tablet: animace pro router
      }
      animate()
    }

    switch (windowSize) {
      case Media.TWindowSize.tablet: return <div
        ref={div => divCreated(0, div, true, () => TweenLite.to(div, duration, { paused: true, reversed: true, left: isVisible ? -drawerWidth : 0 }))}
        className={rulesToClassNames(absoluteStretch as CSSProperties, { flexDirection: 'row', display: 'flex', alignContent: 'stretch', left: isVisible ? 0 : -drawerWidth })}
      >
        {getDrawerMenu(menu, { key: 0, style: { flexBasis: drawerWidth, flexShrink: 0 } })}
        {getDrawerContent(content, { key: 1, style: { flex: 1 } })}
      </div>
      case Media.TWindowSize.mobile: return <div ref={refForAnimation}>
        {getDrawerContent(content, { key: 1, style: absoluteStretch as RN.ViewProperties })}
        <div key={2}
          ref={div => divCreated(0, div, false, () => TweenLite.to(div, duration, { display: 'block', paused: true, reversed: true, opacity: 0.85 }))}
          className={rulesToClassNames(absoluteStretch as CSSProperties, { backgroundColor: 'gray', opacity: 0, display: 'none' })}
          onClick={() => showDrawer(false)} />
        {animation && <div key={3}
          ref={div => divCreated(1, div, false, () => TweenLite.to(div, duration, { paused: true, reversed: true, left: 0 }))}
          className={rulesToClassNames({ position: 'absolute', top: 0, bottom: 0, width: drawerWidth, display: 'flex', left: -drawerWidth } as CSSProperties)} >
          {getDrawerMenu(menu, { key: 0, style: { flex: 1 } })}
        </div>}
      </div>
      default: return <div className={rulesToClassNames(absoluteStretch as CSSProperties, { display: 'flex', flexDirection: 'row' })} ref={refForAnimation}>
        {getDrawerMenu(menu, { key: 1, style: { flexBasis: drawerWidth, flexShrink: 0 } })}
        {getDrawerContent(content, { key: 2, style: { flex: 1 } })}
      </div>
    }
  }
}

const absoluteStretch = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }
const viewStyle: CSSProperties = { display: 'flex', flexDirection: 'column' } 
