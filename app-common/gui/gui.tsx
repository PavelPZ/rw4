import React from 'react'

const pl = () => window.lmGlobal.platform.guiPlatform

export const Button: React.SFC<GUI.IButtonProps> = props => { const C = pl().Button; return <C {...props} /> }
export const Icon: React.SFC<GUI.IIconProps> = props => { const C = pl().Icon; return <C {...props} /> }
export const H1: React.SFC<NativeBase.H1> = props => { const C = pl().H1; return <C {...props} /> }
export const H2: React.SFC<NativeBase.H2> = props => { const C = pl().H2; return <C {...props} /> }

export * from './colors'