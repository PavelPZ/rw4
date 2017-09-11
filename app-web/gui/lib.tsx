import React from 'react'
import { PlatformStatic } from 'react-native';

export const H1: React.SFC<{}> = props => <h1 {...props}/>
export const H2: React.SFC<{}> = props => <h2 {...props} />
export const H3: React.SFC<{}> = props => <h3 {...props} />

export const Platform: PlatformStatic = {
  OS: 'web',
  Version: 1,
  select: (obj: any) => ('web' in obj ? obj.web : {})
};

export const KeyboardHandler = onPress => (ev: React.KeyboardEvent<{}>) => { if (!onPress || ev.keyCode !== 13) return; ev.stopPropagation(); onPress(ev); }
export const MouseHandler = onPress => (ev: React.MouseEvent<{}>) => { if (!onPress) return; ev.stopPropagation(); onPress(ev); }
export const ClickHandler = (onPress: () => void, props) => {
  if (!onPress) return null
  props.onClick = MouseHandler(onPress)
  props.onKeyDown = KeyboardHandler(onPress)
}

export const colorToStyle = {
  [GUI.Colors.success]: GUI.Colors.Green,
  [GUI.Colors.primary]: GUI.Colors.Indigo,
  [GUI.Colors.danger]: GUI.Colors.Pink,
  [GUI.Colors.secondary]: GUI.Colors.Pink,
  [GUI.Colors.warning]: GUI.Colors.Orange,
  [GUI.Colors.info]: GUI.Colors.Blue,
  [GUI.Colors.default]: GUI.Colors.Brown,
  [GUI.Colors.dark]: GUI.Colors.Brown,
}

export class WaitForRendering extends React.PureComponent<{ waitFor: Promise<any>, waitChildren: React.ReactNode }> {
  state = { doRender: false }
  render() {
    if (this.state.doRender) return React.Children.only(this.props.children)
    this.props.waitFor.then(() => setTimeout(() => this.setState({ doRender: true }), 500))
    return waitChildren
  }
}
export const waitChildren = <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
  <h2>Loading...</h2>
</div>

