import React from 'react'
import { Button, NavigationDrawer, NavigationDrawerProps, DrawerProps, DrawerPositions, MediaTypes, DrawerTypes, MobileDrawerTypes, DrawerTypesType } from '../react-md'

const mobile: DrawerProps = {
  //overlay: true,
  //type: 'temporary',
}

class App extends React.PureComponent {
  render() {
    return <div>
      <NavigationDrawer
        drawerTitle='Header'
        toolbarTitle='RE-WISE'
        toolbarActions={[<Button key="search" icon>search</Button>, <Button key="search2" icon>search 2</Button>]}
        footer={<h4 style={{ textAlign:'center' }}>FOOTER</h4>}
      >
        <div>
          <h3>DRAWER</h3>
        </div>
      </NavigationDrawer>
    </div>
  }
}

//visible = { this.state.visible } onVisibilityChange= {() => this.setState({ visible: this.state.visible })}
export default App


