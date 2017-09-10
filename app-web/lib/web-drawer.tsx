import React from 'react'
import { NavigationDrawer, Button } from '../lib/react-md'

import { providerConnector } from '../../app-common/lib/drawer'
import { renderCSS } from './fela'

const provider: React.SFC<Drawer.IStateProps & Drawer.IDispatchProps> = props => <div>
  <NavigationDrawer
    toolbarTitle={[<i>italic</i>, ' toolbarTitle']}
    toolbarActions={[<Button key={1} style={{ padding: 10 }}>BTN2</Button>, <Button key={2} icon>search</Button>, <Button key={3} style={{ padding: 10 }}>BTN3</Button>]}
    //toolbarChildren={<h2 className='md-title--toolbar'>toolbarChildren toolbarChildren toolbarChildren toolbarChildren </h2>}
    drawerChildren={[<i>italic{' '}</i>, <b>drawerChildren</b>]} //drawer content
    //drawerTitle='drawerTitle' //keep back button
    //drawerHeader='drawerHeader' //replace header and BACK button
    drawerHeaderChildren={[<i>italic </i>, <b>drawerHeaderChildren</b>]} //keep back button
  >
    {React.Children.only(props.children)}
  </NavigationDrawer>

</div>

export const Provider = providerConnector(provider)