import React from 'react'
import { Content as NbContent } from 'native-base'

export const Content: React.SFC<ReactNative.ViewProperties> = props => {
  const { style, ...rest } = props
  return <NbContent contentContainerStyle={style as ReactNative.ViewStyle} {...rest}/>
}



