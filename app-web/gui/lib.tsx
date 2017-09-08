﻿import React from 'react'
import { PlatformStatic } from 'react-native';

export const H1: React.SFC<{}> = props => <h1 {...props}/>
export const H2: React.SFC<{}> = props => <h2 {...props} />
export const H3: React.SFC<{}> = props => <h3 {...props} />

export const Platform: PlatformStatic = {
  OS: 'web',
  Version: 1,
  select: (obj: any) => ('web' in obj ? obj.web : {})
};

export const KeyboardHandler = onPress => (ev: React.KeyboardEvent<{}>) => { if (!onPress || ev.keyCode !== 13) return; ev.stopPropagation(); onPress(ev); }
export const MouseHandler = onPress => (ev: React.MouseEvent<{}>) => { if (!onPress) return; ev.stopPropagation(); onPress(ev); }
export const ClickHandler = (onPress: () => void, props) => {
  if (!onPress) return null
  props.onClick = MouseHandler(onPress)
  props.onKeyDown = KeyboardHandler(onPress)
}

export const colorToStyle = {}