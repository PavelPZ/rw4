using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Web;

public static class Recording {

  public static class Consts {
    public const string SAVE = "rec/SAVE";
    public const string LOAD = "rec/LOAD";
    public const string recording = "recording";
  }

  public static Rest.IOut<Object, Object> API(string type, string stringData, string appDataPath) {
    var fn = appDataPath + @"\recording.json";
    switch (type) {
      case Consts.LOAD:
        return new Rest.IOut<Object, Object>() { dataType = Rest.Types.JSON, stringData = File.Exists(fn) ? File.ReadAllText(fn) : null };
      case Consts.SAVE:
        File.WriteAllText(fn, stringData);
        return new Rest.IOut<Object, Object>() { dataType = Rest.Types.NO };
      default:
        throw new Exception();
    }
  }

}
