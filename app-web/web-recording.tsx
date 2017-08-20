import React from 'react'
import { providerConnector } from '../app-common/recording'
import { renderCSS } from './fela'
import { Button, FontIcon, List, ListItemControl, Checkbox } from './react-md';

const provider: React.SFC<Recording.IProps> = props => {
  const childs = React.Children.only(props.children)
  const btn = <Button onClick={props.changeSize} floating secondary fixed fixedPosition={'bl'} className={renderCSS({ marginLeft: -15 })}><FontIcon iconClassName="fa fa-circle-o-notch" /></Button>
  switch (props.guiSize) {
    case Recording.TGuiSize.no: return childs
    case Recording.TGuiSize.icon: return <div>
      {btn}
      {childs}
    </div>
    case Recording.TGuiSize.small: return <div>
      {btn}
      <ContentSmall {...props} />
      <Stat {...props} />
      {childs}
    </div>
    case Recording.TGuiSize.large: return <div>
      {btn}
      <ContentLarge {...props} content={childs} />
      <ContentSmall {...props} />
      <Stat {...props} />
    </div>
    default: throw 'not implemented'
  }
}

const ContentSmall: React.SFC<Recording.IProps> = props => {
  return <div className={renderCSS({ position: 'fixed', left: 60, height: 58, bottom: 10 })}>
    <RecordBtn {...props} />
    <RecordSavedBtn {...props} />
    <PlayRecordingBtn {...props} />
    <PlayAllBtn {...props} />
  </div>
}

const Stat: React.SFC<Recording.IProps> = props => !props.playMsg ? null : <div className={renderCSS({ position: 'fixed', left: 10, height: 10, bottom: 10, fontSize: 12, color: 'gray' })}>{props.playMsg}</div>

const ContentLarge: React.SFC<Recording.IProps & { content: React.ReactElement<any> }> = props => {
  return <div>
    <div className={renderCSS({ position: 'fixed', width: 200, left: 0, top: 0, bottom: 80, borderWidth: 1, borderStyle: 'solid', borderColor: 'lightgray' })}>
      <div className={renderCSS({ margin: 5 })}>
        {props.playLists && props.playLists.length > 0 ? <Btn icon='exchange' title='INVERT' click={props.listInvert} /> : null}
        {props.playLists && props.playLists.find(l => l.checked) ? <Btn icon='remove' title='DELETE' click={props.listDelete} /> : null}
        <PlaySelectedBtn {...props} />
      </div>
      <List className="md-paper--1">
        {!props.playLists ? null : props.playLists.map((pl, idx) => <ListItemControl primaryAction={
          <Checkbox id={pl.id} name={pl.id} label={`${pl.name} (${pl.actions.length})`} checked={pl.checked} onChange={checked => props.listSelChange(idx, checked)} />
        }>
        </ListItemControl>)}
      </List>
    </div>
    <div className={renderCSS({ marginLeft: 200 })}>
      {props.content}
    </div>
  </div>
}

const Btn: React.SFC<{ icon: string; title: string; click: () => void }> = props => {
  return <Button mini primary className={renderCSS({ height: 40, padding: 5, minWidth: 0, display: 'inline-block', marginLeft: 5 })} onClick={props.click}>
    <FontIcon iconClassName={'fa fa-' + props.icon} className={renderCSS({ fontSize: 18 })} /><br />
    <span className={renderCSS({ fontSize: 10 })}>{props.title}</span>
  </Button>
}

const PlayAllBtn: React.SFC<Recording.IProps> = props => {
  if (props.playLists && props.playLists.length > 0 && props.mode == Recording.TModes.no) return <Btn icon='forward' title='PLAY ALL' click={() => props.playStart(allSelected(props.playLists.length)/*Recording.Consts.playAllPlaylist*/)} />
  if (props.mode == Recording.TModes.playing) return <Btn icon='close' title='CANCEL' click={props.playCancel} />
  return null
}
const allSelected = (len: number) => { const res = []; for (let i = 0; i < len; i++) res[i] = i; return res }

const PlaySelectedBtn: React.SFC<Recording.IProps> = props => {
  const selected = props.mode == Recording.TModes.no ? getSelected(props) : []
  if (selected.length > 0) return <Btn icon='forward' title='PLAY' click={() => props.playStart(selected)} />
  return null
}
const getSelected = (props: Recording.IProps) => { const res = []; if (props.playLists) for (let i = 0; i < props.playLists.length; i++) if (props.playLists[i].checked) res.push(i); return res }

const PlayRecordingBtn: React.SFC<Recording.IProps> = props => {
  if (props.recording && props.recording.length > 0 && props.mode == Recording.TModes.no) return <Btn icon='play' title='PLAY' click={() => props.playStart(null)} />
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

