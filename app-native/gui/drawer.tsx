import React from 'react';
import { View, Animated, TouchableWithoutFeedback, PanResponder } from 'react-native'
import { Footer, FooterTab, Icon, Title, Subtitle, Container, Header, Content, Text, Button, H2, Left, Right, Body } from 'native-base'
import { providerConnector } from '../../app-common/gui/drawer'

export const getDrawerContent = (pars: Drawer.IContent, st: Drawer.IStyled) => <ContentDr {...pars} {...st} />
export const getDrawerMenu = (pars: Drawer.IMenu, st: Drawer.IStyled) => <Menu {...pars} {...st} />

class ContentDr extends React.Component<Drawer.IContent> {

  shouldComponentUpdate(nextProps: Drawer.IContent) { return false }

  render() {
    const { header, content, node, style, key, web, webStyle, children, ...rest } = this.props
    const styled = { style, key }
    if (node) return node(styled)
    return <Container {...styled}>
      {getToolbar({ key: 10, ...header, isContent: true })}
      {contentContent({ ...content, ...rest })}
    </Container>
  }
}

const contentContent = ({ node, style, key, web, webStyle, items, ...rest }: Drawer.IContentContent) => {
  const styled: Drawer.IStyled = { key: 2, style: { padding: 10, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' } }
  if (node) return node(styled)
  return <Content key={styled.key} contentContainerStyle={styled.style}>
    {items}
  </Content>
}

class Menu extends React.Component<Drawer.IMenu> {

  shouldComponentUpdate(nextProps) { return false }

  render() {
    const { header, content, node, style, key, web, webStyle, children, ...rest } = this.props
    const styled = { style: { ...style, backgroundColor: 'white', ...elevation }, key }
    if (node) return node(styled)
    return <Container {...styled}>
      {getToolbar({ key: 10, ...header, isContent: false })}
      {menuContent({ ...content, ...rest })}
    </Container>
  }
}

const menuContent = (props: Drawer.IMenuContent) => {
  const { node, style, items, ...rest } = props
  const styled: Drawer.IStyled = { key: 30, style: { flex: 1, padding: 8 } }
  if (node) return node(styled)
  return <Content {...styled}>
    {items}
  </Content>
}


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
  return toolbar
}


export class AnimatedDrawer extends React.PureComponent<GUI.IAnimatedMobileDrawerProps> {
  rendered: boolean
  value = new Animated.Value(this.props.drawerVisible ? 1 : 0)
  animation: ReactNative.Animated.CompositeAnimation

  render() {
    const { animation, rendered, value, props } = this
    const { isTablet, duration, content, menu, drawerVisible: willBeVisible, drawerWidth, showDrawer, screenWidth, getMenu, getContent } = props
    const doAnimation = (willBeVisible: boolean, newDrawerState?: boolean) => {
      this.animation = Animated.timing(value, { toValue: willBeVisible ? 1 : 0, duration: duration || App.Consts.animationDurationMsec, delay: 1 })
      this.animation.start(() => { this.animation = null; if (typeof (newDrawerState) != 'undefined') showDrawer(newDrawerState) })
    }
    if (animation) { animation.stop(); this.animation = null }
    const opacityValue = isTablet ? null : value.interpolate({ inputRange: [0, 0.1, 1], outputRange: [0, 0, 0.85] })
    const leftValue = value.interpolate({ inputRange: [0, 1], outputRange: [-drawerWidth, 0] })
    const widthValue = isTablet ? null : value.interpolate({ inputRange: [0, 0.1, 1], outputRange: [0, screenWidth, screenWidth] })
    if (!rendered)
      this.rendered = true
    else {
      doAnimation(willBeVisible)
    }

    const uninterpolate = (dx: number, hide?: boolean) => {
      let val = (hide ? drawerWidth + dx : dx) / drawerWidth
      return val < 0 ? 0 : (val > 1 ? 1 : val)
    }
    const dxStart = 0.11 * drawerWidth

    const onPanResponderRelease = (e, gestureState) => { if (uninterpolate(gestureState.dx) > 0.4/*pomer sirky draweru, po kterem se drawer otevre*/) doAnimation(true, true); else doAnimation(false) }
    const toVisibleHandlers = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (e, gestureState) => {
        if (e.nativeEvent.pageX > (isTablet ? 60 : 40 /*sirka pruhu vlevo, citriveho na drag start*/) || (gestureState.dx > 10 && Math.abs(gestureState.dy) < 10)) return false
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

    if (isTablet)
      return <View style={absoluteStretch as any} {...!willBeVisible ? toVisibleHandlers.panHandlers : toHideHandlers.panHandlers}>
        <Animated.View style={{ left: leftValue as any, position: 'absolute', top: 0, right: 0, bottom: 0, flexDirection: 'row' }} >
          {getDrawerMenu(menu, { key: 1, style: { width: drawerWidth } })}
          {getDrawerContent(content, { key: 0, style: { flex: 1 } })}
        </Animated.View>
      </View>
    else
      return <View style={absoluteStretch as any} {...!willBeVisible ? toVisibleHandlers.panHandlers : toHideHandlers.panHandlers}>
        {getDrawerContent(content, { key: 0, style: absoluteStretch as ReactNative.ViewProperties })}
        <TouchableWithoutFeedback key={1} onPress={() => showDrawer(false)}>
          <Animated.View style={{ opacity: opacityValue as any, width: widthValue as any, ...topBottom, left: 0, backgroundColor: 'gray' }} />
        </TouchableWithoutFeedback>
        <Animated.View key={2} style={{ left: leftValue as any, ...topBottom, width: drawerWidth }} >
          {getDrawerMenu(menu, { style: { flex: 1 } })}
        </Animated.View>
      </View>
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
