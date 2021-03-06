﻿import React from 'react'
import { rulesToClassNames as renderCSSs } from 'reactx-mui/web/styles/fela'
import { getIcon2 } from '../../app-common/gui/ionic'
import { getColors2 } from '../../app-common/gui/colors'

export const Icon: React.SFC<GUI.IIconProps> = props => <i className={renderCSSs({ fontSize: 24, color: getColors2(props).backgroundColor }) + ' ion ion-' + getIcon2(props)} />

export const H1: React.SFC<TextProperties> = props => <h1 {...props as any} />
export const H2: React.SFC<TextProperties> = props => <h2 {...props as any} />
export const H3: React.SFC<TextProperties> = props => <h3 {...props as any} />
export const H4: React.SFC<TextProperties> = props => <h4 {...props as any} />

