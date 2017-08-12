declare namespace Loc {

  type Langs = "af" | "ar" | "az" | "bg" | "bn" | "bs" | "ca" | "cs" | "da" | "de" | "el" | "en" | "es" | "es" | "et" | "eu" | "fa" | "fi" | "fr" | "ga" | "gl" | "he" | "hi" | "hr" | "hu" | "hy" | "id" | "is" | "it" | "ja" | "ka" | "km" | "ko" | "ky" | "lt" | "lv" | "mk" | "ml" | "mn" | "ms" | "nb" | "nl" | "pl" | "pt" | "pt-PT" | "ro" | "ru" | "sk" | "sl" | "sq" | "sr" | "sv" | "sw" | "th" | "tr" | "uk" | "ur" | "uz" | "vi" | "zh-Hans" | "zh-Hant" | "zu";
  //const allLangs: Array<Langs> = ["af", "ar", "az", "bg", "bn", "bs", "ca", "cs", "da", "de", "el", "en", "es", "es", "et", "eu", "fa", "fi", "fr", "ga", "gl", "he", "hi", "hr", "hu", "hy", "id", "is", "it", "ja", "ka", "km", "ko", "ky", "lt", "lv", "mk", "ml", "mn", "ms", "nb", "nl", "pl", "pt", "pt-PT", "ro", "ru", "sk", "sl", "sq", "sr", "sv", "sw", "th", "tr", "uk", "ur", "uz", "vi", "zh-Hans", "zh-Hant", "zu"];
  //e.g. oldToNew[Langs.cs_cz] = 'cs' 
  //const oldToNew: Array<Langs> = [null, null, "cs", "en", "de", "sk", "fr", "it", "es", "ru", "vi", "es", "fi", "sv", "da", "nb", "af", "sq", "ar", "hy", null, "az", "eu", "bn", null, "pt", null, "bg", null, "zh-Hans", "ca", null, "hr", null, "nl", null, "et", "gl", "ka", "el", null, null, "he", "hi", "hu", "zh-Hant", "is", null, "id", "ga", "ja", null, "km", "ky", "ko", null, null, "lv", "lt", "mk", "ms", "ml", null, null, null, "mn", null, null, null, "fa", "pl", "pt-PT", null, null, "ro", "sr", null, null, "sl", "sw", null, null, "th", null, null, "tr", "uk", "ur", "uz", null, null, null, "zu", "bs"];


  const enum Consts {
    MODE_LOC_ASYNC_START = 'loc/MODE_LOC_ASYNC_START', //async start IContextMode.loc mode
    MODE_LOC_START = 'loc/MODE_LOC_START', //start IContextMode.loc mode
    SENT_START = 'loc/START_SENT', //zacatek editace vety
    SENT_OK = 'loc/SENT_OK', //uschovani editovane vety
    SENT_CANCEL = 'loc/SENT_CANCEL', //
    MODE_LOC_END = 'loc/MODE_LOC_END', //konec IContextMode.loc mode

    MODE_BATCH_ASYNC_START = 'loc/MODE_BATCH_ASYNC_START', //zacatek async rezimu
    MODE_BATCH_END = 'loc/MODE_BATCH_END', //konec async rezimu
  }

  interface IState {
    nativeLang: Langs //nativni jazyk uzivatele
    mode: IContextMode
    forceUpdate: number //pro redux - zvetsenim cisla se provede re-render Providel komponenty
    //pro locMode==true: lokalizuje se z anglictiny do toLang, jako pomucka se ukazi jeste helperLangs jazyky
    locLang?: Langs
    helperLangs?: Langs[] //jako pomucka se ukazi dalsi preklady
  }

  interface IContext extends IState {
    native?: ISents //gui aplikace pro NONE mod v jazyce IState.nativeLang
    loc?: ISents //vysledek LOC modu v jazyce IState.locLang
    helpers?: { [lang: string]: ISents } //pomoca data LOC modu v jazycich IState.helperLangs
    batchResult?: ISents //vysledek BATCH modu v anglictine
  }

  interface ISents {
    locLang: Langs
    [id:number]: ISent
  }

  interface ISent {
    enSource: string //string nebo #0 delimited string array
    trans: string //string nebo #0 delimited string array
  }

  type IGetLocResult = string | string[] //retezec nebo skupina retezcu pro lokalizaci kontextu

  const enum IContextMode { none/*normalni beh aplikace*/, loc/*lokalizace aplikace*/, batch/*design time pruchod vsemi strankami pro zjisteni zdrojovych anglickych lokalizacnich dat*/ }

  const enum TFileIds {
    locTest = 'locTest/999',
  }

  interface ILocSentenceProps {
    ctx: Loc.IContext
    file: string
    sentId: number
    enSource?: string
    enSources?: string[]
    mask?: (pars: string[]) => React.ReactNode[]
  }

}

interface IState {
  loc?: Loc.IState
}

interface IContext {
  loc: Loc.IContext
}
