import createHistory from 'history/createMemoryHistory'

import { AnimatedPromise } from 'rw-utils/promise/animate-n'

import { init as initLow } from './index'

export const init = (startRoute: Router.IState, rootUrl: string) => {
  initLow(startRoute, createHistory() as Router.IHistory, getAnimator, rootUrl, null)
}

const getAnimator = (animValue: WebNativeCommon.TRouterAnimRoot, display: boolean) => new AnimatedPromise(animValue, display)