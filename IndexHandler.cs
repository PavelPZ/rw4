using System;
using System.Web;

namespace Index {
  public class Handler : IHttpHandler {

    public bool IsReusable { get { return true; } }

    public void ProcessRequest(HttpContext ctx) {
      string url = ctx.Request.Url.AbsolutePath.ToLower();
      if (!url.StartsWith("/web-app")) return;
      string fn = ctx.Server.MapPath("~/web-app.html");
      var path = ctx.Request.Url.AbsolutePath;
      ctx.Response.WriteFile(fn);
    }

  }
}
