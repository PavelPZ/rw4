import React from 'react';
import { Divider, BottomNavigation, Toolbar, Button, ButtonProps, FontIcon } from 'react-md'
import { View, } from '../../app-common/gui/gui'
import { colorToStyle } from '../gui/lib'
import { getColors, getTextColor } from '../../app-common/gui/colors'
import { getIcon2 } from '../../app-common/gui/ionic'
import { renderCSS } from '../lib/fela'

const app: React.SFC<any> = props => <View style={[absoluteStretch, { flexDirection: 'row' }]}>
  <View key={1} style={{ width: 256, zIndex: 1 }} web={{ className: 'md-paper--1' }}>
    <Toolbar
      nav={<Button icon>menu</Button>}
      //title="Colored"
      titleMenu={<span>Colored</span>}
      actions={[
        <Button icon key={1}>menu</Button>,
      ]}
    />
    <Divider style={{ marginTop: -1 }} />
    <View style={{ flex: 1, padding: 8 }} webStyle={{ overflow: 'auto' }}>
      {lorem}
    </View>
  </View>
  <View key={1} style={{ flex: 1 }} >
    <Toolbar
      primary
      nav={<Button icon>menu</Button>}
      title="Colored"
      zDepth={2}
      actions={[
        <Button key={1} flat>C</Button>,
        <Button icon key={2}>menu</Button>,
        <Button icon key={3}>menu</Button>
      ]}
    />
    <div style={{ flex: 1, overflow: 'auto', padding: 8 }}>
      <Button2>none</Button2><br />
      <Button2 primary>primary</Button2><br />
      <Button2 dark>dark</Button2><br />
      <Button2 color={GUI.Colors.Cyan} shadow={GUI.Shadows.S200}>color shadow</Button2><br />
      <Button2 success>success</Button2><br />
      <Button2 flat info>flat info</Button2><br />
      <Button2 flat danger iconName={GUI.IonicIcons.bookmark}>flat warning iconName</Button2><br />
      <Button2 flat warning iconAfter iconName={GUI.IonicIcons.archive}>flat warning iconAfter iconName</Button2><br />
      <Button2 floating color={GUI.Colors.Cyan} iconName={GUI.IonicIcons.archive}>asdfasd</Button2><br />
      <Button2 floating danger iconName={GUI.IonicIcons.attach}>asdfasd</Button2><br />
      <Button2 icon iconName={GUI.IonicIcons.close} primary>asdfasd</Button2><br />
      <Button2 icon iconName={GUI.IonicIcons.clock} primary swapped></Button2><br />
      <Button2 icon danger iconName={GUI.IonicIcons.clock} ></Button2><br />
      <Button2 icon danger swapped iconName={GUI.IonicIcons.logoFacebook} ></Button2><br />
      <Button2 icon swapped color={GUI.Colors.Cyan} shadow={GUI.Shadows.S200} iconName={GUI.IonicIcons.logoGoogle} ></Button2><br />
      {/*}
      */}
    </div>
    <BottomNavigation style={{ position: 'static', marginLeft: 1, boxShadow: 0 }} links={[{
      label: 'Recent',
      icon: <FontIcon>access_time</FontIcon>,
    }, {
      label: 'Favorites',
      icon: <FontIcon>favorite</FontIcon>,
    }, {
      label: 'Nearby',
      icon: <FontIcon>place</FontIcon>,
    }]} onNavChange={() => { }} />
  </View>
</View>

export default app

const lorem = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => ['adsf asd fasd f asd fasd f asdf asd fas df asdf asdf ', <br />])

const absoluteStretch = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as ReactNative.ViewStyle

const Button2: React.SFC<GUI.IButtonProps2> = props => {
  const { light, iconAfter, iconName, dark, success, info, warning, danger, children, swapped, color, shadow, ...rest } = props
  const { flat, floating, icon, raised } = props
  //color
  let colorPair = getColors(color, shadow) || getColors(success && colorToStyle[GUI.Colors.success] || info && colorToStyle[GUI.Colors.info] || dark && colorToStyle[GUI.Colors.dark] || info && colorToStyle[GUI.Colors.info] || warning && colorToStyle[GUI.Colors.warning] || danger && colorToStyle[GUI.Colors.danger])
  if (colorPair && !swapped && (flat || icon)) colorPair = { backgroundColor: 'transparent', color: colorPair.backgroundColor }
  //icon
  let iconClassName = getIcon2(iconName, 'android')
  if (iconClassName) iconClassName = renderCSS({ fontSize: 24 }) + ' icon ion-' + iconClassName

  const mdProps: ButtonProps = { ...props, swapTheming: swapped, iconBefore: !iconAfter, iconClassName, raised: !flat && !floating && !icon, style: { ...colorPair, paddingTop: floating ? 10 : (icon ? 6 : undefined) } }
  return <Button {...mdProps}>{!floating && !icon && children}</Button>
}