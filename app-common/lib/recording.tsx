import { Middleware, MiddlewareAPI, Action, Dispatch } from 'redux'
import { connect } from 'react-redux'
import invariant from 'invariant'
import { put, take, race } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { restAPI } from './rest-api'

export const init = async () => { //async init
  const rec = window.lmGlobal.platform.recordingPlatform
  const guiSize = (rec && rec.guiSize) || Recording.TGuiSize.no
  initState = { guiSize } 
  if (guiSize == Recording.TGuiSize.no) return null
  if (rec.recordingJSON) { initState.playLists = rec.recordingJSON; return null }
  initState.playLists = await loadPlayList()
}
let initState: Recording.IState = {}

export const middleware: Middleware = (middlAPI: MiddlewareAPI<IState>) => next => act => { //inspirace v D:\rw\rw\rw-redux\async.ts

  next(act)

  const type: string = act.type; const asyncStart = '_START'; const asyncEnd = '_END'; const system = '_SYSTEM'

  if (type.endsWith(system)) return act

  if (type.endsWith(asyncStart)) { 
    invariant(!actAsyncAction, `asyncMiddleware: !${actAsyncAction}`) //max single asyncSTART...
    const state = middlAPI.getState().recording
    actAsyncAction = type.substr(0, type.length - asyncStart.length)
    record(state, middlAPI.dispatch, act) //record start action
    blockGuiTimer = setTimeout(() => { blockGUI(middlAPI.dispatch, true); blockGuiTimer = 0 }, 1)
  } else if (type.endsWith(asyncEnd)) { 
    invariant(actAsyncAction === type.substr(0, type.length - asyncEnd.length), `asyncMiddleware: ${actAsyncAction} != ${type}`) //...must be finished by just single asyncEND
    const state = middlAPI.getState().recording
    if (blockGuiTimer) { clearTimeout(blockGuiTimer); blockGuiTimer = 0 } else blockGUI(middlAPI.dispatch, false)
    actAsyncAction = null
    playContinue(state, middlAPI.dispatch) //async finished => if playing, play next action. Don't record END action
  } else {
    if (!actAsyncAction) { //action is not between asyncSTART - END
      const state = middlAPI.getState().recording
      record(state, middlAPI.dispatch, act) //if recording, record action
      playContinue(state, middlAPI.dispatch) //if playing, play next action
    }
  }

  return act
}

let actAsyncAction: string
let blockGuiTimer = 0

const record = (state: Recording.IState, dispatch: Dispatch<any>, action: Action) => state && state.mode == Recording.TModes.recording && dispatch({ type: Recording.Consts.RECORD, action } as Recording.RecordAction)
const playContinue = (state: Recording.IState, dispatch: Dispatch<any>) => state && state.mode == Recording.TModes.playing && dispatch({ type: Recording.Consts.PLAY_CONTINUE } as Recording.Action)

const loadPlayList = () => callRestAPI(Recording.RestAPI.Consts.LOAD).then(d => d.data as Recording.IPlayList[] || [])
const savePlayList = (pl: Recording.IPlayList[]) => callRestAPI(Recording.RestAPI.Consts.SAVE, pl)

const callRestAPI = (action, data = null) => restAPI({ module: Recording.RestAPI.Consts.module, action, par: null, dataType: data ? RestAPI.Types.JSON : RestAPI.Types.NO, data })

let debugPlayList: Recording.IPlayList[] = []

export const saga = function* () {
  while (true) {
    const act: Recording.TActions = yield take([Recording.Consts.RECORD_START, Recording.Consts.PLAY_START])
    switch (act.type) {
      case Recording.Consts.RECORD_START:
        continue
      case Recording.Consts.PLAY_START:
        //console.log('PLAY_START')
        const playSelected = act.playSelected
        const setPlayInitState = function* (startState: IState) {
          yield delay(Recording.Consts.playActionDelay)
          yield put({ type: Recording.Consts.PLAY_INIT_STATE, startState } as Recording.PlayInitStateAction)
          return window.lmGlobal.store.getState().recording
        }
        const playAndGoNext = function* (playAction: App.Action, idx: number, listIdx: number, playMsg: string) {
          yield delay(Recording.Consts.playActionDelay)
          const canc = window.lmGlobal.store.getState().recording.mode != Recording.TModes.playing
          if (!canc) {
            yield put(playAction)
            const act: Recording.TActions = yield take([Recording.Consts.PLAY_CONTINUE])
            yield put({ type: Recording.Consts.PLAY_NEXT, idx, listIdx, playMsg } as Recording.PlayNextAction)
          }
          return canc
        }
        while (true) {
          let state = window.lmGlobal.store.getState().recording
          if (!playSelected) {
            if (!state.idx) state = yield* setPlayInitState(state.startState)
            const rec = state.recording
            if (state.idx >= rec.length) {
              yield put({ type: Recording.Consts.PLAY_END } as Recording.Action)
              break
            } else {
              const canc = yield* playAndGoNext(rec[state.idx], state.idx + 1, 0, `PLAY REC: ${state.idx + 1} / ${rec.length}`)
              if (canc) break; else continue
            }
          } else {
            let playList = state.playLists[playSelected[state.listIdx]]
            //console.log('playList: ', JSON.stringify(playList, null, 2))
            if (state.idx >= playList.actions.length) {
              if (state.listIdx + 1 >= playSelected.length) {
                yield put({ type: Recording.Consts.PLAY_END } as Recording.Action)
                break
              } else {
                yield put({ type: Recording.Consts.PLAY_NEXT, idx: 0, listIdx: state.listIdx + 1 } as Recording.PlayNextAction)
                state = window.lmGlobal.store.getState().recording
                playList = state.playLists[playSelected[state.listIdx]]
              }
            }
            if (state.idx == 0) state = yield* setPlayInitState(playList.startState)
            const canc = yield* playAndGoNext(playList.actions[state.idx], state.idx + 1, state.listIdx, `PLAY ALL ${state.listIdx + 1} / ${playSelected.length}: ${state.idx + 1} / ${playList.actions.length}`)
            if (canc) break; else continue
          }

        }
    }

  }
}

export const globalReducer: App.IReducer<IState> = (state, action: Recording.PlayInitStateAction) => {
  switch (action.type) {
    case Recording.Consts.PLAY_INIT_STATE:
      const { recording } = state
      const newRecording: Recording.IState = { ...recording, mode: Recording.TModes.playing }
      if (window.lmGlobal.isNative) //expand WEB routes to native routes
        action.startState = { ...action.startState, router: window.lmGlobal.platform.routerPlatform.computeState(action.startState.router, undefined)}
      return { ...action.startState, recording: newRecording }
    default: return state
  }
}

const resetState: Recording.IState = { mode: Recording.TModes.no, idx: 0, listIdx: 0, playMsg: '' }

export const reducer: App.IReducer<Recording.IState> = (state, action: Recording.TActions) => {
  if (!state) return { ...resetState, ...initState }
  switch (action.type) {
    case Recording.Consts.RECORD_START:
      const { recording, ...startState } = window.lmGlobal.store.getState()
      return { ...state, mode: Recording.TModes.recording, recording: [], startState: JSON.parse(JSON.stringify(startState)) }
    case Recording.Consts.RECORD:
      return { ...state, recording: [...state.recording, action.action], playMsg: `REC: ${state.recording.length + 1}` }
    case Recording.Consts.RECORD_END:
      return { ...state, ...resetState }
    case Recording.Consts.RECORD_SAVE_START:
      const playLists = [...state.playLists, { name: action.name, actions: state.recording, startState: state.startState, id: new Date().getTime(), checked: false, active: false }]
      savePlayList(playLists)
      return { ...state, ...resetState, recording: null, startState: null, playLists }
    case Recording.Consts.PLAY_NEXT:
      return { ...state, idx: action.idx, listIdx: action.listIdx, playMsg: action.playMsg }
    case Recording.Consts.PLAY_END:
      return { ...state, ...resetState }
    case Recording.Consts.PLAY_CANCEL:
      return { ...state, ...resetState }
    case Recording.Consts.CHANGE_SIZE:
      return { ...state, guiSize: state.guiSize == Recording.TGuiSize.large ? Recording.TGuiSize.icon : state.guiSize + 1 }
    case Recording.Consts.LIST_DELETE:
      if (!state.playLists) return state
      const playLists2 = []
      for (let i = 0; i < state.playLists.length; i++) if (!state.playLists[i].checked) playLists2.push(state.playLists[i])
      savePlayList(playLists2)
      const newSt3 = { ...state, playLists: playLists2 }
      return newSt3
    case Recording.Consts.LIST_INVERT:
      if (!state.playLists) return state
      const newSt2 = { ...state, playLists: [...state.playLists] }
      for (let i = 0; i < newSt2.playLists.length; i++) newSt2.playLists[i] = { ...newSt2.playLists[i], checked: !newSt2.playLists[i].checked }
      return newSt2
    case Recording.Consts.LIST_SEL_CHANGE:
      const newSt = { ...state, playLists: [...state.playLists] }
      newSt.playLists[action.idx] = { ...state.playLists[action.idx], checked: action.checked }
      return newSt
    default: return state
  }
}


export const providerConnector = connect<Recording.IStateProps, Recording.IDispatchProps, {}>(
  (state: IState) => state.recording as Recording.IStateProps,
  (dispatch) => ({
    recordStart: () => dispatch({ type: Recording.Consts.RECORD_START } as Recording.Action),
    recordEnd: () => dispatch({ type: Recording.Consts.RECORD_END } as Recording.Action),
    recordSave: () => dispatch({ type: Recording.Consts.RECORD_SAVE_START, name: new Date().getTime().toString() } as Recording.RecordSaveAction),
    playStart: playSelected => dispatch({ type: Recording.Consts.PLAY_START, playSelected } as Recording.PlayStartAction),
    playCancel: () => dispatch({ type: Recording.Consts.PLAY_CANCEL } as Recording.Action),
    changeSize: () => dispatch({ type: Recording.Consts.CHANGE_SIZE } as Recording.Action),
    listDelete: () => dispatch({ type: Recording.Consts.LIST_DELETE } as Recording.Action),
    listInvert: () => dispatch({ type: Recording.Consts.LIST_INVERT } as Recording.Action),
    playSelected: () => dispatch({ type: Recording.Consts.CHANGE_SIZE } as Recording.Action),
    listSelChange: (idx: number, checked: boolean) => dispatch({ type: Recording.Consts.LIST_SEL_CHANGE, idx, checked } as Recording.ListSelChange),
  } as Recording.IDispatchProps)
)

//******************** BLOCK GUI

export const blockGuiSaga = function* () {
  while (true) {
    const act: BlockGui.Action = yield take([BlockGui.Consts.START])
    yield put({ type: BlockGui.Consts.SET_STATE, state: BlockGui.State.show } as BlockGui.SetStateAction)
    const { waitForIcon, end } = yield race({
      waitForIcon: delay(500),
      end: take([BlockGui.Consts.END]),
    })
    if (waitForIcon) {
      yield put({ type: BlockGui.Consts.SET_STATE, state: BlockGui.State.showIcon } as BlockGui.SetStateAction)
      const act: BlockGui.Action = yield take([BlockGui.Consts.END])
    }
    yield put({ type: BlockGui.Consts.SET_STATE, state: BlockGui.State.no } as BlockGui.SetStateAction) //or "race.end" or "race.waitForIcon and take([BlockGui.Consts.END])"
  }
}

export const blockGuiReducer: App.IReducer<BlockGui.IState> = (state, action: BlockGui.SetStateAction) => {
  if (!state) return { state: BlockGui.State.no } as BlockGui.IState
  switch (action.type) {
    case BlockGui.Consts.SET_STATE: return { state: action.state }
    default: return state
  }
}

export const blockGuiConnector = connect<BlockGui.IState, {}, BlockGui.IOwnProps>((state: IState) => state.blockGui)

const blockGUI = (dispatch: App.Dispatch, isBlock: boolean) => dispatch({ type: isBlock ? BlockGui.Consts.START : BlockGui.Consts.END } as BlockGui.Action)
