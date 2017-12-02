import React from 'react'
import { providerConnector, blockGuiConnector } from '../../app-common/lib/recording'
import { ruleToClassNames as renderCSS } from 'xmui/web/styles/fela'
import { Button, List, ListItemControl, Checkbox, Portal } from '../gui/react-md';
import { Icon } from '../../app-common/gui/gui'

const provider: React.SFC<Recording.IProps> = props => {
  const childs = React.Children.only(props.children)
  const btn = <Button onClick={props.changeSize} floating secondary fixed fixedPosition={'bl'} className={renderCSS({ marginLeft: -15, zIndex: 21 })}><Icon iconName={GUI.IonicIcons.analytics} /></Button>
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
  return <div className={renderCSS({ position: 'fixed', left: 60, height: 58, bottom: 10, zIndex: 21 })}>
    <RecordBtn {...props} />
    <RecordSavedBtn {...props} />
    <PlayRecordingBtn {...props} />
    <PlayAllBtn {...props} />
  </div>
}

const Stat: React.SFC<Recording.IProps> = props => !props.playMsg ? null : <div className={renderCSS({ position: 'fixed', left: 10, height: 10, bottom: 10, fontSize: 12, color: 'gray' })}>{props.playMsg}</div>

const ContentLarge: React.SFC<Recording.IProps & { content: React.ReactElement<any> }> = props => {
  return <div className={renderCSS({ position: 'relative', })}>
    <div className={renderCSS({ position: 'absolute', width: 200, left: 0, top: 0, bottom: 0, borderWidth: 1, borderStyle: 'solid', borderColor: 'lightgray' })}>
      <div className={renderCSS({ margin: 5 })}>
        {props.playLists && props.playLists.length > 0 ? <Btn icon={GUI.IonicIcons.analytics} title='INVERT' click={props.listInvert} /> : null}
        {props.playLists && props.playLists.find(l => l.checked) ? <Btn icon={GUI.IonicIcons.remove} title='DELETE' click={props.listDelete} /> : null}
        <PlaySelectedBtn {...props} />
      </div>
      <List className="md-paper--1">
        {!props.playLists ? null : props.playLists.map((pl, idx) => <ListItemControl
          key={idx}
          primaryAction={<Checkbox id={pl.id} name={pl.id} label={`${pl.name} (${pl.actions.length})`} checked={pl.checked} onChange={checked => props.listSelChange(idx, checked)} />} />
        )}
      </List>
    </div>
    <div className={renderCSS({ marginLeft: 200 })}>
      {props.content}
    </div>
  </div>
}

const Btn: React.SFC<{ icon: GUI.IonicIcons; title: string; click: () => void }> = props => {
  return <Button mini primary className={renderCSS({ height: 40, padding: 5, minWidth: 0, display: 'inline-block', marginLeft: 5 })} onClick={props.click}>
    <Icon iconName={props.icon} style={{ fontSize: 18 }} /><br />
    <span className={renderCSS({ fontSize: 10 })}>{props.title}</span>
  </Button>
}

const PlayAllBtn: React.SFC<Recording.IProps> = props => {
  if (props.playLists && props.playLists.length > 0 && props.mode == Recording.TModes.no) return <Btn icon={GUI.IonicIcons.fastforward} title='PLAY ALL' click={() => props.playStart(allSelected(props.playLists.length)/*Recording.Consts.playAllPlaylist*/)} />
  if (props.mode == Recording.TModes.playing) return <Btn icon={GUI.IonicIcons.close} title= 'CANCEL' click= { props.playCancel } />
  return null
}
const allSelected = (len: number) => { const res = []; for (let i = 0; i < len; i++) res[i] = i; return res }

const PlaySelectedBtn: React.SFC<Recording.IProps> = props => {
  const selected = props.mode == Recording.TModes.no ? getSelected(props) : []
  if (selected.length > 0) return <Btn icon={GUI.IonicIcons.fastforward} title='PLAY' click={() => props.playStart(selected)} />
  return null
}
const getSelected = (props: Recording.IProps) => { const res = []; if (props.playLists) for (let i = 0; i < props.playLists.length; i++) if (props.playLists[i].checked) res.push(i); return res }

const PlayRecordingBtn: React.SFC<Recording.IProps> = props => {
  if (props.recording && props.recording.length > 0 && props.mode == Recording.TModes.no) return <Btn icon={GUI.IonicIcons.play} title='PLAY' click={() => props.playStart(null)} />
  return null
}

const RecordBtn: React.SFC<Recording.IProps> = props => {
  if (props.mode == Recording.TModes.no) return <Btn icon={GUI.IonicIcons.recording} title='RECORD' click={() => props.recordStart()} />
  if (props.mode == Recording.TModes.recording) return <Btn icon={GUI.IonicIcons.stopwatch} title='STOP' click={props.recordEnd} />
  return null
}

const RecordSavedBtn: React.SFC<Recording.IProps> = props => {
  if (props.recording && props.recording.length > 0 && props.mode == Recording.TModes.no) return <Btn icon={GUI.IonicIcons.star} title='SAVE' key='record' click={props.recordSave} />
  return null
}

export const Provider = providerConnector(provider)

//******************** BLOCK GUI

const blockGui: React.SFC<BlockGui.IProps> = props => props.state == BlockGui.State.no ? null : <Portal visible={props.state != BlockGui.State.no} className={renderCSS({ position: 'fixed', bottom: 0, right: 0, top: 0, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99, cursor: 'wait' })} >
  {props.state == BlockGui.State.showIcon ? <Icon iconName={GUI.IonicIcons.alarm} /> : <span />}
</Portal>

export const BlockGuiComp = blockGuiConnector(blockGui)
