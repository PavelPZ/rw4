export const toRuleLow = (style: Mui.RuleUntyped, isNative: boolean) => {
  if (!style) return null
  const { web, native, ...rest } = style
  return { ...rest, ...(isNative ? native : web) } as Mui.PlatformRuleUntyped
}

export const toPlatformSheetLow = (rules: Mui.PartialSheet<Mui.Shape>, isNative: boolean) => {
  if (!rules) return null
  const res: Mui.PlatformSheet<Mui.Shape> = { ...(isNative ? rules.native : rules.web) }
  for (const p in rules.common) res[p] = toRuleLow(rules.common[p], isNative)
  return res
}

export const toPlatformTypographyOptionsLow = (options: Mui.TypographyOptions, isNative: boolean) => {
  if (!options) return null
  //const { fontStyle: fontStyleInit, sheet: sheetInit } = options
  //const sheet = sheetInit ? toPlatformSheetLow(sheetInit, isNative) : sheetInit
  //if (fontStyleInit) {
  //  const { web, native, ...rest } = fontStyleInit
  //  return { ...rest, ...(isNative ? native : web), ...sheet } as Mui.PlatformTypographyOptions
  //}
  //return { ...sheet } as Mui.PlatformTypographyOptions
  return {}
}