import React from 'react'
import { providerConnector } from '../app-common/recording'
import { renderCSS } from './fela'
import { Button, FontIcon } from './react-md';

const provider: React.SFC<Recording.IProps> = props => {
  const childs = React.Children.only(props.children)
  const btn = <Button onClick={props.changeSize} floating secondary fixed fixedPosition={'bl'}><FontIcon iconClassName="fa fa-circle-o-notch" /></Button>
  switch (props.guiSize) {
    case Recording.TGuiSize.no: return childs
    case Recording.TGuiSize.icon: return <div>
      {btn}
      {childs}
    </div>
    case Recording.TGuiSize.small: return <div>
      {btn}
      <ContentSmall {...props} />
      {childs}
    </div>
    case Recording.TGuiSize.large: return <div>
      {btn}
      <ContentLarge {...props} content={childs} />
    </div>
    default: throw 'not implemented'
  }
}

const ContentSmall: React.SFC<Recording.IProps> = props => {
  return <div className={renderCSS({ position: 'fixed', left: 80, height: 58, bottom: 0 })}>
    XXX
  </div>
}

const ContentLarge: React.SFC<Recording.IProps & { content: React.ReactElement<any> }> = props => {
  return <div>
    <div className={renderCSS({ position: 'fixed', width: 200, left:0, top:0, bottom:0, borderWidth: 1, borderStyle: 'solid', borderColor: 'lightgray' })}>
      XXX
    </div>
    <div className={renderCSS({ marginLeft: 200 })}>
      {props.content}
    </div>
  </div>
}

export const Provider = providerConnector(provider)

