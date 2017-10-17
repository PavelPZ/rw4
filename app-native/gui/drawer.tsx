import React from 'react';
import { Text, View, Animated, TouchableWithoutFeedback, PanResponder } from 'react-native'
import { Button, Footer, FooterTab, Icon, Title, Subtitle, Container, Header, Content, H2, Left, Right, Body, StyleProvider } from 'native-base'
import { providerConnector } from '../../app-common/gui/drawer'

import headerTheme from './theme/components/Header'
import variables, { getPlatformVariables, Palette, Fonts } from './theme/platform'
import getTheme from './theme/components/index'

import { connectStyle } from 'native-base-shoutem-theme'
import { Button as GUIButton } from '../../app-common/gui/gui'

const getDrawerContent = (pars: Drawer.IContent, styled: Drawer.IStyled) => <ContentDr {...pars} {...styled} />
const getDrawerMenu = (pars: Drawer.IMenu, styled: Drawer.IStyled) => <Menu {...pars} {...styled} />

class ContentDr extends React.Component<Drawer.IContent> {

  shouldComponentUpdate(nextProps: Drawer.IContent) { return false }

  render() {
    const { header, content, node, style, web, webStyle, children, ...rest } = this.props
    const styled = { style }
    if (node) return node(styled)
    return <Container {...styled as any}>
      {getToolbar({ key: 10, ...header, isContent: true })}
      {contentContent({ ...content, ...rest })}
    </Container>
  }
}

const contentContent = ({ node, style, key, web, webStyle, items, ...rest }: Drawer.IContentContent) => {
  const styled: Drawer.IStyled = { key: key }
  if (node) return node(styled)
  return <Content key={styled.key} contentContainerStyle={styled.style as any}>
    {items}
  </Content>
}

class Menu extends React.Component<Drawer.IMenu> {

  shouldComponentUpdate(nextProps) { return false }

  render() {
    const { header, content, node, style, web, webStyle, children, ...rest } = this.props
    const styled = { style: [elevation, { backgroundColor: 'white' }, style] as ReactNative.ViewStyle[] }
    //console.log(styled)
    if (node) return node(styled)
    return <Container {...styled as any}>
      {getToolbar({ key: 10, ...header, isContent: false })}
      {menuContent({ ...content, ...rest })}
    </Container>
  }
}

const menuContent = (props: Drawer.IMenuContent) => {
  const { node, style, items, ...rest } = props
  const styled = { key: 30, style: { flex: 1, padding: 8 } }
  if (node) return node(styled)
  return <Content {...styled}>
    {items}
  </Content>
}

const drawerButtonShow: React.SFC<Drawer.IProps> = ({ drawerVisible, windowSize, showDrawer }) => !drawerVisible && (windowSize == Media.TWindowSize.tablet || windowSize == Media.TWindowSize.mobile) &&
  GUIButton({ iconName: GUI.IonicIcons.menu, flat: true, light: true, onPress: () => showDrawer(true) })
const DrawerButtonShow = providerConnector(drawerButtonShow)

const drawerButtonHide: React.SFC<Drawer.IProps> = ({ drawerVisible, windowSize, showDrawer }) => drawerVisible && (windowSize == Media.TWindowSize.tablet || windowSize == Media.TWindowSize.mobile) &&
  GUIButton({ iconName: GUI.IonicIcons.close, flat: true, light: true, onPress: () => showDrawer(false) })
const DrawerButtonHide = providerConnector(drawerButtonHide)

const getToolbar = (props: Drawer.IHeader & { isContent: boolean }) => {
  const { left, title, right, key, isContent, drawerVisible, windowSize, showDrawer } = props
  let toolbar: JSX.Element
  if (isContent) {
    toolbar = <StyleProvider style={darkHeader}>
      <Header key={key}>
        {(windowSize != Media.TWindowSize.mobile || left) && <Left>
          {left || <DrawerButtonShow {...{ drawerVisible, windowSize, showDrawer }} />}
        </Left>}
        <Body>
          <Title>{title}</Title>
        </Body>
        {right && <Right>
          {right}
        </Right>}
      </Header>
    </StyleProvider>
  } else {
    toolbar = <StyleProvider style={lightHeader}>
      <Header key={key} style={noElevation} >
        {left && <Left>
          {left}
        </Left>}
        <Body>
          <Title>{title} {title}</Title>
        </Body>
        {(windowSize != Media.TWindowSize.mobile || right) && <Right>
          {right || <DrawerButtonHide {...{ drawerVisible, windowSize, showDrawer }} />}
        </Right>}
      </Header>
    </StyleProvider>
  }
  return toolbar
}
//console.log(variables)
const vars = getPlatformVariables(variables.platform)
vars.toolbarDefaultBg = variables.inverseTextColor
vars.toolbarBtnColor = variables.brandPrimary
vars.titleFontColor = variables.colHeader

const lightHeader = getTheme(variables)
const darkHeader = { ...lightHeader, 'NativeBase.Header': headerTheme(vars) }

export class AnimatedDrawer extends React.PureComponent<GUI.IAnimatedMobileDrawerProps> {
  rendered: boolean
  value = new Animated.Value(this.props.drawerVisible ? 1 : 0)
  animation: ReactNative.Animated.CompositeAnimation
  routeOpacity = new Animated.Value(0)

  render() {
    const { animation, rendered, value, props, routeOpacity } = this
    const { windowSize, duration, content, menu, drawerVisible: willBeVisible, drawerWidth, showDrawer, screenWidth, refForAnimation } = props
    const doAnimation = (willBeVisible: boolean, newDrawerState?: boolean) => {
      this.animation = Animated.timing(value, { toValue: willBeVisible ? 1 : 0, duration: duration || App.Consts.animationDurationMsec, delay: 1 })
      this.animation.start(() => { this.animation = null; if (typeof (newDrawerState) != 'undefined') showDrawer(newDrawerState) })
    }
    const isTablet = windowSize === Media.TWindowSize.tablet
    if (animation) { animation.stop(); this.animation = null }
    const opacityValue = isTablet ? null : value.interpolate({ inputRange: [0, 0.1, 1], outputRange: [0, 0, 0.85] })
    const leftValue = value.interpolate({ inputRange: [0, 1], outputRange: [-drawerWidth, 0] })
    const widthValue = isTablet ? null : value.interpolate({ inputRange: [0, 0.1, 1], outputRange: [0, screenWidth, screenWidth] })
    if (!rendered)
      this.rendered = true
    else
      doAnimation(willBeVisible)

    const uninterpolate = (dx: number, hide?: boolean) => {
      let val = (hide ? drawerWidth + dx : dx) / drawerWidth
      return val < 0 ? 0 : (val > 1 ? 1 : val)
    }
    const dxStart = 0.11 * drawerWidth

    const onPanResponderRelease = (e, gestureState) => { if (uninterpolate(gestureState.dx) > 0.4/*pomer sirky draweru, po kterem se drawer otevre*/) doAnimation(true, true); else doAnimation(false) }
    const toVisibleHandlers = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (e, gestureState) => {
        if (e.nativeEvent.pageX > (isTablet ? 60 : 40 /*sirka pruhu vlevo, citriveho na drag start*/) || (gestureState.dx < 10)) return false
        value.setValue(0.11)
        return true
      },
      onPanResponderMove: (e, gestureState) => value.setValue(uninterpolate(gestureState.dx + dxStart)),
      onPanResponderRelease: onPanResponderRelease,
      onPanResponderTerminate: onPanResponderRelease,
    })
    const onHideResponderRelease = (e, gestureState) => { if (gestureState.dx < -40) doAnimation(false, false) }
    const toHideHandlers = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (e, gestureState) => gestureState.dx < -10 && Math.abs(gestureState.dy) < 10,
      onPanResponderMove: (e, gestureState) => value.setValue(uninterpolate(gestureState.dx, true)),
      onPanResponderRelease: onHideResponderRelease,
      onPanResponderTerminate: onHideResponderRelease
    })
    //console.log(windowSize, leftValue, widthValue)
    switch (windowSize) {
      case Media.TWindowSize.tablet: return <Animated.View
        style={[absoluteStretch as any, { backgroundColor: 'white', opacity: routeOpacity }]}
        {...!willBeVisible ? toVisibleHandlers.panHandlers : toHideHandlers.panHandlers}
        ref={view => view && !rendered && refForAnimation && refForAnimation(routeOpacity)}>
        <Animated.View style={{ left: leftValue, position: 'absolute', top: 0, right: 0, bottom: 0, flexDirection: 'row' }} >
          {getDrawerMenu(menu, { key: 1, style: { flexBasis: drawerWidth, flexShrink: 0, flex: 0 } })}
          {getDrawerContent(content, { key: 0, style: { flex: 1 } })}
        </Animated.View>
      </Animated.View>
      case Media.TWindowSize.mobile: return <Animated.View
        style={[absoluteStretch, { backgroundColor: 'white', opacity: routeOpacity }]}
        {...!willBeVisible ? toVisibleHandlers.panHandlers : toHideHandlers.panHandlers }
        ref={view => view && !rendered && refForAnimation && refForAnimation(routeOpacity)}>
        {getDrawerContent(content, { key: 1, style: absoluteStretch as ReactNative.ViewProperties })}
        <TouchableWithoutFeedback key={2} onPress={() => showDrawer(false)}>
          <Animated.View style={{ opacity: opacityValue as any, width: widthValue as any, ...topBottom, left: 0, backgroundColor: 'gray', elevation: 4 } as ReactNative.ViewStyle} />
        </TouchableWithoutFeedback >
        <Animated.View key={3} style={[topBottom, { left: leftValue, width: drawerWidth }]} >
          {getDrawerMenu(menu, { style: { elevation: 5 } })}
        </Animated.View>
      </Animated.View >
      default: return <Animated.View style={[absoluteStretch, { opacity: routeOpacity, flexDirection: 'row' }]} ref={view => refForAnimation(routeOpacity)}>
        {getDrawerMenu(menu, { key: 1, style: { flexBasis: drawerWidth, flexShrink: 0, flex: 0 } })}
        {getDrawerContent(content, { key: 2, style: { flex: 1 } })}
      </Animated.View>
    }
  }
}

const absoluteStretch = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }
const topBottom = { position: 'absolute', top: 0, bottom: 0 }

const elevation = {
  elevation: 3,
  shadowColor: "#000",
  shadowOffset: { width: 2, height: 0 },
  shadowOpacity: 0.2,
  shadowRadius: 1.2,
}

const noElevation = {
  elevation: 0,
  shadowColor: 'transparent',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0,
  shadowRadius: 0,
}
