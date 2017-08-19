import { Middleware, MiddlewareAPI, Action, Dispatch } from 'redux'
import { connect } from 'react-redux'
import invariant from 'invariant'
import { put, take } from 'redux-saga/effects'
import { delay } from 'redux-saga'

export const middleware: Middleware = (middlAPI: MiddlewareAPI<IState>) => next => (act) => { //inspirace v D:\rw\rw\rw-redux\async.ts

  next(act)

  const type: string = act.type; const asyncStart = '_START'; const asyncEnd = '_END'; const system = '_SYSTEM'

  if (type.endsWith(system)) return act

  if (type.endsWith(asyncStart)) {
    const state = middlAPI.getState().recording
    invariant(!actAsyncAction, `asyncMiddleware: !${actAsyncAction}`)
    actAsyncAction = type.substr(0, type.length - asyncStart.length)
    record(state, middlAPI.dispatch, act)
    blockGUI(middlAPI.dispatch, true)
  } else if (type.endsWith(asyncEnd)) {
    const state = middlAPI.getState().recording
    invariant(actAsyncAction === type.substr(0, type.length - asyncEnd.length), `asyncMiddleware: ${actAsyncAction} != ${type}`)
    blockGUI(middlAPI.dispatch, false)
    actAsyncAction = null
    playContinue(state, middlAPI.dispatch)
  } else {
    if (!actAsyncAction) {
      const state = middlAPI.getState().recording
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

export function* sagaSave() {
  while (true) {
    yield take(Recording.Consts.RECORD_SAVE_START)
  }
}

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
        const setPlayInitState = function* (startState: IState) {
          yield delay(Recording.Consts.playActionDelay)
          yield put({ type: Recording.Consts.PLAY_INIT_STATE, recordingId: act.recordingId, startState } as Recording.PlayInitStateAction)
          return window.lmGlobal.store.getState().recording
        }
        const playAndGoNext = function* (playAction: App.Action, idx: number, listIdx: number) {
          yield delay(Recording.Consts.playActionDelay)
          const canc = window.lmGlobal.store.getState().recording.mode != Recording.TModes.playing
          if (!canc) {
            yield put(playAction)
            yield put({ type: Recording.Consts.PLAY_NEXT, idx, listIdx } as Recording.PlayNextAction)
          }
          return canc
        }
        while (true) {
          let state = window.lmGlobal.store.getState().recording
          if (recordingId == Recording.Consts.playLastRecording) {
            if (!state.idx) state = yield* setPlayInitState(state.startState)
            const rec = state.recording
            if (state.idx >= rec.length) {
              yield put({ type: Recording.Consts.PLAY_END } as Recording.Action)
              break
            } else {
              const canc = yield* playAndGoNext(rec[state.idx], state.idx + 1, 0)
              if (canc) break
            }
          } else if (recordingId == Recording.Consts.playAllPlaylist) {
            const playList = state.playLists[state.listIdx]
            if (state.idx >= playList.actions.length) {
              if (state.listIdx + 1 >= state.playLists.length) {
                yield put({ type: Recording.Consts.PLAY_END } as Recording.Action)
                break
              } else {
                yield put({ type: Recording.Consts.PLAY_NEXT, idx: 0, listIdx: state.listIdx + 1 } as Recording.PlayNextAction)
                state = window.lmGlobal.store.getState().recording
                //state = yield* setPlayInitState(state.playLists[state.listIdx + 1].startState)
                //const canc = yield* playAndGoNext(state.playLists[state.listIdx + 1].actions[0], 1, state.listIdx + 1)
                //if (canc) break
              }
            }
            if (state.idx == 0) state = yield* setPlayInitState(state.playLists[state.listIdx].startState) //init pouze pro state.playLists[0]
            const canc = yield* playAndGoNext(state.playLists[state.listIdx].actions[state.idx], state.idx + 1, state.listIdx)
            if (canc) break
          } else {
            if (!state.idx) state = yield* setPlayInitState(state.startState)
            const rec = state.playLists[recordingId].actions
            if (state.idx >= rec.length) {
              yield put({ type: Recording.Consts.PLAY_END } as Recording.Action)
              break
            } else {
              const canc = yield* playAndGoNext(rec[state.idx], state.idx + 1, recordingId)
              if (canc) break
            }
          }
          const nextAct: Recording.TActions = yield take([Recording.Consts.PLAY_CONTINUE, Recording.Consts.PLAY_CANCEL])
          if (nextAct.type == Recording.Consts.PLAY_CONTINUE) continue //Recording.Consts.PLAY_CONTINUE action
          break //Recording.Consts.PLAY_CANCEL action
        }
    }

  }
}

export const globalReducer: App.IReducer<IState> = (state, action: Recording.PlayInitStateAction) => {
  switch (action.type) {
    case Recording.Consts.PLAY_INIT_STATE:
      const { recording } = state
      const newRecording: Recording.IState = { ...recording, mode: Recording.TModes.playing, recordingId: action.recordingId }
      return { ...action.startState as IState, recording: newRecording }
    default: return state
  }
}

export const reducer: App.IReducer<Recording.IState> = (state, action: Recording.TActions) => {
  const initState = { mode: Recording.TModes.no, idx: 0, listIdx: 0 }
  if (!state) return { ...initState, guiSize: Recording.TGuiSize.large }
  switch (action.type) {
    case Recording.Consts.INIT:
      return { ...state, playLists: action.playLists }
    case Recording.Consts.RECORD_START:
      const { recording, ...startState } = window.lmGlobal.store.getState()
      return { ...state, mode: Recording.TModes.recording, recording: [], startState: JSON.parse(JSON.stringify(startState)) }
    case Recording.Consts.RECORD:
      return { ...state, recording: [...state.recording, action.action] }
    case Recording.Consts.RECORD_END:
      return { ...state, ...initState }
    case Recording.Consts.RECORD_SAVE_START:
      const playLists = [...state.playLists, { name: action.name, actions: state.recording, startState: state.startState, id: new Date().getTime(), checked: false, active:false }]
      savePlayList(playLists)
      return { ...state, ...initState, recording: null, startState: null, playLists }
    case Recording.Consts.PLAY_NEXT:
      return { ...state, idx: action.idx, listIdx: action.listIdx }
    case Recording.Consts.PLAY_END:
      return { ...state, ...initState }
    case Recording.Consts.PLAY_CANCEL:
      return { ...state, ...initState }
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
    recordSave: () => dispatch({ type: Recording.Consts.RECORD_SAVE_START, name: new Date().getTime().toString() } as Recording.RecordSaveAction),
    playStart: recordingId => dispatch({ type: Recording.Consts.PLAY_START, recordingId } as Recording.PlayStartAction),
    playCancel: () => dispatch({ type: Recording.Consts.PLAY_CANCEL } as Recording.Action),
    changeSize: () => dispatch({ type: Recording.Consts.CHANGE_SIZE } as Recording.Action),
    deleteSelected: () => dispatch({ type: Recording.Consts.CHANGE_SIZE } as Recording.Action),
    invertSelection: () => dispatch({ type: Recording.Consts.INVERT_SELECTION } as Recording.Action),
    playSelected: () => dispatch({ type: Recording.Consts.CHANGE_SIZE } as Recording.Action),
  } as Recording.IDispatchProps)
)
