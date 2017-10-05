import React from 'react'
import ReactDOM from 'react-dom'
import { PromiseExtensible } from '../lib/lib'

class App extends React.Component<any, { lines: string[] }> {
  state = { lines: [] }
  render() {
    return <div>
      <div onClick={async () => {
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
        const pixels = new Uint8Array(10000)
        for (let i = 0; i < pixels.length; i++) pixels[i] = i
        for (let i = 0; i < 1000; i++) {
          await PromiseExtensible.delay(1)
          socket.send(pixels.buffer)
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


  //<script type="text/javascript">
  //  var socket,
  //    $txt = document.getElementById('message'),
  //    $messages = document.getElementById('messages');

  //  if (typeof (WebSocket) !== 'undefined') {
  //    socket = new WebSocket("ws://localhost/app-common/snack/web-socket.ashx");
  //  } else {
  //    socket = new MozWebSocket("ws://localhost/app-common/snack/web-socket.ashx");
  //  }
  //  var pixels = new Uint8Array(10000);
  //  socket.binaryType = 'arraybuffer'; //=> binary data are arraybuffer (or blob)

  //  socket.onmessage = function (msg) {
  //    //https://stackoverflow.com/questions/15341912/how-to-go-from-blob-to-arraybuffer
  //    if (msg.data instanceof ArrayBuffer) {
  //      var bytearray = new Uint8Array(msg.data);
  //      var $el = document.createElement('p');
  //      $el.innerHTML = bytearray[123];
  //      $messages.insertAdjacentElement('afterbegin', $el);

  //      for (var i = 0; i < bytearray.length; i++) {
  //    bytearray[i] = bytearray[i] + 1;
  //  }
  //    } else if (typeof msg.data == 'string') {
  //      var $el = document.createElement('p');
  //      $el.innerHTML = msg.data;
  //      $messages.insertAdjacentElement('afterbegin', $el);
  //    }
  //  };

  //  document.getElementById('send').onclick = function () {
  //    for (var i = 0; i < pixels.length; i++) pixels[i] = i;
  //    //socket.send($txt.value);
  //    for (var i = 0; i < 100; i++)
  //      setTimeout(function () {socket.send(pixels.buffer)}, 1);
  //  };