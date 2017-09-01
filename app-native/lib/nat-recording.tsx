import React from 'react'
import { providerConnector, blockGuiConnector } from '../../app-common/lib/recording'
import { View, Text } from 'react-native'

const Btn: React.SFC<{ title: string; click: () => void }> = props => <Text onPress={props.click}>
  {props.title}
</Text>

const PlayAllBtn: React.SFC<Recording.IProps> = props => {
  if (props.playLists && props.playLists.length > 0 && props.mode == Recording.TModes.no) return <Btn title='PLAY ALL' click={() => props.playStart(allSelected(props.playLists.length))} />
  if (props.mode == Recording.TModes.playing) return <Btn title='CANCEL' click={props.playCancel} />
  return null
}
const allSelected = (len: number) => { const res = []; for (let i = 0; i < len; i++) res[i] = i; return res }

const provider: React.SFC<Recording.IProps> = props => {
  const childs = React.Children.only(props.children)
  switch (props.guiSize) {
    case Recording.TGuiSize.no: return childs
    case Recording.TGuiSize.icon:
      return <View style={{ flex: 1, marginTop:20 }}>
        <PlayAllBtn {...props}/>
        {childs}
      </View>
    default: throw 'not implemented'
  }
}

export const Provider = providerConnector(provider)