import React from 'react'

import { desktop, tablet, mobile } from './templates'

interface IState {
  windowSize: Media.TWindowSize
  title: string
  mobileLand?: boolean
  leftExpanded?: boolean
  rightExpanded?: boolean
}

const states: IState[] = [
  { title: 'Des', windowSize: Media.TWindowSize.desktop },
  { title: 'Tab', windowSize: Media.TWindowSize.tablet, leftExpanded: false, rightExpanded: false },
  { title: 'Tab Left', windowSize: Media.TWindowSize.tablet, leftExpanded: true, rightExpanded: false },
  { title: 'Tab Right', windowSize: Media.TWindowSize.tablet, leftExpanded: false, rightExpanded: true },
  { title: 'Tab Left Right', windowSize: Media.TWindowSize.tablet, leftExpanded: true, rightExpanded: true },
  { title: 'Mob', windowSize: Media.TWindowSize.mobile },
]


export default class app extends React.PureComponent<any, { idx: number }> {
  state = { idx: 2 }
  render() {
    const { state: { idx } } = this
    const { leftExpanded, mobileLand, rightExpanded, windowSize } = states[idx]
    const menu = states.map((st, i) => <p key={i}><a href='#' onClick={ev => { this.setState({ idx: i }); ev.preventDefault(); return false }}>{st.title}</a></p>)
    switch (windowSize) {
      case Media.TWindowSize.desktop: return desktop({ content: { content: [...menu, loremIpsum()] }, drawerContent: { content: loremIpsum() } })
      case Media.TWindowSize.tablet: return tablet({ leftExpanded, rightExpanded, content: { content: [...menu, loremIpsum(200)] }, drawerContent: { content: [...menu, loremIpsum(100)] } })
      case Media.TWindowSize.mobile: return mobile({ content: { content: [...menu, loremIpsum()] }, drawerContent: { content: loremIpsum() } })
    }
  }
}

const loremIpsum = (num = 50) => 'START START START ' + new Array(num).join('asd fa df asdf adsf') + ' END END END'