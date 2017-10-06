import React from 'react'

const fixedStyle: CSSProperties = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }

class DrawerLayout extends React.PureComponent<{ windowSize: Media.TWindowSize, changeWindowSize: (windowSize: Media.TWindowSize) => void }> {
}


export default class App extends React.PureComponent {
  state = { windowSize: Media.TWindowSize.mobile }
  render() {
    return <DrawerLayout key={count++} windowSize={this.state.windowSize} changeWindowSize={windowSize => this.setState({ windowSize })} />
  }
}
