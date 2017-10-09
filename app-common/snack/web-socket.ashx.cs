
using System;
using System.Collections.Generic;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.WebSockets;

namespace web_socket {

  public class Handler : IHttpHandler {
    public void ProcessRequest(HttpContext context) {
      //rw4.app_common.gui.md_icons_design.run(); return;
      if (context.IsWebSocketRequest)
        context.AcceptWebSocketRequest(ProcessSocketRequest);
    }

    static int count = 0;

    private async Task ProcessSocketRequest(AspNetWebSocketContext context) {
      var socket = context.WebSocket;
      var buffer = new ArraySegment<byte>(new byte[1024]);

      while (true) { //waiting for socket message

        while (true) { //process single message
          var result = await socket.ReceiveAsync(buffer, CancellationToken.None); // async wait for a change in the socket

          if (socket.State != WebSocketState.Open) break; //socket already closed

          //TODO: process result.Count datas from buffer
          count += result.Count; // buffer.Count;

          if (result.EndOfMessage) break;
        }
        if (socket.State != WebSocketState.Open) break;

        for (var i = 0; i < 5; i++) {
          //await socket.SendAsync(new ArraySegment<byte>(Encoding.UTF8.GetBytes(count.ToString())), WebSocketMessageType.Text, true, CancellationToken.None);
          await socket.SendAsync(buffer, WebSocketMessageType.Binary, i == 4, CancellationToken.None);
        }
      }
    }

    public bool IsReusable {
      get {
        return true;
      }
    }
  }

}