declare namespace Recording {

  const enum Consts {
    INIT = 'rec/INIT_SYSTEM',
    RECORD_START = 'rec/RECORD_START_SYSTEM', RECORD = 'rec/RECORD_SYSTEM', RECORD_END = 'rec/RECORD_END_SYSTEM', RECORD_SAVE = 'rec/RECORD_SAVE_SYSTEM',
    PLAY_START = 'rec/PLAY_START_SYSTEM', PLAY_INIT_STATE = 'rec/PLAY_INIT_STATE_SYSTEM', PLAY_CONTINUE = 'rec/PLAY_CONTINUE_SYSTEM', PLAY_NEXT = 'rec/PLAY_NEXT_SYSTEM', PLAY_CANCEL = 'rec/PLAY_CANCEL_SYSTEM', PLAY_END = 'rec/PLAY_END_SYSTEM',
    CHANGE_SIZE = 'rec/CHANGE_SIZE_SYSTEM',
    playLastRecording = -1, playAllPlaylist = -2,
    playActionDelay = 500
  }

  const enum TGuiSize { no, icon, small, large }
  const enum TModes { no, recording, recorded, playing }

  interface IState {
    mode: TModes
    guiSize: TGuiSize
    playLists?: IPlayList[] //all saved playlists
    recording?: App.Action[] //recorded playlist
    startState?: TGlobalState //start status before first recording action
    //for playing
    recordingId?:number
    playLastRecording?: boolean //<playing action> = playLastRecording ? recording[idx] : playLists[listIdx][idx]
    idx?: number
    listIdx?: number
  }

  interface IPlayList {
    name: string
    startState: TGlobalState
    actions: App.Action[]
  }

  interface Action {
    type: Consts.RECORD_START | Consts.RECORD_END | Consts.PLAY_CONTINUE | Consts.PLAY_CANCEL | Consts.PLAY_END | Consts.CHANGE_SIZE
  }

  interface PlayStartAction {
    type: Consts.PLAY_START
    recordingId: number //Consts.playLastRecording: lastRecording, Consts.playAllPlaylist: all playlist, >=0: playlist[idx] 
  }

  interface PlayInitStateAction {
    type: Consts.PLAY_INIT_STATE
    recordingId: number
    startState
  }

  interface RecordSaveAction {
    type: Consts.RECORD_SAVE
    name: string
  }

  interface RecordAction {
    type: Consts.RECORD
    action: App.Action
  }

  interface InitAction {
    type: Consts.INIT
    playLists: IPlayList[]
  }

  interface PlayNextAction {
    type: Consts.PLAY_NEXT
    idx: number
    listIdx: number
  }

  type TActions = Action | PlayStartAction | RecordSaveAction | InitAction | RecordAction | PlayNextAction | PlayInitStateAction

  //**** GUI
  interface IStateProps extends IState {
  }
  interface IDispatchProps {
    changeSize: () => void
    recordStart: () => void
    recordEnd: () => void
    recordSave: () => void
    playStart: (recordingId: number) => void
    playCancel: () => void
  }
  type IProps = IStateProps & IDispatchProps

}

interface IState {
  recording?: Recording.IState
}
type TGlobalState = IState