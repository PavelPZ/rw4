import React from 'react';
import { Divider, BottomNavigation, Toolbar, FontIcon, Button as MDButton } from 'react-md'
import { navigateUrl, navigatePush } from '../../app-common/lib/router'
import { Text, View, Button } from '../../app-common/gui/gui'
import { colorToStyle } from '../../app-common/gui/gui'
import { getColors } from '../../app-common/gui/colors'
import { getIcon2 } from '../../app-common/gui/ionic'
import { renderCSS } from '../lib/fela'
import { providerConnector } from '../../app-common/gui/drawer'

const showDrawerButton: React.SFC<any> = props => {
  const { drawerVisible, windowSize } = props; return !drawerVisible && (windowSize == Media.TWindowSize.tablet || windowSize == Media.TWindowSize.mobile) && <MDButton icon onClick={() => props.showDrawer(true)} className='md-btn--toolbar md-toolbar--action-left'>menu</MDButton>
}
let ShowDrawerButton
const hideDrawerButton: React.SFC<any> = props => {
  const { drawerVisible, windowSize } = props; return drawerVisible && (windowSize == Media.TWindowSize.tablet || windowSize == Media.TWindowSize.mobile) && <MDButton icon onClick={() => props.showDrawer(false)} className='md-btn--toolbar'>close</MDButton>
}
let HideDrawerButton


export class Content extends React.Component<Drawer.IContent> {

  shouldComponentUpdate(nextProps: Drawer.IContent) { return false }

  render() {
    const { header, content, node, style, key, ...rest } = this.props
    if (node) return React.cloneElement(node, { ...node.props, key: key })
    return <View key={key} style={[{ flex: 1 }, style]} >
      {contentHeader({ ...header, ...rest, key:10 })}
      {contentContent({ ...content, ...rest, key:20, style: { flex: 1 } })}
    </View>
  }
}

export const contentHeader = (props: Drawer.IContentHeader) => {
  const { left, title, right, style, node, ...rest } = props
  if (node) return React.cloneElement(node, { ...node.props, key: 10 })
  if (!ShowDrawerButton) ShowDrawerButton = providerConnector(showDrawerButton)
  return <Toolbar key={10} colored zDepth={2}
    nav={left || <ShowDrawerButton {...props}/>}
    title={title}
    actions={right}
  />
}

export const contentContent = (props: Drawer.IContentContent) => {
  const { style, node, items, ...rest } = props
  if (node) return React.cloneElement(node, { ...node.props, key: 20 })
  return <View key={20} style={{ flex: 1, padding: 8, ...style }} webStyle={{ overflow: 'auto' }}>
    {items(rest)}
  </View>
}

export class Menu extends React.Component<Drawer.IMenu> {

  shouldComponentUpdate(nextProps) { return false }

  render() {
    const { header, content, node, style, ...rest } = this.props
    if (node) return node({}) //React.cloneElement(node, { ...node.props, key: 10 })
    return <View key={10} style={[{ zIndex: 1, backgroundColor: 'white' }, style]} web={{ className: 'md-paper--1' }}>
      {menuHeader({ ...rest, ...header })}
      <Divider key={20} style={{ marginTop: -1 }} />
      {menuContent({ ...content, ...rest })}
    </View>
  }
}

const menuHeader = (props: Drawer.IMenuHeader) => {
  const { node, left, title, right, ...rest } = props
  if (node) return React.cloneElement(node, { ...node.props, key: 10 })
  const { windowSize, drawerVisible } = props
  if (!HideDrawerButton) HideDrawerButton = providerConnector(hideDrawerButton)
  return <Toolbar key={10}
    nav={left}
    title={title}
    actions={right || <HideDrawerButton {...props} />}
  />
}

const menuContent = (props: Drawer.IMenuContent) => {
  const { node, items, style, ...rest } = props
  if (node) return React.cloneElement(node, { ...node.props, key: 30 })
  return <View key={30} style={[{ flex: 1, padding: 8 }, style]} webStyle={{ overflow: 'auto' }}>
    {items(rest)}
  </View>
}

const app: React.SFC<any> = p => {

  const props3: Drawer.IOwnProps = {
    menu: {
      header: {
        left: <MDButton icon>menu</MDButton>,
        title: 'MENU',
        right: [<MDButton icon key={1}>menu</MDButton>]
      },
      content: {
        items: props => lorem
      }
    },
    content: {
      header: {
        left: <MDButton icon>menu</MDButton>,
        title: 'Colored',
        right: [<MDButton key={1} flat>C</MDButton>, <MDButton icon key={2}>menu</MDButton>, <MDButton icon key={3}>menu</MDButton>]
      },
      content: {
        items: props => lorem
      }
    }
  }


  const props2: Drawer.IOwnProps = {
    menu: {
      header: {
        node: <Toolbar key={1}
          nav={<MDButton icon>menu</MDButton>}
          title="MENU"
          //titleMenu={<span>Colored</span>}
          actions={[
            <MDButton icon key={1}>menu</MDButton>,
          ]}
        />
      },
      content: {
        items: props => lorem
      }
    },
    content: {
      header: {
        node: <Toolbar key={3}
          nav={<MDButton icon>menu</MDButton>}
          title="Colored"
          colored
          zDepth={2}
          actions={[
            <MDButton key={1} flat>C</MDButton>,
            <MDButton icon key={2}>menu</MDButton>,
            <MDButton icon key={3}>menu</MDButton>
          ]}
        />
      },
      content: {
        items: props => lorem
      }
    }
  }

  //const props1: Drawer.IOwnProps = {
  //  menu: {
  //    node: <View key={1} style={{ width: 256, zIndex: 1 }} web={{ className: 'md-paper--1' }}>
  //      <Toolbar key={1}
  //        nav={<MDButton icon>menu</MDButton>}
  //        title="MENU"
  //        //titleMenu={<span>Colored</span>}
  //        actions={[
  //          <MDButton icon key={1}>menu</MDButton>,
  //        ]}
  //      />
  //      <Divider key={2} style={{ marginTop: -1 }} />
  //      <View key={3} style={{ flex: 1, padding: 8 }} webStyle={{ overflow: 'auto' }}>
  //        {lorem}
  //      </View>
  //    </View>
  //  },
  //  content: {
  //    node: <View key={2} style={{ flex: 1 }} >
  //      <Toolbar key={3}
  //        nav={<MDButton icon>menu</MDButton>}
  //        title="Colored"
  //        colored
  //        zDepth={2}
  //        actions={[
  //          <MDButton key={1} flat>C</MDButton>,
  //          <MDButton icon key={2}>menu</MDButton>,
  //          <MDButton icon key={3}>menu</MDButton>
  //        ]}
  //      />
  //      <View key={4} webStyle={{ overflow: 'auto', }} style={{ flex: 1, padding: 8, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
  //        {lorem}
  //      </View>
  //      <BottomNavigation key={5} style={{ position: 'static', marginLeft: 1, boxShadow: 0 }} links={[{
  //        label: 'Recent',
  //        icon: <FontIcon>access_time</FontIcon>,
  //      }, {
  //        label: 'Favorites',
  //        icon: <FontIcon>favorite</FontIcon>,
  //      }, {
  //        label: 'Nearby',
  //        icon: <FontIcon>place</FontIcon>,
  //      }]} onNavChange={() => { }} />
  //    </View>
  //  }
  //}
  const { menu: m, content: c, ...rest } = props3
  return <View style={[absoluteStretch, { flexDirection: 'row' }]}>
    <Menu { ...m} { ...rest } />
    <Content { ...c} {...rest } />
  </View>
}

export default app

const lorem = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => 'adsf asd fasd f asd fasd f asdf asd fas df asdf asdf ')

const absoluteStretch = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as ReactNative.ViewStyle
