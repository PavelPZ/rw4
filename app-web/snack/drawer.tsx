import React from 'react'
//import { Button, NavigationDrawer, NavigationDrawerProps, DrawerProps, DrawerPositions, MediaTypes, DrawerTypes, MobileDrawerTypes, DrawerTypesType } from '../lib/react-md'
import { Button, NavigationDrawer, NavigationDrawerProps } from '../gui/react-md'

import { renderCSS } from '../lib/fela'

//const mobile: DrawerProps = {
  //overlay: true,
  //type: 'temporary',
//}

const App: React.SFC<{}> = props => <div>
  <NavigationDrawer
    toolbarTitle={[<i>italic</i>, ' toolbarTitle']}
    toolbarActions={[<Button style={{ padding: 10 }}>BTN2</Button>, <Button icon>search</Button>, <Button style={{ padding: 10 }}>BTN3</Button>]}
    //toolbarChildren={<h2 className='md-title--toolbar'>toolbarChildren toolbarChildren toolbarChildren toolbarChildren </h2>}
    drawerChildren={[<i>italic{' '}</i>, <b>drawerChildren</b>]} //drawer content
    //drawerTitle='drawerTitle' //keep back button
    //drawerHeader='drawerHeader' //replace header and BACK button
    drawerHeaderChildren={[<i>italic </i>, <b>drawerHeaderChildren</b>]} //keep back button
  >
    <Content/> 
  </NavigationDrawer>
</div>

const Content: React.SFC<any> = props => <h3>CONTENT</h3>

export default App


