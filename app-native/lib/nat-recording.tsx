import React from 'react'
import { providerConnector, blockGuiConnector } from '../../app-common/lib/recording'

const provider: React.SFC<Recording.IProps> = props => {
  const childs = React.Children.only(props.children)
  switch (props.guiSize) {
    case Recording.TGuiSize.no: return childs
    case Recording.TGuiSize.icon: return childs
    default: throw 'not implemented'
  }
}

export const Provider = providerConnector(provider)