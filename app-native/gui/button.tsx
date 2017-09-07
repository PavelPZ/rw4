import React from 'react'
import { Text, Button as NBButton, Fab as NBFab, StyleProvider, getTheme, Icon } from 'native-base'
import { View, Platform, Dimensions, PixelRatio } from 'react-native'

import { getIcon } from '../../app-common/gui/ionic'
import { getColor, getTextColor } from '../../app-common/gui/colors'

//import { Icon } from './icon'
//import getTheme from '../../native-base-theme/components/index'
//import material from '../../native-base-theme/variables/material'

const customTheme = getTheme()

customTheme['NativeBase.Button']['.rounded'] = {
  width: 45,
  justifyContent: 'center',
  paddingHorizontal: 0,
  borderRadius: 45, //material.borderRadiusLarge,
  '.large': {
    width: 60,
  },
  '.small': {
    width: 30,
  }
}

const fixPositions = {
  'tr': 'topRight',
  'tl': 'topLeft',
  'br': 'bottomRight',
  'bl': 'bottomLeft',
}

export const Button: React.SFC<GUI.IButtonProps> = props => {
  const { mode = GUI.ButtonMode.raised, iconName, iconLogo, color = GUI.Colors.primary, shadow, label, iconRight, disabled, iconOS, iconActive } = props
  const fixed = 'fixed'
  const fixPosition = mode.startsWith(fixed) ? mode.substr(fixed.length).toLowerCase() : null
  const actMode = (iconName || iconLogo) && !fixPosition && typeof label == 'undefined' ? GUI.ButtonMode.icon : mode
  const isTransparent = actMode == GUI.ButtonMode.flat || actMode == GUI.ButtonMode.icon
  const hasIcon = iconName || iconLogo

  //colors
  //const btnProps: NativeBase.Button = {}
  //const btnStyle = {} as any
  //const colorStyle = {} as any
  //if (color == GUI.Colors.primary) btnProps.primary = true
  //else if (color == GUI.Colors.secondary) btnProps.danger = true
  //else if (color == GUI.Colors.default) btnProps.dark = true
  //else {
  //  if (isTransparent) {
  //    colorStyle.color = getColor(color, shadow)
  //  } else {
  //    btnStyle.backgroundColor = getColor(color, shadow)
  //    colorStyle.color = getTextColor(color, shadow)
  //  }
  //}

  const IC = hasIcon && <Icon key={1} name={getIcon(iconName, iconLogo, iconOS, iconActive)} active={iconActive} />
  //const IC = <Icon name='home' />
  const TXT = !!label && <Text key={2} >{label}</Text>

  if (fixPosition) {

    return <NBFab position={fixPositions[fixPosition] as any} >
      {IC}
    </NBFab>
  }

  let comps = iconRight ? [TXT, IC] : [IC, TXT]

  //if (actMode == GUI.ButtonMode.rounded) return <StyleProvider style={customTheme} >
  //  <NBButton rounded {...{xxx:true} as any}>
  //    {IC}
  //  </NBButton>
  //</StyleProvider>

  //<NBButton transparent iconLeft={!iconRight} iconRight={iconRight} {...{ xxx: true } as any}>
  //  {comps}
  //</NBButton>

  const customTheme2 = getTheme()

  customTheme2['NativeBase.Button']['.xxx'] = {
    "NativeBase.Text": {
      color: "pink"
    },
    "NativeBase.Icon": {
      color: "pink"
    },
    "NativeBase.IconNB": {
      color: "pink"
    },
    backgroundColor: 'red'
  }

  const customTheme3 = getTheme()
  customTheme3['NativeBase.Button']['.yyy'] = {
    '.transparent': {
      "NativeBase.Text": {
        color: "green"
      },
      "NativeBase.Icon": {
        color: "maroon"
      },
      "NativeBase.IconNB": {
        color: "maroon"
      },
      backgroundColor: null
    }
  }

  return <View>
    <StyleProvider style={customTheme} >
      <NBButton rounded {...{ xxx: true } as any}>
        <Icon key={1} name={getIcon(iconName, iconLogo, iconOS, iconActive)} />
      </NBButton>
    </StyleProvider>
    <StyleProvider style={customTheme3} >
      <NBButton iconLeft transparent {...{ yyy: true } as any}>
        <Icon key={1} name={getIcon(iconName, iconLogo, iconOS, iconActive)} />
        <Text key={2} >LABEL1</Text>
      </NBButton>
    </StyleProvider>
    <StyleProvider style={customTheme2} >
      <NBButton {...{ xxx: true } as any}>
        <Icon key={1} name={getIcon(iconName, iconLogo, iconOS, iconActive)} />
        <Text key={2} >LABEL2</Text>
      </NBButton>
    </StyleProvider >
  </View >
}


