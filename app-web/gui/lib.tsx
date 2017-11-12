import React from 'react'
import { PlatformStatic } from 'react-native';
import { renderCSS } from 'rw-fela-w/index'
import { PromiseExtensible } from '../../app-common/lib/lib';

export const Platform: PlatformStatic = {
  OS: 'web',
  Version: 1,
  select: (obj: any) => ('web' in obj ? obj.web : {})
};

export const KeyboardHandler = onPress => (ev: React.KeyboardEvent<{}>) => { if (!onPress || ev.keyCode !== 13) return; ev.stopPropagation(); onPress(ev); }
export const MouseHandler = onPress => (ev: React.MouseEvent<{}>) => { if (!onPress) return; ev.stopPropagation(); onPress(ev); }
export const ClickHandler = (onPress: () => void, props) => {
  if (!onPress) return null
  props.onClick = MouseHandler(onPress)
  props.onKeyDown = KeyboardHandler(onPress)
}

//export class WaitForRendering extends React.PureComponent<{ waitFor: Promise<any>, waitChildren: JSX.Element }> {
//  state = { doRender: false }
//  render() {
//    if (this.state.doRender) return React.Children.only(this.props.children)
//    //this.props.waitFor.then(() => setTimeout(() => this.setState({ doRender: true }), 500))
//    this.props.waitFor.then(() => setTimeout(() => this.setState({ doRender: true }), 1))
//    return this.props.waitChildren
//  }
//}
//export const LayerProvider: React.SFC<any> = props => <div>
//  {props.children}
//</div>
export const LayerProvider: React.SFC<any> = props => React.Children.toArray(props.children) as any


export const waitChildren = <div className={renderCSS({ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', height:'100vh'})}>
  <h2>Loading...</h2>
</div>

//export class TweensPromise extends PromiseExtensible<void> {

//  animate(el: HTMLElement, secs: number, pars: GUI.ITweenParsEx, to?: any): TweensPromise {
//    if (this._state) return this
//    const { tweenProc, ...rest } = pars
//    this.tw = (tweenProc || TweenLite.to)(el, secs, { ...rest, onComplete: () => { delete this.tw; if (this._state) return; this.resolve() } }, to)
//    return this
//  }

//  abort(msg?) {
//    if (this.tw) this.tw.progress(1, true)
//    delete this.tw
//    if (this._state) return this
//    return super.abort(msg)
//  }
//  stop() {
//    if (this.tw) this.tw.pause()
//    delete this.tw
//    return super.abort('stop')
//  }
//  tw: gsap.TweenLite
//}

//export class TweensAnimate extends TweensPromise {
//  constructor(el: HTMLElement, secs: number, pars: GUI.ITweenParsEx, to?: any) {
//    super()
//    this.animate(el, secs, pars, to)
//  }
//}
