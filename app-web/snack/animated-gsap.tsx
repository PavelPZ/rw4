//BEST: demo krivek, donwload apod.  https://greensock.com/get-started-js a common lightweight choice is TweenLite, CSSPlugin, and EasePack
import React from 'react'
import { doTween } from '../gui/lib'

const app1: React.SFC<any> = props => <div style={{ position: 'relative' }}>
  <div
    style={{ position: 'absolute', opacity: 0.3, top: 10, left: 10, width: 100, height: 100, backgroundColor: 'red' }}
    ref={el => TweenLite.to(el, 2, { delay: 2, opacity: 1, top: 100, left: 100, width: 200, height: 200, onComplete: () => { }, ease: Elastic.easeOut.config(1, 0.3) })}
  >
  </div>
</div>

const Root: React.SFC<any> = props => {
  let router: Router
  const getContent = () => {
    let content: JSX.Element
    const waitFor = new Promise<HTMLElement>(resolve => content = <Content onRef={root => resolve(root)} count={count} key={count++} />)
    return { content, waitFor } as IGetContent
  }
  let count = 1
  //https://web-design-weekly.com/2014/11/18/viewport-units-vw-vh-vmin-vmax/
  return <div style={{ height: '100vh', overflow: 'auto' }}>
    <div style={{ alignSelf: 'flex-start' }}>
      <button onClick={() => router.setContent(getContent())}>CLICK</button>
    </div>
    <Router ref={r => router = r} initContent={getContent()} />
  </div>
}

type IGetContent = { content: JSX.Element; waitFor: Promise<HTMLElement> }

class Router extends React.PureComponent<{ initContent: IGetContent }> {

  static tweenTime = 0.15
  static animProps = { opacity: 0.05 }
  //static animProps = { opacity: 0.5, marginTop: '0%' }
  //static animPropsNew = { opacity: 0.5, marginTop:'-100%' }

  state: { content: IGetContent; newContent?: IGetContent } = { content: this.props.initContent }
  cancel: { content: GUI.ITweenCancel, newContent: GUI.ITweenCancel } = { content: {}, newContent: {} }

  render() {
    return <div >
      {[this.state.content.content, this.state.newContent && this.state.newContent.content]}
    </div>
  }

  async setContent(content: IGetContent) {
    const { content: { cancel }, content: { cancel: newCancel } } = this.cancel
    if (cancel || newCancel) {
      if (cancel) cancel()
      if (newCancel) newCancel()
      this.setState({ content, newContent: null })
      return
    }
    //render both pages and wait for HTML Elements
    this.setState({ content: this.state.content, newContent: content })
    const divNew = await this.state.newContent.waitFor
    const oldDisplay = divNew.style.display
    divNew.style.display = 'none'
    const divContent = await this.state.content.waitFor
    //hide old and show new
    await doTween(divContent, Router.tweenTime, { ...Router.animProps, ease: Power0.easeIn, cancel: this.cancel.content, })
    this.setState({ content: content, newContent: null })
    divNew.style.display = oldDisplay
    await doTween(divNew, Router.tweenTime, { ...Router.animProps, ease: Power0.easeOut, cancel: this.cancel.newContent, tweenProc: TweenLite.from })
  }
}

class Content extends React.PureComponent<{ count: number, onRef: (root: HTMLDivElement) => void }> {
  render() {
    const count = this.props.count
    //style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 } as CSSProperties}
    //return <div key={count} ref={root => root && this.props.onRef(root)} style={{ ...pageStyle, paddingTop: (count % 3) * 100, backgroundColor: count % 2 ? 'red' : 'blue' } as CSSProperties}><h3>TITLE {count}: {renders++}</h3></div>
    return <div key={count} ref={root => root && this.props.onRef(root)} >
      <h3>TITLE {count}: {renders++}</h3>
      {contentText(count)}
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


const pageStyle = {
  height: '100%',
  //opacity: 1,
} as CSSProperties

//export default app1
export default Root
