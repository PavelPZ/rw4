import React from 'react'
import { renderCSSs } from '../lib/fela'
import { getIcon2 } from '../../app-common/gui/ionic'
import { getColors2 } from '../../app-common/gui/colors'

export const Icon: React.SFC<GUI.IIconProps> = props => <i className={renderCSSs({ fontSize: 24, color: getColors2(props).backgroundColor }) + ' ion ion-' + getIcon2(props)} />