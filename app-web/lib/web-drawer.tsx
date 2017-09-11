import React from 'react'
import { NavigationDrawer} from '../gui/react-md'
import { Button } from '../../app-common/gui/gui'

import { providerConnector } from '../../app-common/lib/drawer'
import { renderCSS } from './fela'

const provider: React.SFC<Drawer.IStateProps & Drawer.IDispatchProps> = props => <div>
  <NavigationDrawer
    toolbarTitle={[<i key={1}>italic</i>, ' toolbarTitle']}
    toolbarActions={[<Button key={1} label='BTN1' />, <Button key={2} icon={GUI.IonicNames.search} />, <Button key={3} style={{ padding: 10 }} label='BTN3'/>]}
    //toolbarChildren={<h2 className='md-title--toolbar'>toolbarChildren toolbarChildren toolbarChildren toolbarChildren </h2>}
    drawerChildren={[<i key={1}>italic{' '}</i>, <b key={2}>drawerChildren</b>]} //drawer content
    //drawerTitle='drawerTitle' //keep back button
    //drawerHeader='drawerHeader' //replace header and BACK button
    drawerHeaderChildren={[<i key={1}>italic </i>, <b key={2}>drawerHeaderChildren</b>]} //keep back button
  >
    {React.Children.only(props.children)}
  </NavigationDrawer>

</div>

export const Provider = providerConnector(provider)