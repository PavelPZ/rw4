using Newtonsoft.Json;
using System;
using System.IO;
using System.Web;

namespace Rest {

  public class IInp<T, TData> {
    public string module;
    public string action;
    public T par;
    public string dataType;
  }

  public class IOut<T, TData> where T : class where TData : class {
    public string dataType;
    public T par;
    public string stringData;
    public byte[] binaryData;
  }

  public static class Types {
    public const string NO = "NO";
    public const string ERROR = "ERROR";
    public const string STRING = "STRING";
    public const string JSON = "JSON";
    public const string ARRAYBUFFER = "ARRAYBUFFER";
  }

  public class API : IHttpHandler {

    public void ProcessRequest(HttpContext context) {
      var headers = context.Request.Headers;
      var resp = context.Response;

      var module = headers["x-lm-module"];
      var type = headers["x-lm-action"];
      var dataType = headers["x-lm-data-type"];
      var par = headers["x-lm-par"];
      string stringData = null;
      BinaryReader binaryData = null;

      try {
        if (dataType != null)
          switch (dataType) {
            case Types.JSON:
            case Types.STRING:
              using (var reader = new StreamReader(context.Request.InputStream)) stringData = reader.ReadToEnd();
              break;
            default:
              binaryData = new BinaryReader(context.Request.InputStream);
              break;
          }

        IOut<Object, Object> res;

        switch (module) {
          case Recording.Consts.recording:
            var recRes = Recording.API(type, stringData, context.Server.MapPath("~/App_Data"));
            res = new IOut<Object, Object> { par = recRes.par, dataType = recRes.dataType, binaryData = recRes.binaryData, stringData = recRes.stringData };
            break;
          case "testModule":
            var testRes = TestRestAPI.API.testModule(type, par, dataType, null, binaryData);
            res = new IOut<Object, Object> { par = testRes.par, dataType = testRes.dataType, binaryData = testRes.binaryData, stringData = testRes.stringData };
            break;
          default:
            throw new Exception("Unknown module: " + module);
        }

        resp.ContentType = "application/octet-stream";
        resp.Headers["x-lm-type"] = res.dataType;
        if (res.par != null) resp.Headers["x-lm-par"] = HttpUtility.UrlEncode(JsonConvert.SerializeObject(res.par));
        if (res.stringData != null) resp.Write(res.stringData);
        if (res.binaryData != null) //BinaryReader reads this data type in little-endian format, https://stackoverflow.com/questions/9618608/is-net-binaryreader-always-little-endian-even-on-big-endian-systems
          using (var wr = new BinaryWriter(resp.OutputStream))
            foreach (var b in res.binaryData) wr.Write(b);
      } catch (Exception exp) {
        resp.Headers["x-lm-type"] = "ERROR";
        resp.Write(JsonConvert.SerializeObject(exp.Message));
      } finally {
        if (binaryData != null) binaryData.Close();
      }
    }

    public bool IsReusable { get { return false; } }

  }

}

