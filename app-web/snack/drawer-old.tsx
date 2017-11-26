import React from 'react'
//import { Button, NavigationDrawer, NavigationDrawerProps, DrawerProps, DrawerPositions, MediaTypes, DrawerTypes, MobileDrawerTypes, DrawerTypesType } from '../lib/react-md'
import { Toolbar, Button, NavigationDrawer, NavigationDrawerProps, MenuButton, Drawer, DrawerPosition } from '../gui/react-md'

import { ruleToClassNames as renderCSS } from 'rw-mui-w/styles/fela'

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

export default class SimpleDrawer extends React.PureComponent {
  state = { visible: false, position: 'left' as DrawerPosition };

  openDrawerLeft = () => {
    this.setState({ visible: true, position: 'left' });
  };

  openDrawerRight = () => {
    this.setState({ visible: true, position: 'right' });
  };

  closeDrawer = () => {
    this.setState({ visible: false });
  };

  handleVisibility = (visible) => {
    this.setState({ visible });
  };

  render() {
    const { visible, position } = this.state;
    const isLeft = position === 'left';

    const closeBtn = <Button icon onClick={this.closeDrawer}>{isLeft ? 'arrow_back' : 'close'}</Button>;
    return (
      <div>
        <Drawer key={0}
          type={'temporary'}
          visible={visible}
          position={this.state.position}
          onVisibilityChange={this.handleVisibility}
          navItems={[<h2 key={0}>DRAWER</h2>]}
          header={<Toolbar colored style={{backgroundColor:'black'}} nav={isLeft ? null : closeBtn} actions={isLeft ? closeBtn : null} className="md-divider-border md-divider-border--bottom" />}
        />
        <Toolbar key={1} colored style={{backgroundColor:'black'}} nav={<Button icon onClick={this.openDrawerLeft}>close</Button>} className="md-divider-border md-divider-border--bottom" />
        <h1 key={2}>CONTENT</h1>
        <Button key={3} raised onClick={this.openDrawerRight}>
          Open Drawer Right
        </Button>
      </div>
    );
  }
}


const Content: React.SFC<any> = props => <h3>CONTENT</h3>




