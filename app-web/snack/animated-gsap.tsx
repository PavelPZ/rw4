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
  return <div style={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100vh' }}>
    <div style={{ alignSelf: 'flex-start' }}>
      <button onClick={() => router.setContent(getContent())}>CLICK</button>
    </div>
    <Router ref={r => router = r} initContent={getContent()} />
  </div>
}

type IGetContent = { content: JSX.Element; waitFor: Promise<HTMLElement> }

class Router extends React.PureComponent<{ initContent: IGetContent }> {

  static tweenTime = 0.125
  //static animProps = { opacity: 0.0, yPercent: '10%', xPercent: '10%', width: '80%', height: '80%' }
  static animProps = { opacity: 0.0, ease: Expo.easeOut }

  state: IGetContent = this.props.initContent
  cancel: GUI.ITweenCancel = { }

  render() { return <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>{this.state.content}</div> }

  async setContent(content: IGetContent) {
    if (this.cancel.cancel) {
      this.cancel.cancel()
      this.setState(content)
      return
    }
    let root = await this.state.waitFor
    await doTween(root, Router.tweenTime, { ...Router.animProps, cancel: this.cancel })
    this.setState(content)
    root = await this.state.waitFor
    await doTween(root, Router.tweenTime, { ...Router.animProps, cancel: this.cancel, tweenProc: TweenLite.from})
  }
}


class Content extends React.PureComponent<{ count: number, onRef: (root: HTMLDivElement) => void }> {
  render() {
    const count = this.props.count
    //return <div key={count} ref={root => root && this.props.onRef(root)} style={{ ...pageStyle, paddingTop: (count % 3) * 100, backgroundColor: count % 2 ? 'red' : 'blue' } as CSSProperties}><h3>TITLE {count}: {renders++}</h3></div>
    return <div key={count} ref={root => root && this.props.onRef(root)} style={{ ...pageStyle, margin:30 } as CSSProperties}>
      <h3>TITLE {count}: {renders++}</h3>
      {contentText(count)}
    </div>
  }
}
let renders = 1
const contentText = (count) => {
  const txt = []; for (let i = 0; i < 80; i++) {
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
