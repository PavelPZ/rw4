import React from 'react';
import { renderCSS, renderCSSs } from '../lib/fela'

import { Divider, BottomNavigation, Toolbar, FontIcon, Button as MDButton } from 'react-md'
import { Text, View, Button } from '../../app-common/gui/gui'
import { providerConnector } from '../../app-common/gui/drawer'

export const getContent = (pars: Drawer.IContent, st: Drawer.IStyled) => <Content {...pars} {...st} />
export const getMenu = (pars: Drawer.IMenu, st: Drawer.IStyled) => <Menu {...pars} {...st} />


const showDrawerButton: React.SFC<any> = props => {
  const { drawerVisible, windowSize } = props; return !drawerVisible && (windowSize == Media.TWindowSize.tablet || windowSize == Media.TWindowSize.mobile) && <MDButton icon onClick={() => props.showDrawer(true)} className='md-btn--toolbar md-toolbar--action-left'>menu</MDButton>
}
let ShowDrawerButton
const hideDrawerButton: React.SFC<any> = props => {
  const { drawerVisible, windowSize } = props; return drawerVisible && (windowSize == Media.TWindowSize.tablet || windowSize == Media.TWindowSize.mobile) && <MDButton icon onClick={() => props.showDrawer(false)} className='md-btn--toolbar'>close</MDButton>
}
let HideDrawerButton


class Content extends React.Component<Drawer.IContent> {

  shouldComponentUpdate(nextProps: Drawer.IContent) { return false }

  render() {
    const { header, content, node, style, key, web, webStyle, children, ...rest } = this.props
    const styled = { style, key, web, webStyle }
    if (node) return node(styled)
    return <View {...styled} >
      {contentHeader({ ...header, ...rest })}
      {contentContent({ ...content, ...rest })}
    </View>
  }
}

const contentHeader = (props: Drawer.IContentHeader) => {
  const { left, title, right, node, ...rest } = props
  const styled = { key: 10 }
  if (node) return node(styled)
  if (!ShowDrawerButton) ShowDrawerButton = providerConnector(showDrawerButton)
  return <Toolbar {...styled} colored zDepth={2}
    nav={left || <ShowDrawerButton {...props} />}
    title={title}
    actions={right}
  />
}

const contentContent = (props: Drawer.IContentContent) => {
  const { node, style, key, web, webStyle, items, ...rest } = props
  const styled: Drawer.IStyled = { key: 20, style: { flex: 1, padding: 8 }, webStyle: { overflow: 'auto' } }
  if (node) return node(styled)
  return <View {...styled}>
    {items}
  </View>
}

class Menu extends React.Component<Drawer.IMenu> {

  shouldComponentUpdate(nextProps) { return false }

  render() {
    const { header, content, node, style, key, web, webStyle, children, ...rest } = this.props
    const styled = { style: { ...style, zIndex: 1, backgroundColor: 'white' }, key, web: { ...web, className: 'md-paper--1' }, webStyle }
    if (node) return node(styled)
    return <View {...styled}>
      {menuHeader({ ...rest, ...header })}
      <Divider key={20} style={{ marginTop: -1 }} />
      {menuContent({ ...content, ...rest })}
    </View>
  }
}

const menuHeader = (props: Drawer.IMenuHeader) => {
  const { node, left, title, right, ...rest } = props
  if (node) return React.cloneElement(node, { ...node.props, key: 10 })
  if (!HideDrawerButton) HideDrawerButton = providerConnector(hideDrawerButton)
  return <Toolbar key={10}
    nav={left}
    title={title}
    actions={right || <HideDrawerButton {...props} />}
  />
}

const menuContent = (props: Drawer.IMenuContent) => {
  const { node, style, items, ...rest } = props
  const styled: Drawer.IStyled = { key: 30, style: { flex: 1, padding: 8 }, webStyle: { overflow: 'auto' } }
  if (node) return node(styled) //React.cloneElement(node, { ...node.props, key: 30 })
  return <View {...styled}>
    {items}
  </View>
}


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
        {getMenu(menu, { key: 0, style: { width: drawerWidth } })/*React.cloneElement(menu, { ...menu.props, key: 1, style: { ...menu.props.style, width: drawerWidth } })*/}
        {getContent(content, { key: 1, style: { flex: 1 } }) /*React.cloneElement(content, { ...content.props, key: 0, style: { ...content.props.style, flex: 1 } })*/}
      </div>
    } else
      return <div ref={refForAnimation}>
        {getContent(content, { key: 1, style: absoluteStretchView })/*React.cloneElement(content, { ...content.props, key: 1, style: { ...content.props.style, ...absoluteStretch } })*/}
        <div key={2}
          ref={div => divCreated(0, div, false, () => TweenLite.to(div, duration, { display: 'block', paused: true, reversed: true, opacity: 0.85 }))}
          className={renderCSSs(absoluteStretch, { backgroundColor: 'gray', opacity: 0, display: 'none' })}
          onClick={() => showDrawer(false)} />
        {!noAnimation && <div key={3}
          ref={div => divCreated(1, div, false, () => TweenLite.to(div, duration, { paused: true, reversed: true, left: 0 }))}
          className={renderCSS({ position: 'absolute', top: 0, bottom: 0, width: drawerWidth, display: 'flex', left: -drawerWidth } as CSSProperties)} >
          {getMenu(menu, { key: 0, style: { flex: 1 } })/*React.cloneElement(menu, { ...menu.props, style: { ...menu.props.style, flex: 1 } })*/}
        </div>}
      </div>
  }
}


const absoluteStretch = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as CSSProperties
const absoluteStretchView = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as ReactNative.ViewProperties
