//BEST: demo krivek, donwload apod.  https://greensock.com/get-started-js a common lightweight choice is TweenLite, CSSPlugin, and EasePack
import React from 'react'

const app1: React.SFC<any> = props => <div style={{ position: 'relative' }}>
  <div
    style={{ position: 'absolute', opacity: 0.3, top: 10, left: 10, width: 100, height: 100, backgroundColor: 'red' }}
    ref={el => TweenLite.to(el, 2, { delay: 2, opacity: 1, top: 100, left: 100, width: 200, height: 200, onComplete: () => { }, ease: Elastic.easeOut.config(1, 0.3) })}
  >
  </div>
</div>

const Root: React.SFC<any> = props => {
  let router: Router
  const getNextContent = () => {
    let content: JSX.Element
    const waitFor = new Promise<HTMLElement>(resolve => content = <Content onRef={root => resolve(root)} count={count} key={count++} />)
    return { content, waitFor } as IGetContent
  }
  let count = 1
  return <div style={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100vh' }}>
    <div style={{ alignSelf: 'flex-start' }}>
      <button onClick={() => router.setContent(getNextContent())}>CLICK</button>
    </div>
    <Router ref={r => router = r} getInitContent={getNextContent} />
  </div>
}

type IProps = { title: string; margin: number }

type IGetContent = { content: JSX.Element; waitFor: Promise<HTMLElement> }
type ITweenCancel = { cancel?: () => void }

class Router extends React.PureComponent<{ getInitContent }> {
  state: IGetContent = this.props.getInitContent()
  cancel: ITweenCancel = { }

  render() { return <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>{this.state.content}</div> }

  async setContent(cont: IGetContent) {
    if (this.cancel.cancel) {
      this.cancel.cancel()
      this.setState(cont)
      return
    }
    let root = await this.state.waitFor
    await doTween(root, tweenTime, { opacity: 0.5 }, this.cancel)
    this.setState(cont)
    root = await this.state.waitFor
    await doTween(root, tweenTime, { opacity: 0.5 }, this.cancel, TweenLite.from)
  }
}
const tweenTime = 1

const doTween = (el: HTMLElement, secs: number, pars: {}, cancel: ITweenCancel, fnc?) => {
  return new Promise<void>((resolve, reject) => {
    let tween = (fnc || TweenLite.to)(el, secs, { ...pars, onComplete: () => { delete cancel.cancel; resolve() } })
    cancel.cancel = () => {
      tween.progress(1, true)
      delete cancel.cancel
      reject()
    }
  })
}

class Content extends React.PureComponent<{ count: number, onRef: (root: HTMLDivElement) => void }> {
  render() {
    const count = this.props.count
    return <div key={count} ref={root => root && this.props.onRef(root)} style={{ ...pageStyle, paddingTop: (count % 3) * 100, backgroundColor: count % 2 ? 'red' : 'blue' } as CSSProperties}><h3>TITLE {count}: {renders++}</h3></div>
  }
}
let renders = 1

const pageStyle = {
  height: '100%',
  //opacity: 1,
} as CSSProperties

//export default app1
export default Root
