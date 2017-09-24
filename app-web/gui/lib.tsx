import React from 'react'
import { PlatformStatic } from 'react-native';
import { renderCSS } from '../lib/fela';
import { PromiseExtensible } from '../../app-common/lib/lib';

export const H1: React.SFC<{}> = props => <h1 {...props} />
export const H2: React.SFC<{}> = props => <h2 {...props} />
export const H3: React.SFC<{}> = props => <h3 {...props} />

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

export const colorToStyle = {
  [GUI.Colors.success]: GUI.Colors.Green,
  [GUI.Colors.primary]: GUI.Colors.Indigo,
  [GUI.Colors.danger]: GUI.Colors.Pink,
  [GUI.Colors.secondary]: GUI.Colors.Pink,
  [GUI.Colors.warning]: GUI.Colors.Orange,
  [GUI.Colors.info]: GUI.Colors.Blue,
  [GUI.Colors.default]: GUI.Colors.White,
  [GUI.Colors.dark]: GUI.Colors.Black,
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
export const LayerProvider: React.SFC<any> = props => <div>
  {props.children}
</div>


export const waitChildren = <div className={renderCSS({display:'flex', flex:1, justifyContent:'center', alignItems: 'center', height:'100v'})}>
  <h2>Loading...</h2>
</div>

export class TweensPromise extends PromiseExtensible<void> {

  animate(el: HTMLElement, secs: number, pars: GUI.ITweenParsEx): TweensPromise {
    if (this._state) return this
    const { tweenProc, ...rest } = pars
    this.tw = (tweenProc || TweenLite.to)(el, secs, { ...rest, onComplete: () => { delete this.tw; if (this._state) return; this.resolve() } })
    return this
  }

  abort(msg?) {
    if (this.tw) this.tw.progress(1, true)
    delete this.tw
    if (this._state) return this
    return super.abort(msg)
  }
  tw: gsap.TweenLite
}




