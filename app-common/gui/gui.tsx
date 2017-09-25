import React from 'react'

const pl = () => window.lmGlobal.platform.guiPlatform

export const Button: React.SFC<GUI.IButtonProps> = props => { const C = pl().Button; return <C {...props} /> }
export const Icon: React.SFC<GUI.IIconProps> = props => { const C = pl().Icon; return <C {...props} /> }
export const H1: React.SFC<NativeBase.H1> = props => { const C = pl().H1; return <C {...props} /> }
export const H2: React.SFC<NativeBase.H2> = props => { const C = pl().H2; return <C {...props} /> }
export const View: React.SFC<ReactNative.ViewProperties> = props => { const C = pl().View; return <C {...props} /> }
export const Text: React.SFC<ReactNative.TextProperties> = props => { const C = pl().Text; return <C {...props} /> }
export const Platform = () => pl().Platform

export const Container: React.SFC<ReactNative.ViewProperties & {ref?}> = props => { const C = pl().Container; return <C {...props} /> }
export const Content: React.SFC<ReactNative.ViewProperties> = props => { const C = pl().Content; return <C {...props} /> }
export const Header: React.SFC<ReactNative.ViewProperties> = props => { const C = pl().Header; return <C {...props} /> }
export const Footer: React.SFC<ReactNative.ViewProperties> = props => { const C = pl().Footer; return <C {...props} /> }
export const Page: React.SFC<Router.IPageProps> = props => { const C = pl().Page; return <C {...props} /> }

//export * from './colors'

//export const footerConnector = connect<GUI.IPageFooterState, {}, GUI.IPageFooterOwnProps>((state: IState) => state.gui.footer)

//export const pageReducer = (state: IState, action: App.Action) => {

//}