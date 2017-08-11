declare namespace Loc {

  type Langs = "af" | "ar" | "az" | "bg" | "bn" | "bs" | "ca" | "cs" | "da" | "de" | "el" | "en" | "es" | "es" | "et" | "eu" | "fa" | "fi" | "fr" | "ga" | "gl" | "he" | "hi" | "hr" | "hu" | "hy" | "id" | "is" | "it" | "ja" | "ka" | "km" | "ko" | "ky" | "lt" | "lv" | "mk" | "ml" | "mn" | "ms" | "nb" | "nl" | "pl" | "pt" | "pt-PT" | "ro" | "ru" | "sk" | "sl" | "sq" | "sr" | "sv" | "sw" | "th" | "tr" | "uk" | "ur" | "uz" | "vi" | "zh-Hans" | "zh-Hant" | "zu";
  //const allLangs: Array<Langs> = ["af", "ar", "az", "bg", "bn", "bs", "ca", "cs", "da", "de", "el", "en", "es", "es", "et", "eu", "fa", "fi", "fr", "ga", "gl", "he", "hi", "hr", "hu", "hy", "id", "is", "it", "ja", "ka", "km", "ko", "ky", "lt", "lv", "mk", "ml", "mn", "ms", "nb", "nl", "pl", "pt", "pt-PT", "ro", "ru", "sk", "sl", "sq", "sr", "sv", "sw", "th", "tr", "uk", "ur", "uz", "vi", "zh-Hans", "zh-Hant", "zu"];
  //e.g. oldToNew[Langs.cs_cz] = 'cs' 
  //const oldToNew: Array<Langs> = [null, null, "cs", "en", "de", "sk", "fr", "it", "es", "ru", "vi", "es", "fi", "sv", "da", "nb", "af", "sq", "ar", "hy", null, "az", "eu", "bn", null, "pt", null, "bg", null, "zh-Hans", "ca", null, "hr", null, "nl", null, "et", "gl", "ka", "el", null, null, "he", "hi", "hu", "zh-Hant", "is", null, "id", "ga", "ja", null, "km", "ky", "ko", null, null, "lv", "lt", "mk", "ms", "ml", null, null, null, "mn", null, null, null, "fa", "pl", "pt-PT", null, null, "ro", "sr", null, null, "sl", "sw", null, null, "th", null, null, "tr", "uk", "ur", "uz", null, null, null, "zu", "bs"];


  const enum Consts {
  }

  interface IState {
    loc: Langs //nativni jazyk uzivatele
    locMode?: number //>0 => zobraz obrazovku v rezimu lokalizace
    //pro locMode==true: lokalizuje se z anglictiny do toLang, jako pomucka se ukazi jeste helperLangs jazyky
    toLang?: Langs
    helperLangs?: Langs[] //jako pomucka se ukazi dalsi preklady
  }

  type IGetLocResult = string | string[] //retezec nebo skupina retezcu pro lokalizaci kontextu

  const enum IContextMode { none/*normalni beh aplikace*/, loc/*lokalizace aplikace*/, batch/*design time pruchod vsemi strankami pro zjisteni zdrojovych anglickych lokalizacnich dat*/ }

  interface ILocContext {
    loc: {
      mode: IContextMode
      c: (par: React.MouseEventHandler<any>) => React.MouseEventHandler<any>
      x
    }
  }

  const enum TFileIds {
    locTest = 'locTest/999',
  }

}

interface IState {
  loc?: Loc.IState
}

