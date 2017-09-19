//BEST: demo krivek, donwload apod.  https://greensock.com/get-started-js a common lightweight choice is TweenLite, CSSPlugin, and EasePack
import React from 'react'
import { doTween } from '../gui/lib'

const Root: React.SFC<any> = props => {
  let router: Router
  let par = 1
  //https://web-design-weekly.com/2014/11/18/viewport-units-vw-vh-vmin-vmax/
  return <div style={{ height: '100vh', overflow: 'auto' }}>
    <div style={{ alignSelf: 'flex-start' }}>
      <button onClick={() => router.navigate({ par: par++ })}>CLICK</button>
    </div>
    <Router ref={r => router = r} initPar={{ par: par++ }} />
  </div>
}

class Router extends React.PureComponent<{ initPar: { par: number } }> {

  static tweenTime = 0.15
  static animProps = { opacity: 0.05 }

  state: { actKey: number; contents: any[] } = Router.reduceStart({ actKey: 0, contents: [] }, this.props.initPar)

  roots = []
  animate: Animate

  render() {
    if (this.animate) {
      this.animate.cancel()
      this.animate = null
    }
    const { actKey, contents } = this.state
    const actIdx = actKey % 2; const oldIdx = (actKey - 1) % 2;
    const newPar = contents[actIdx]; const oldPar = contents[oldIdx]
    if (!oldPar) return <div><Content state={newPar} stateIdx={actIdx} key={actKey} onRef={root => this.roots[actIdx] = root} /></div> //init or after anim render
    let newEl: JSX.Element
    const newWaiter = new Promise<HTMLElement>(resolve => newEl = <Content state={newPar} stateIdx={actIdx} key={actKey} onRef={root => resolve(root)} />)
    newWaiter.then(async root => {
      this.roots[actIdx] = root
      this.animate = new Animate(root, this.roots[oldIdx])
      await this.animate.animate()
      //animace dobehla => uklid
      this.animate = null
      this.roots[oldIdx] = null
      this.setState(Router.reduceEnd(this.state)) //DISPATCH ACTION
    })
    return <div>
      <Content state={oldPar} stateIdx={oldIdx} key={actKey - 1} />
      {newEl}
    </div>
  }

  navigate(par) {
    this.setState(Router.reduceStart(this.state, par))
  }

  static reduceStart(oldState, par) {
    const { actKey: oldKey, contents } = oldState
    const newIdx = (oldKey + 1) % 2
    const bothAreFull = !!contents[newIdx] //existuji obe stranky => jeste nedobehla animace
    if (bothAreFull) contents[oldKey % 2] = null //zrus starou stranku
    contents[newIdx] = par //na misto nove dej novou
    return { actKey: oldKey + 1, contents: [...contents] }
  }

  static reduceEnd(oldState) {
    const { actKey, contents } = oldState
    contents[(actKey - 1) % 2] = null
    return { actKey, contents: [...contents] }
  }

  //async setContent(content: IGetContent) {
  //  const { content: { cancel }, content: { cancel: newCancel } } = this.cancel
  //  if (cancel || newCancel) {
  //    if (cancel) cancel()
  //    if (newCancel) newCancel()
  //    this.setState({ content, newContent: null })
  //    return
  //  }
  //  //render both pages and wait for HTML Elements
  //  this.setState({ content: this.state.content, newContent: content })
  //  const divNew = await this.state.newContent.waitFor
  //  const oldDisplay = divNew.style.display
  //  divNew.style.display = 'none'
  //  const divContent = await this.state.content.waitFor
  //  //hide old and show new
  //  await doTween(divContent, Router.tweenTime, { ...Router.animProps, ease: Power0.easeIn, cancel: this.cancel.content, })
  //  this.setState({ content: content, newContent: null })
  //  divNew.style.display = oldDisplay
  //  await doTween(divNew, Router.tweenTime, { ...Router.animProps, ease: Power0.easeOut, cancel: this.cancel.newContent, tweenProc: TweenLite.from })
  //}
}

class Animate {
  constructor(private oldEl: HTMLElement, private newEl: HTMLElement) {
  }
  animate():Promise<void> { return null }
  cancel() { }
}

class Content extends React.PureComponent<{ stateIdx: number, state: { par: number }, onRef?: (root: HTMLDivElement) => void }> {
  shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
    return nextProps.state !== this.props.state
  }
  render() {
    const par = this.props.state.par
    return <div ref={root => { root && this.props.onRef && this.props.onRef(root) }} >
      <h3>TITLE {par}: {renders++}</h3>
      {contentText(par)}
    </div>
  }
}
let renders = 1
const contentText = (count) => {
  const txt = []; for (let i = 0; i < 20; i++) {
    if (count % 2) {
      txt.push(' asd f sad fsa df sad f sad fsad f asd f asdf as df asd f asd fas df sad fsad f'); txt.push(txt[txt.length - 1]); txt.push(txt[txt.length - 1]);
    } else {
      txt.push(<p>asd f sad fsa df sad f sad fsad f asd f asdf as df asd f asd fas df sad fsad f</p>);
    }
    txt.push(<br />)
  } return txt
}

export default Root
