import React from 'react'
import { renderCSSs } from '../lib/fela'
import { getIcon } from '../../app-common/gui/ionic'

export const Icon: React.SFC<GUI.IIconProps> = props => <i className={renderCSSs({ fontSize: 24 }, props.style) + ' icon ion-' + getIcon(props.name, props.logoId, props.OS, props.active)} />