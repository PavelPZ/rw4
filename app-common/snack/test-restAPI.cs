using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace TestRestAPI {

  public class IPostData {
    public int id;
    public string title;
  }

  public static class API {

    public static Rest.IOut<IPostData, Object> testModule(string type, string parStr, string dataType, string content, BinaryReader binary) {
      var par = JsonConvert.DeserializeObject<IPostData>(HttpUtility.UrlDecode(parStr));

      List<byte> data = new List<byte>();
      while (binary.BaseStream.Position < binary.BaseStream.Length) data.Add(binary.ReadByte());
      data.Add((byte)(data.Count + 2));
      par.id += data.Sum(d => d);
      return new Rest.IOut<IPostData, Object> { dataType = "ArrayBuffer", par = par, binaryData = data.ToArray() };
    }
  }

}