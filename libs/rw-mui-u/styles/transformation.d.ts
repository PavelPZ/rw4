declare namespace Mui2 {

  //*********** CONSTS
  const enum Names {
    rootRule = 'root',
    Icon = 'MuiIcon-n'
  }

  //*********** RULE typing
  type WebCSS = ReactCSS.CSSProperties
  //available native styles
  type NativeCSS = RN.TextStyle | RN.ViewStyle | RN.ImageStyle | CSS.RNIconStyle
  type AllCSS = WebCSS | NativeCSS

  //cross platform style. It contains: 
  //- commonStyle<T>: styles, common to Web and Native
  //- 'native' and 'web' props for platform specific styles
  type Rule<T extends NativeCSS> = { native?: T; web?: WebCSS } & commonStyle<T>
  type RuleUntyped = Rule<RN.TextStyle>
  //result of transformation cross platform styles to platform specific style
  type PlatformRule<T extends NativeCSS> = T | WebCSS
  //type expanRuleProc = <T extends NativeStyle>(source: Rule<T>) => ExpandedRule<T>

  //select native props from web CSS. E.g. commonStyle<RN.TextStyle> could be used both for native <Text> and web <span>
  type commonStyle<TNative> = TakeFrom<TNative, webUsableInNative & keyof TNative>
  type webUsableInNative = Diff<keyof WebCSS, 'transform'> //transform native prop is not compatible with web

  //*********** RULES typing
  // for every cross platform component: basic rule definition
  type TypedSheet = Record<string, NativeCSS>

  //cross platform rules definition
  type Sheet<R extends TypedSheet> = {[P in keyof R]: Rule<R[P]> } //rules definition type
  type SheetUntyped = Sheet<TypedSheet>
  type SheetCreatorWeb<R extends TypedSheet> = PlatformSheetWeb<R> | ((theme: Mui.Theme) => PlatformSheetWeb<R>) //rules definition (rules or function)
  type SheetCreatorNative<R extends TypedSheet> = PlatformSheetNative<R> | ((theme: Mui.Theme) => PlatformSheetNative<R>) //rules definition (rules or function)
  type SheetCreator<R extends TypedSheet> = SheetCreatorWeb<R> | SheetCreatorNative<R>
  //'classes' component attribute:
  //type ClassesProp<R extends TypedSheet> = Partial<Sheet<R>>

  //expanded cross platform rules to platform specific
  type PlatformSheetWeb<R extends TypedSheet> = {[P in keyof R]: WebCSS} //expanded for web
  type PlatformSheetNative<R extends TypedSheet> = R //expanded for native
  type PlatformSheet<R extends TypedSheet> = PlatformSheetWeb<R> | PlatformSheetNative<R> //{[P in keyof R]: WebCSS | R[P]} //PlatformSheetWeb<R> | PlatformSheetNative<R>
  type PlatformSheetClasses<R extends TypedSheet> = Partial<PlatformSheetWeb<R>> | Partial<PlatformSheetNative<R>> //{[P in keyof R]: WebCSS | R[P]} //PlatformSheetWeb<R> | PlatformSheetNative<R>
  //type for expanded proc
  //type expanRulesProc = <R extends TypedRules>(source: Rules<R>) => ExpandedRules<R>

  //For web: rule-set is converted to blank delimited atomic class names (single class for every rule)
  //For native: unchanged PlatformSheet
  type ClassSheet<R extends TypedSheet> = {[P in keyof R]: string | NativeCSS}
  //type webRulesToClassesProc = <R extends TypedSheet>(src: PlatformSheetWeb<R>) => ClassSheet<R>

  //*************************************************
  // cross platform COMPONENTs with similar sheet for both web and native
  //*************************************************

  type PropsLow<C> = { innerRef?: React.Ref<any> } & C

  //cross platform Component, used in web and native application (created by withStyles)
  type Props<C, R extends TypedSheet> = PropsLow<C> & { classes?: Partial<Sheet<R>>; style?: Rule<R[Names.rootRule]> }
  type ComponentType<C, R extends TypedSheet> = React.ComponentType<Props<C, R>>
  type SFC<C, R extends TypedSheet> = React.SFC<Props<C, R>>

  //Component's code (passed to withStyles)
  type CodeProps<C, R extends TypedSheet> = PropsLow<C> & { classes: PlatformSheet<R>; style?: PlatformRule<R[Names.rootRule]>; theme: Mui.Theme; flip: boolean }
  type CodeComponentType<C, R extends TypedSheet> = React.ComponentType<CodeProps<C, R>>
  type CodeSFC<C, R extends TypedSheet> = React.SFC<CodeProps<C, R>>

  //for native
  //type withStyleNative = <R extends TypedSheet>(style: PlatformSheetNative<R>, options?: Mui.WithStylesOptions) => <C>(component: CodeComponentType<C, R>) => ComponentType<C, R>

  //for web: transforms after mui original withStyle 
  //type withStyleWeb = <R extends TypedSheet>(style: origStyleRules<keyof R>, options?: Mui.WithStylesOptions) => <C>(component: CodeComponentType<C, R>) => ComponentType<C, R>
  //type beforeWithStyleMui = <C, R extends TypedRules>(component: toWithStylesComponentType<C, R>) => origWithStyleSourceComponentType<C, keyof R>
  //type afterWithStyleMui = <C, R extends TypedSheet>(component: origComponentType<C, keyof R>) => ComponentType<C, R>

  //*************************************************
  // cross platform COMPONENTs with distinct sheet for web and native
  //*************************************************

  //original mui typings
  type muiSheet<ClassKey extends string = string> = Record<ClassKey, WebCSS>
  type muiSheetCreator<ClassKey extends string = string> = muiSheet<ClassKey> | ((theme: Mui.Theme) => muiSheet<ClassKey>)
  interface WithStylesOptions { flip?: boolean; withTheme?: boolean; name?: string; }
  type muiClassSheet<ClassKey extends string = string> = Record<ClassKey, string>
  interface muiCodeProps<ClassKey extends string = string> { classes: muiClassSheet<ClassKey>; theme?: Mui.Theme }
  interface muiProps<ClassKey extends string = string> { classes?: Partial<muiClassSheet<ClassKey>>; innerRef?: React.Ref<any>; style?: WebCSS }
  type muiWithStyles = <ClassKey extends string>(style: muiSheetCreator<ClassKey>, options?: WithStylesOptions) => <P>(component: muiCodeComponentType<P, ClassKey>) => muiComponentType<P, ClassKey>
  type muiCodeComponentType<P, ClassKey extends string> = React.ComponentType<P & muiCodeProps<ClassKey>>
  type muiComponentType<P, ClassKey extends string> = React.ComponentType<P & muiProps<ClassKey>>

  //rules modification via 'classes' attribute
  type ClassesPropDistinct<R extends TypedSheet, TKey extends string> = { native?: Partial<R>; web?: Partial<Record<TKey, WebCSS>> } //MUI compatible RULES typing

  //Component, used in web and native application (after muiWithStyles HOC for Native rewrite or after muiMakeCompatible for original mui component)
  type PropsDistinct<C, R extends TypedSheet, TKey extends string> = PropsLow<C> & { classes?: ClassesPropDistinct<R, TKey>; style?: Rule<RN.TextStyle> }
  type ComponentTypeDistinct<C, R extends TypedSheet, TKey extends string> = React.ComponentType<PropsDistinct<C, R, TKey>>

  //Component's code (passed to withStyles)
  type CodePropsDistinct<C, R extends TypedSheet, TKey extends string> = PropsLow<C> & { classes?: ClassesPropDistinct<R, TKey>; style?: { web?: WebCSS; native?: NativeCSS }; theme: Mui.Theme }
  type CodeComponentTypeDistinct<C, R extends TypedSheet, TKey extends string> = React.ComponentType<CodePropsDistinct<C, R, TKey>>

  //native withStyle for mui rewrited components
  //type muiNativeWithStyle = <R extends TypedSheet, TKey extends string>(style: R, options?: Mui.WithStylesOptions) => <C>(component: muiToWithStylesComponentType<C, R>) => muiComponentType<C, R, TKey>
  //modyfying original MUI component to be compatible with Native rewrite
  //type muiWithStyleWeb = <R extends TypedSheet>(style: origStyleRules<keyof R>, options?: Mui.WithStylesOptions) => <C>(component: muiToWithStylesComponentType<C, R>) => ComponentType<C, R>
  //type muiBeforeWithStyleMui = <C, R extends TypedRules>(component: muiToWithStylesComponentType<C, R>) => origWithStyleSourceComponentType<C, keyof R>
  //type muiBeforeWithStyleMui = <C, R extends TypedSheet, TKey extends string>(component: origComponentType<C, keyof R>) => muiComponentType<C, R, TKey>

}