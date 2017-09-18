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
  let router
  return <div style={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100vh' }}>
    <div style={{ alignSelf: 'flex-start' }}>
      <button onClick={() => router.click()}>CLICK</button>
    </div>
    <Router ref={r => router = r} />
  </div>
}

type IProps = { title: string; margin: number }

class Router extends React.PureComponent {
  state = {
    count: count++
  }
  root: HTMLDivElement
  firstTween: gsap.TweenLite
  secondTween: gsap.TweenLite
  onRef: (root: HTMLDivElement) => void
  doOnRef(root: HTMLDivElement) {
    this.root = root
    if (this.onRef) this.onRef(root)
  }
  render() {
    return <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
      <Content onRef={root => this.doOnRef(root)} key={this.state.count} count={this.state.count} />
    </div>
  }
  click() {
    this.onRef = null
    if (this.firstTween) {
      this.firstTween.progress(1, true); this.firstTween = null
      this.setState({ count: count++ })
      this.setState({ count: count++ })
      return 
    } else if (this.secondTween) {
      this.secondTween.progress(1, true); this.secondTween = null
      this.setState({ count: count++ })
      return 
    }
    this.firstTween = TweenLite.to(this.root, tweenTime, {
      opacity: 0.5, onComplete: async () => {
        this.firstTween = null
        this.onRef = root => {
          this.secondTween = TweenLite.from(root, tweenTime, {
            opacity: 0.5, onComplete: () => {
              this.secondTween = null
            }
          })
        }
        this.setState({ count: count++ })
      }
    })
  }
}
let count = 1
const tweenTime = 1

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
