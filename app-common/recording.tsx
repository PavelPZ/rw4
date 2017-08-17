import { Middleware, MiddlewareAPI, Action, Dispatch } from 'redux'
import { connect } from 'react-redux'
import invariant from 'invariant'
import { put, take } from 'redux-saga/effects'

export const middleware: Middleware = (middlAPI: MiddlewareAPI<IState>)  => next => (act) => { //inspirace v D:\rw\rw\rw-redux\async.ts

  next(act)

  const type: string = act.type; const asyncStart = '_START'; const asyncEnd = '_END'; const system = '_SYSTEM'

  if (type.endsWith(system)) return act

  const state = middlAPI.getState().recording

  if (type.endsWith(asyncStart)) {
    invariant(!actAsyncAction, `asyncMiddleware: !${actAsyncAction}`)
    actAsyncAction = type.substr(0, type.length - asyncStart.length)
    record(state, middlAPI.dispatch, act)
    blockGUI(middlAPI.dispatch, true)
  } else if (type.endsWith(asyncEnd)) {
    invariant(actAsyncAction === type.substr(0, type.length - asyncEnd.length), `asyncMiddleware: ${actAsyncAction} != ${type}`)
    blockGUI(middlAPI.dispatch, false)
    actAsyncAction = null
    playContinue(state, middlAPI.dispatch)
  } else {
    if (!actAsyncAction) {
      record(state, middlAPI.dispatch, act)
      playContinue(state, middlAPI.dispatch)
    }
  }

  return act
}

let actAsyncAction: string

const record = (state: Recording.IState, dispatch: Dispatch<any>, action: Action) => state.mode == Recording.TModes.recording && dispatch({ type: Recording.Consts.RECORD, action } as Recording.RecordAction)
const playContinue = (state: Recording.IState, dispatch: Dispatch<any>) => state.mode == Recording.TModes.playing && dispatch({ type: Recording.Consts.PLAY_CONTINUE } as Recording.Action)
const blockGUI = (dispatch: Dispatch<any>, isStart: boolean) => { }
const loadPlayList = () => Promise.resolve(debugPlayList)
const savePlayList = (pl: Recording.IPlayList[]) => { debugPlayList = pl; return Promise.resolve() }

let debugPlayList: Recording.IPlayList[] = []

export function* saga() {
  let initialized = false
  while (true) {
    const act: Recording.TActions = yield take([Recording.Consts.RECORD_START, Recording.Consts.PLAY_START])
    if (!initialized) {
      initialized = true
      const playLists: Recording.IPlayList[] = yield loadPlayList()
      yield put({ type: Recording.Consts.INIT, playLists } as Recording.InitAction)
    }
    switch (act.type) {
      case Recording.Consts.RECORD_START:
        continue

      case Recording.Consts.PLAY_START:
        const recordingId = act.recordingId
        let state = window.lmGlobal.store.getState().recording
        const startState = recordingId ? state.startState : state.playLists[0].startState
        yield put({ type: Recording.Consts.PLAY_INIT_STATE, recordingId: act.recordingId, startState } as Recording.PlayInitStateAction)
        while (true) {
          let playAction: App.Action
          state = window.lmGlobal.store.getState().recording
          if (recordingId == Recording.Consts.playLastRecording) {
            const rec = state.recording
            if (state.idx >= rec.length) {
              yield put({ type: Recording.Consts.PLAY_END } as Recording.Action)
            } else {
              playAction = rec[state.idx]
              yield put({ type: Recording.Consts.PLAY_NEXT, idx: state.idx + 1, listIdx: 0 } as Recording.PlayNextAction)
            }
          } else if (recordingId == Recording.Consts.playAllPlaylist) {
            const playList = state.playLists[state.listIdx]
            if (state.idx >= playList.actions.length) {
              if (state.listIdx >= state.playLists.length) {
                yield put({ type: Recording.Consts.PLAY_END } as Recording.Action)
              } else {
                playAction = state.playLists[state.listIdx + 1][0]
                yield put({ type: Recording.Consts.PLAY_NEXT, idx: 0, listIdx: state.listIdx + 1 } as Recording.PlayNextAction)
              }
            } else {
              playAction = state.playLists[state.listIdx][state.idx]
              yield put({ type: Recording.Consts.PLAY_NEXT, idx: state.idx + 1, listIdx: state.listIdx } as Recording.PlayNextAction)
            }
          } else {
            const rec = state.playLists[recordingId].actions
            if (state.idx >= rec.length) {
              yield put({ type: Recording.Consts.PLAY_END } as Recording.Action)
            } else {
              playAction = rec[state.idx]
              yield put({ type: Recording.Consts.PLAY_NEXT, idx: state.idx + 1, listIdx: recordingId } as Recording.PlayNextAction)
            }
          }
          yield put(playAction)
          const nextAct: Recording.TActions = yield take([Recording.Consts.PLAY_CONTINUE, Recording.Consts.PLAY_CANCEL])
          if (nextAct.type == Recording.Consts.PLAY_CONTINUE) continue
          break
        }
    }

  }
}

export const globalReducer: App.IReducer<IState> = (state, action: Recording.PlayInitStateAction) => {
  switch (action.type) {
    case Recording.Consts.PLAY_INIT_STATE:
      const { recording } = state
      const newRecording = { ...recording, mode: Recording.TModes.playing, idx: 0, listIdx: 0, recordingId: action.recordingId }
      return { ...action.startState as IState, recording: newRecording }
    default: return state
  }
}

export const reducer: App.IReducer<Recording.IState> = (state, action: Recording.TActions) => {
  if (!state) return { mode: Recording.TModes.no, guiSize: Recording.TGuiSize.large }
  switch (action.type) {
    case Recording.Consts.INIT:
      return { ...state, playLists: action.playLists }
    case Recording.Consts.RECORD_START:
      const { recording, ...startState } = window.lmGlobal.store.getState()
      return { ...state, mode: Recording.TModes.recording, recording: [], startState: JSON.parse(JSON.stringify(startState)) }
    case Recording.Consts.RECORD:
      return { ...state, recording: [...state.recording, action.action] }
    case Recording.Consts.RECORD_END:
      return { ...state, mode: Recording.TModes.recorded }
    case Recording.Consts.RECORD_SAVE:
      const playLists = [...state.playLists, { name: action.name, actions: state.recording, startState: state.startState }]
      savePlayList(playLists)
      return { ...state, mode: Recording.TModes.no, recording: null, startState: null, playLists }
    case Recording.Consts.PLAY_NEXT:
      return { ...state, idx: action.idx, listIdx: action.listIdx }
    case Recording.Consts.PLAY_END:
      return { ...state, mode: Recording.TModes.no }
    case Recording.Consts.PLAY_CANCEL:
      return { ...state, mode: Recording.TModes.no }
    case Recording.Consts.CHANGE_SIZE:
      return { ...state, guiSize: state.guiSize == Recording.TGuiSize.large ? Recording.TGuiSize.icon : state.guiSize + 1 }
    default: return state
  }
}

export const providerConnector = connect<Recording.IStateProps, Recording.IDispatchProps, {}>(
  (state: IState) => state.recording as Recording.IStateProps,
  (dispatch) => ({
    recordStart: () => dispatch({ type: Recording.Consts.RECORD_START } as Recording.Action),
    recordEnd: () => dispatch({ type: Recording.Consts.RECORD_END } as Recording.Action),
    recordSave: () => dispatch({ type: Recording.Consts.RECORD_SAVE, name: new Date().getTime().toString() } as Recording.RecordSaveAction),
    playStart: recordingId => dispatch({ type: Recording.Consts.PLAY_START, recordingId } as Recording.PlayStartAction),
    playCancel: () => dispatch({ type: Recording.Consts.PLAY_CANCEL } as Recording.Action),
    changeSize: () => dispatch({ type: Recording.Consts.CHANGE_SIZE } as Recording.Action),
  } as Recording.IDispatchProps)
)
