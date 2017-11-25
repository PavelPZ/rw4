declare namespace Mui2 {

  //*********** CONSTS
  const enum Names {
    rootRule = 'root',
    Icon = 'MuiIcon-n'
  }

  //*********** RULE typing
  //available native styles
  type NativeStyle = RN.TextStyle | RN.ViewStyle | RN.ImageStyle | CSS.RNIconStyle

  //cross platform style. It contains: 
  //- commonStyle<T>: styles, common to Web and Native
  //- 'native' and 'web' props for platform specific styles
  type Rule<T extends NativeStyle> = { native?: T; web?: CSSProperties } & commonStyle<T>
  //result of transformation cross platform styles to platform specific style
  type ExpandedRule<T extends NativeStyle> = T | CSSProperties
  type expanRuleProc = <T extends NativeStyle>(source: Rule<T>) => ExpandedRule<T>

  //select native props from web CSS. E.g. commonStyle<RN.TextStyle> could be used both for native <Text> and web <span>
  type commonStyle<TNative> = TakeFrom<TNative, webUsableInNative & keyof TNative> 
  type webUsableInNative = Diff<keyof CSSProperties, 'transform'> //transform is not compatible

  //*********** RULES typing
  // for every cross platform component: basic rule definition
  type TypedRules = Record<string, NativeStyle>

  //cross platform rules definition
  type Rules<R extends TypedRules> = {[P in keyof R]: Rule<R[P]> } //rules definition type
  type RulesCreator<R extends TypedRules> = Rules<R> | ((theme: Mui.Theme) => Rules<R>) //rules definition (rules or function)
  //'classes' component attribute:
  type Classes<R extends TypedRules> = Partial<Rules<R>>

  //expanded cross platform rules to platform specific
  type ExpandedRulesWeb<R extends TypedRules> = {[P in keyof R]?: CSSProperties} //expanded for web
  type ExpandedRulesNative<R extends TypedRules> = Partial<TypedRules> //expanded for native
  type ExpandedRules<R extends TypedRules> = ExpandedRulesWeb<R> | ExpandedRulesNative<R>
  //type for expanded proc
  type expanRulesProc = <R extends TypedRules>(source: Rules<R>) => ExpandedRules<R>

  //ExpandedRules, where inline CSSProperties are converted to StyleSheet classes (for web platform only)
  type webRulesToClasses<R extends TypedRules> = {[P in keyof R]?: string} 
  type webRulesToClassesProc = <R extends TypedRules>(src: ExpandedRulesWeb<R>) => webRulesToClasses<R>

  //*************************************************
  // cross platform COMPONENTs (e.g. Icon, Header etc)
  //*************************************************

  type PropsLow<C, R extends TypedRules> = { innerRef?: React.Ref<any> } & C

  //cross platform Component, used in web and native application (created by withStyles)
  type Props<C, R extends TypedRules> = PropsLow<C, R> & { classes?: Classes<R>; style?: Rule<R[Names.rootRule]> }
  type ComponentType<C, R extends TypedRules> = React.ComponentType<Props<C, R>>
  type SFC<C, R extends TypedRules> = React.SFC<Props<C, R>>

  //Component's code (passed to withStyles)
  type toWithStyleProps<C, R extends TypedRules> = PropsLow<C, R> & { classes?: webRulesToClasses<R>; style?: ExpandedRule<R>; theme?: Mui.Theme; flip?: boolean }
  type toWithStylesComponentType<C, R extends TypedRules> = React.ComponentType<toWithStyleProps<C, R>>

  //for native
  type withStyleNative = <R extends TypedRules>(style: ExpandedRulesNative<R>, options?: Mui.WithStylesOptions) => <C>(component: toWithStylesComponentType<C, R>) => ComponentType<C, R>

  //for web: transforms after mui original withStyle 
  type withStyleWeb = <R extends TypedRules>(style: origStyleRules<keyof R>, options?: Mui.WithStylesOptions) => <C>(component: toWithStylesComponentType<C, R>) => ComponentType<C, R>
  //type beforeWithStyleMui = <C, R extends TypedRules>(component: toWithStylesComponentType<C, R>) => origWithStyleSourceComponentType<C, keyof R>
  type afterWithStyleMui = <C, R extends TypedRules>(component: origComponentType<C, keyof R>) => ComponentType<C, R>

  //*************************************************
  // mui-rewrited COMPONENTs (e.g. Button)
  //*************************************************

  //original mui typings
  type origStyleRules<ClassKey extends string = string> = Record<ClassKey, CSSProperties>;
  type origStyleRulesCallback<ClassKey extends string = string> = (theme: Mui.Theme) => origStyleRules<ClassKey>;
  interface WithStylesOptions { flip?: boolean; withTheme?: boolean; name?: string; }
  type origClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;
  interface origWithStyles<ClassKey extends string = string> { classes: origClassNameMap<ClassKey>; theme?: Mui.Theme }
  interface origStyledComponentProps<ClassKey extends string = string> { classes?: Partial<origClassNameMap<ClassKey>>; innerRef?: React.Ref<any>; style?: CSSProperties }
  type origwithStyles = <ClassKey extends string>(style: origStyleRules<ClassKey> | origStyleRulesCallback<ClassKey>, options?: WithStylesOptions) => <P>(component: origToWithStyleComponentType<P, ClassKey>) => origComponentType<P, ClassKey>
  type origToWithStyleComponentType<P, ClassKey extends string> = React.ComponentType<P & origWithStyles<ClassKey>>
  type origComponentType<P, ClassKey extends string> = React.ComponentType<P & origStyledComponentProps<ClassKey> >

  //rules modification via 'classes' attribute
  type muiClasses<R extends TypedRules, TKey extends string> = { native?: Partial<R>; web?: Partial<Record<TKey, CSSProperties>> } //MUI compatible RULES typing

  //Component, used in web and native application (after muiWithStyles HOC for Native rewrite or after muiMakeCompatible for original mui component)
  type muiProps<C, R extends TypedRules, TKey extends string> = PropsLow<C, R> & { classes?: muiClasses<R, TKey>; style?: Rule<RN.TextStyle> }
  type muiComponentType<C, R extends TypedRules, TKey extends string> = React.ComponentType<muiProps<C, R, TKey>>

  //Component's code (passed to withStyles)
  type muiToWithStyleProps<C, R extends TypedRules> = PropsLow<C, R> & { classes?: Partial<R>; style?: CSSProperties; theme: Mui.Theme }
  type muiToWithStylesComponentType<C, R extends TypedRules> = React.ComponentType<muiToWithStyleProps<C, R>>

  //native withStyle for mui rewrited components
  type muiNativeWithStyle = <R extends TypedRules, TKey extends string>(style: R, options?: Mui.WithStylesOptions) => <C>(component: muiToWithStylesComponentType<C, R>) => muiComponentType<C, R, TKey>
  //modyfying original MUI component to be compatible with Native rewrite
  type muiWithStyleWeb = <R extends TypedRules>(style: origStyleRules<keyof R>, options?: Mui.WithStylesOptions) => <C>(component: muiToWithStylesComponentType<C, R>) => ComponentType<C, R>
  //type muiBeforeWithStyleMui = <C, R extends TypedRules>(component: muiToWithStylesComponentType<C, R>) => origWithStyleSourceComponentType<C, keyof R>
  type muiBeforeWithStyleMui = <C, R extends TypedRules, TKey extends string>(component: origComponentType<C, keyof R>) => muiComponentType<C, R, TKey>

}