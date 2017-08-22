import React from 'react'

import { restAPI } from '../rest-api'

interface IPostData {
  id: number
  title: string
}

let postData: IPostData = { id: 10, title: 'titulekčřšŘ\'"=%' } as IPostData

export default class App extends React.PureComponent {
  render() {
    return <div>
      <h3 onClick={() => this.post()}>POST DATA</h3>
    </div>
  }

  async post() {
    try {
      const out = await restAPI<IPostData>({ module: 'testModule', action: 'action', par: postData, dataType: RestAPI.Types.ARRAYBUFFER, data: new Uint8Array([1, 2, 3]).buffer } as RestAPI.IInp<IPostData>)
      postData = out.par
      alert(JSON.stringify(postData))
    } catch (msg) {
      if (msg == null) return
      alert(msg)
    }
  }
}

