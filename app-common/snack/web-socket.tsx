import React from 'react'
import ReactDOM from 'react-dom'
import { PromiseExtensible } from '../lib/lib'

class App extends React.Component<any, { lines: string[] }> {
  state = { lines: [] }
  render() {
    return <div>
      <div onClick={() => {
        this.setState(st => ({ lines: [] }))
        const socket = new webSocket("ws://localhost/app-common/snack/web-socket.ashx")
        socket.binaryType = 'arraybuffer'; //=> binary data are arraybuffer (or blob)

        socket.onmessage = msg => {
          //https://stackoverflow.com/questions/15341912/how-to-go-from-blob-to-arraybuffer
          if (msg.data instanceof ArrayBuffer) {
            var bytearray = new Uint8Array(msg.data);
            this.setState(st => ({ lines: [...st.lines, bytearray[123]] }))
          } else if (typeof msg.data == 'string') {
            this.setState(st => ({ lines: [msg.data] }))
          }
        }
        socket.onopen = async () => {
          const pixels = new Uint8Array(10000)
          for (let i = 0; i < pixels.length; i++) pixels[i] = i
          for (let i = 0; i < 1000; i++) {
            await PromiseExtensible.delay(1)
            socket.send(pixels.buffer)
          }
          socket.close()
        }
      }}>RUN</div>
      <hr/>
      {this.state.lines.map(s => s + ', ')}
    </div>
  }
}

declare const MozWebSocket: typeof WebSocket
const webSocket = typeof (WebSocket) !== 'undefined' ? WebSocket : MozWebSocket

ReactDOM.render(<App />, document.getElementById('content'))