import ctNative from 'material-ui/styles/createTypography'
import shadows_w from 'material-ui/styles/shadows'
import { emptyTypography, emptyShadowsNative } from 'reactx-mui/common/styles/empties'

export const createTypographyWeb = ctNative
export const createTypographyNative = (palette, options) => emptyTypography //as Mui.native.TypographyOptionsCreator
export const shadowsNative = emptyShadowsNative
export const shadowsWeb = shadows_w
