import React from 'react'
import { rt } from "../../app-web/fela";

interface ILSProps extends React.Attributes { id: string }
const LS: React.SFC<ILSProps> = props => {
  return React.Children.only(props.children)
}

//const ce = (React as any).createElement;

//(React as any).createElement = (a, b, c) => {
//  return ce(a, b, c)
//}

const ToLoc = () => {
  return <LS id='ls1'><div>Ahoj, <a href='#'>jak se</a> máš?</div></LS>
}

const Localizator = () => <ToLoc/>

export default Localizator