declare namespace Layout {
  interface ITemp {
    style?: CSSProperties
    className?: string
    props?: React.HTMLAttributes<{}>
    content?: React.ReactNode
  }
  interface IProps {
    header?: ITemp
    content?: ITemp
    drawerHeader?: ITemp
    drawerContent?: ITemp
  }
  interface ITabletProps extends IProps {
    leftExpanded?: boolean
    rightExpanded?: boolean
  }
  interface IMobileProps extends IProps {
  }
} 