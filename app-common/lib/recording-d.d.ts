declare namespace Recording {

  namespace RestAPI {
    const enum Consts { module = 'recording',  SAVE = 'rec/SAVE', LOAD = 'rec/LOAD' }
  }

  const enum Consts {
    //INIT = 'rec/INIT_SYSTEM',
    RECORD_START = 'rec/RECORD_START_SYSTEM', RECORD = 'rec/RECORD_SYSTEM', RECORD_END = 'rec/RECORD_END_SYSTEM', RECORD_SAVE_START = 'rec/RECORD_SAVE_START_SYSTEM', RECORD_SAVE_END = 'rec/RECORD_SAVE_END_SYSTEM',
    PLAY_START = 'rec/PLAY_START_SYSTEM', PLAY_INIT_STATE = 'rec/PLAY_INIT_STATE_SYSTEM', PLAY_CONTINUE = 'rec/PLAY_CONTINUE_SYSTEM', PLAY_NEXT = 'rec/PLAY_NEXT_SYSTEM', PLAY_CANCEL = 'rec/PLAY_CANCEL_SYSTEM', PLAY_END = 'rec/PLAY_END_SYSTEM',
    CHANGE_SIZE = 'rec/CHANGE_SIZE_SYSTEM',
    LIST_SEL_CHANGE = 'rec/LIST_SEL_CHANGE_SYSTEM', LIST_DELETE = 'rec/LIST_DELETE_SYSTEM', LIST_INVERT = 'rec/LIST_INVERT_SYSTEM',
    playActionDelay = 300
  }

  const enum TGuiSize { no, icon, small, large }
  const enum TModes { no, recording, playing }

  interface IConfig {
    ignore?: boolean
    guiSize?: TGuiSize
    recordingJSON?: Recording.IPlayList[]
  }

  interface IState {
    mode?: TModes
    guiSize?: TGuiSize
    playLists?: IPlayList[] //all saved playlists
    recording?: App.Action[] //recorded playlist
    startState?: TGlobalState //start status before first recording action
    //for playing
    idx?: number
    listIdx?: number
    playMsg?: string
  }

  interface IPlayList {
    id: number
    name: string
    checked: boolean
    active: boolean
    startState: TGlobalState
    actions: App.Action[]
  }

  interface Action {
    type: Consts.RECORD_START | Consts.RECORD_END | Consts.PLAY_CONTINUE | Consts.PLAY_CANCEL | Consts.PLAY_END | Consts.CHANGE_SIZE | Consts.LIST_DELETE | Consts.LIST_INVERT
  }

  interface playSelected { playSelected: number[] } //indexes to IState.playLists  //Consts.playLastRecording: lastRecording, Consts.playAllPlaylist: all playlist, >=0: playlist[idx] 
  interface PlayStartAction extends playSelected {
    type: Consts.PLAY_START
  }

  interface PlayInitStateAction { //extends playSelected {
    type: Consts.PLAY_INIT_STATE
    startState: App.IGlobalState
  }

  interface RecordSaveAction {
    type: Consts.RECORD_SAVE_START
    name: string
  }

  interface RecordAction {
    type: Consts.RECORD
    action: App.Action
  }

  //interface InitAction {
  //  type: Consts.INIT
  //  playLists: IPlayList[]
  //}

  interface PlayNextAction {
    type: Consts.PLAY_NEXT
    idx: number
    listIdx: number
    playMsg: string
  }

  interface ListSelChange {
    type: Consts.LIST_SEL_CHANGE
    idx: number
    checked: boolean
  }


  type TActions = Action | PlayStartAction | RecordSaveAction | /*InitAction |*/ RecordAction | PlayNextAction | PlayInitStateAction | ListSelChange

  //**** GUI
  interface IStateProps extends IState { }
  interface IDispatchProps {
    changeSize: () => void
    recordStart: () => void
    recordEnd: () => void
    recordSave: () => void
    playStart: (playSelected: number[]) => void
    listSelChange: (idx: number, checked: boolean) => void
    playCancel: () => void
    listInvert: () => void
    listDelete: () => void
    playSelected: () => void
  }

  type IProps = IStateProps & IDispatchProps
}

interface IPlatforms {
  recordingPlatform?: Recording.IConfig
}

interface IState {
  recording?: Recording.IState
}
type TGlobalState = IState

//************************* BLOCK GUI
declare namespace BlockGui {
  const enum Consts {
    START = 'blockgui/START_SYSTEM', END = 'blockgui/END_SYSTEM', SET_STATE = 'blockgui/SET_STATE_SYSTEM',
  }

  const enum State { no, show, showIcon }

  interface IState {
    state: State
  }

  type IProps = IState

  interface Action {
    type: Consts.START | Consts.END
  }

  interface SetStateAction {
    type: Consts.SET_STATE
    state: State
  }

}

interface IState {
  blockGui?: BlockGui.IState
}

