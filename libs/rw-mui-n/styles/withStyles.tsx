import React from 'react'
import mui_withStyles, { StyleRules, StyleRulesCallback, WithStyles, WithStylesOptions, StyledComponentProps } from 'material-ui/styles/withStyles'


type THOC<ClassKey extends string, P> = (Component: React.ComponentType<P & WithStyles<ClassKey>>) => React.Component<P & StyledComponentProps<ClassKey>>

function withStyle<ClassKey extends string>(style: StyleRules<ClassKey> | StyleRulesCallback<ClassKey>, options?: WithStylesOptions): <P>(Component: React.ComponentType<P & WithStyles<ClassKey>>) => React.Component<P & StyledComponentProps<ClassKey>> {
  const { withTheme = false, flip, name } = options
  let res: <P>(Component: React.ComponentType<P & WithStyles<ClassKey>>) => React.Component<P & StyledComponentProps<ClassKey>>
  class Styled extends React.Component<P & StyledComponentProps<ClassKey>> {
    render() {
      return null //<Component classes={ classes } {...more } {...other } ref = { innerRef } />
    }
  }
  return res
}

type Classes = 'red' | 'blue'

let styles: StyleRulesCallback<Classes>


const test: React.SFC<{ name: string } & WithStyles<Classes>> = props => null

const Test = withStyle(styles)<{ name: string }>(test)


