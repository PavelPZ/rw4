import React from 'react'
//import { Button, NavigationDrawer, NavigationDrawerProps, DrawerProps, DrawerPositions, MediaTypes, DrawerTypes, MobileDrawerTypes, DrawerTypesType } from '../lib/react-md'
import { Button, NavigationDrawer, NavigationDrawerProps } from '../lib/react-md'

import { renderCSS } from '../lib/fela'

//const mobile: DrawerProps = {
  //overlay: true,
  //type: 'temporary',
//}

const App: React.SFC<{}> = props => <div>
  {/*}
  <NavigationDrawer
    drawerTitle='Header'
    navClassName={renderCSS({ margin: 10 })}
    navItems={[
      <h3>h3 Element</h3>,
      { subheader: true, primaryText: <i>Italic subheader</i>, key: 0, },
      { primaryText: 'item 11', secondaryText: 'sub item', threeLines: false, key: 11, },
      { primaryText: 'item 2', key: 2,  inset:true,},
      { primaryText: 'item 3' , key: 3, },
      {
        primaryText: 'select:',
        nestedItems: [
          { primaryText: <u>underline</u>, onClick:() => alert('click'), key:0 },
          {
            primaryText: 'select:',
            nestedItems: [
              { primaryText: <u>underline asdf sd fasd f adsf ads</u>, onClick: () => alert('click'), key: 0 },
            ]
          },
        ]
      },
      { divider: true },
      <h4>h4 Element</h4>,
    ]}
    toolbarTitle='RE-WISE'
    toolbarActions={[<Button key="search" icon>search</Button>, <Button key="search2" icon>search 2</Button>]}
    footer={<h4 style={{ textAlign: 'center' }}>FOOTER</h4>}
  >*/}
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

const Content: React.SFC<any> = props => {
  //debugger
  return <h3>CONTENT</h3>
}

//visible = { this.state.visible } onVisibilityChange= {() => this.setState({ visible: this.state.visible })}
export default App


