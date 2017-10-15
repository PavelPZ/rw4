import React from 'react'
import { PromiseExtensible } from '../../app-common/lib/lib'
import { Animated } from "react-native";

//**** ANIMATE
export class AnimatedPromise extends PromiseExtensible<void> {

  constructor(private value: Animated.Value, private display: boolean) { super() }

  doStart() {
    const { value, display } = this
    value.setValue(display ? 1 : 0.05)
    const tw = Animated.timing(value, {
      duration: 125,
      toValue: display ? 0.05 : 1
    })
    //value.addListener(v => console.log(v))
    tw.start(res => {
      this.resolve()
      delete this.value
    });
  }

  abort(msg?) {
    const { value, _state } = this
    if (value) value.stopAnimation()
    delete this.value
    if (_state) return this
    return super.abort(msg)
  }
}

export const getAnimator = (animValue: WebNativeCommon.TRouterAnimRoot, display: boolean) => new AnimatedPromise(animValue, display)

export class Page extends React.PureComponent<Router.IRouterPageProps> {
  value = new Animated.Value(1)
  componentDidMount() { this.props.refForAnimation(this.value) }
  render() {
    return null
    //return <SideMenu menuContent={this.props.drawerMenu.navItems[0]}>
    //  <Animated.View style={{ flex: 1, opacity: this.value as any }}>
    //    {this.props.children}
    //  </Animated.View>
    //</SideMenu>
  }
}

