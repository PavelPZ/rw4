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
      <ContentSmall {...props} />
    </div>
    default: throw 'not implemented'
  }
}

const ContentSmall: React.SFC<Recording.IProps> = props => {
  return <div className={renderCSS({ position: 'fixed', left: 80, height: 58, bottom: 10 })}>
    <RecordBtn {...props} />
    <RecordSavedBtn {...props} />
    <PlayRecordingBtn {...props} />
    <PlayAllBtn {...props} />
  </div>
}

const ContentLarge: React.SFC<Recording.IProps & { content: React.ReactElement<any> }> = props => {
  return <div>
    <div className={renderCSS({ position: 'fixed', width: 200, left: 0, top: 0, bottom: 0, borderWidth: 1, borderStyle: 'solid', borderColor: 'lightgray' })}>
      XXX
    </div>
    <div className={renderCSS({ marginLeft: 200 })}>
      {props.content}
    </div>
  </div>
}

const Btn: React.SFC<{ icon: string; title: string; click: () => void }> = props => {
  return <Button primary raised mini className={renderCSS({ height: 40, padding: 5, minWidth: 0, display: 'inline-block' })} onClick={props.click}>
    <FontIcon iconClassName={'fa fa-' + props.icon} className={renderCSS({ fontSize:18 })} /><br />
    <span className={renderCSS({ fontSize: 10 })}>{props.title}</span>
  </Button>
}

const PlayAllBtn: React.SFC<Recording.IProps> = props => {
  if (props.playLists && props.playLists.length > 0 && props.mode == Recording.TModes.no) return <Btn icon='forward' title='PLAY ALL' click={() => props.playStart(Recording.Consts.playAllPlaylist)} />
  if (props.playLists && props.playLists.length > 0 && props.mode == Recording.TModes.playing && props.recordingId == Recording.Consts.playAllPlaylist) return <Btn icon='close' title='CANCEL' click={props.playCancel} />
  return null
}

const PlayRecordingBtn: React.SFC<Recording.IProps> = props => {
  if (props.recording && props.recording.length > 0 && props.mode == Recording.TModes.no) return <Btn icon='play' title='PLAY' click={() => props.playStart(Recording.Consts.playLastRecording)} />
  if (props.recording && props.recording.length > 0 && props.mode == Recording.TModes.playing && props.recordingId == Recording.Consts.playLastRecording) return <Btn icon='close' title='CANCEL' click={props.playCancel} />
  return null
}

const RecordBtn: React.SFC<Recording.IProps> = props => {
  if (props.mode == Recording.TModes.no) return <Btn icon='circle' title='RECORD' click={() => props.recordStart()} />
  if (props.mode == Recording.TModes.recording) return <Btn icon='stop' title='STOP' click={props.recordEnd} />
  return null
}

const RecordSavedBtn: React.SFC<Recording.IProps> = props => {
  if (props.recording && props.recording.length > 0 && props.mode == Recording.TModes.no) return <Btn icon='save' title='SAVE' key='record' click={props.recordSave} />
  return null
}

export const Provider = providerConnector(provider)

