import React from 'react'

const pl = () => window.lmGlobal.platform.guiPlatform

export const Button: React.SFC<GUI.IButtonProps> = props => React.createElement(pl().Button, props)
export const Icon: React.SFC<GUI.IIconProps> = props => React.createElement(pl().Icon, props)
export const H1 = props => React.createElement(pl().H1, props)
export const H2 = props => React.createElement(pl().H2, props)

export * from './colors'

