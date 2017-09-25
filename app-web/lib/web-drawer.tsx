import React from 'react'

import { Toolbar, Button, MenuButton, Drawer as MDDrawer, DrawerPosition, DrawerType } from '../gui/react-md'

import { providerConnector } from '../../app-common/lib/drawer'
import { renderCSS } from './fela'

const drawer: React.SFC<Drawer.IProps & Drawer.IOwnProps> = props =>{
  const {children, headerDesktop, navItems, headerLeft, showDrawer, drawerVisible, windowSize} = props
  const type: DrawerType = windowSize == Media.TWindowSize.mobile ? 'temporary' : (windowSize == Media.TWindowSize.tablet ? 'persistent' : 'full-height')
  const headerComp = windowSize != Media.TWindowSize.tablet ? headerDesktop : <Toolbar colored style={{backgroundColor:'black'}}  className="md-divider-border md-divider-border--bottom" 
    actions={<Button icon onClick={() => showDrawer(false)}>arrow_back</Button>} 
    nav={headerLeft}/>
  //let oldSetState
  showDrawer(drawerVisible)
  return <MDDrawer
          type={type}
          visible={drawerVisible}
          position={'left'}
          onVisibilityChange={visible => showDrawer(visible)}
          navItems={navItems}
          header={headerComp}
          onMediaTypeChange={() => {}}
          //ref={dr => {
          //  if (!oldSetState) {
          //    oldSetState = dr.setState
          //    //debugger
          //    //dr['setState'] = (function (st, callback) { debugger; oldSetState (st,callback)}).bind(dr)
          //    dr['setState'] = (st, callback) => { return oldSetState.apply (dr,st,callback)}
          //  }
          //}}
        />
  }

export const Drawer = providerConnector(drawer)

