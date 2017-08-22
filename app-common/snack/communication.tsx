import React from 'react'

const url = 'app-common/snack/communication.ashxx'

interface IPostData {
  id: number
  title: string
}

let postData: IPostData = { id: 10, title: 'titulek' } as IPostData

export default class App extends React.PureComponent {
  render() {
    return <div>
      <h3 onClick={() => this.post()}>POST DATA</h3>
    </div>
  }

  async post() {
    try {
      postData = await doPost<IPostData>(postData)
      alert(JSON.stringify(postData))
    } catch (msg) {
      if (msg==null) return
      alert(msg)
    }
  }
}

//https://davidwalsh.name/fetch
//https://github.github.io/fetch/
const doPost = async <TOut extends {}>(inp: {}) => {
  return fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
    .then(res => { if (!res.ok) throw new Error(`ERROR: ${res.status}-${res.statusText} (${url})`); return res.text() })
    .then(txt => { try { return JSON.parse(txt) as TOut } catch (msg) { throw new Error(`ERROR: ${msg} (${txt})`) } })
}