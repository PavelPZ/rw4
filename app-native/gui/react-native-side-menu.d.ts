declare module 'react-native-side-menu' {
  import React from 'react'
  interface SideMenuProps {
    edgeHitWidth?: number //60
    toleranceX?: number //10
    toleranceY?: number //10
    menuPosition?: 'left' | 'right' //left
    onChange?: Function
    onMove?: Function
    onSliding?: Function
    openMenuOffset?: number //deviceScreen.width * (2 / 3),
    hiddenMenuOffset?: number
    disableGestures?: Function | boolean //false
    animationFunction?: Function
    onStartShouldSetResponderCapture?: Function
    isOpen?: boolean //false
    bounceBackOnOverdraw?: boolean //true
    autoClosing?: boolean //true
    menu?: JSX.Element
  }
  export default class SideMenu extends React.Component<SideMenuProps> { }
}