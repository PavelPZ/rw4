import React from 'react'
import { View } from '../../app-common/gui/gui'

//https://stackoverflow.com/questions/5195836/2-column-div-layout-right-column-with-fixed-width-left-fluid
//https://stackoverflow.com/questions/15376558/how-to-fill-100-of-remaining-height



interface IHeaderProps {
  left?: IHeaderItem
  center?: IHeaderItem
  right?: IHeaderItem
}
interface IHeaderItem {
  style?: CSSProperties
  title?: string
  content?: (props: { key: number, style?: CSSProperties }) => JSX.Element
  contents?: JSX.Element[]
}

const headerTemplate = ({ left, center, right }: IHeaderProps) => [
]


interface IProps {
  headerStyle?: CSSProperties
  headerProps?: React.HTMLAttributes<{}>
  header?: React.ReactNode

  contentStyle?: CSSProperties
  contentProps?: React.HTMLAttributes<{}>
  content?: React.ReactNode

  drawerHeaderStyle?: CSSProperties
  drawerHeaderProps?: React.HTMLAttributes<{}>
  drawerHeader?: React.ReactNode

  drawerContentStyle?: CSSProperties
  drawerContentProps?: React.HTMLAttributes<{}>
  drawerContent?: React.ReactNode
}

const consts = {
  headerBackground: 'blue',
  headerColor: 'white',
  headerHeight: 50,
  drawerWidth: 256,
  dtMaxWidth: '1280',
  padding:10
}

const headerText = (title: string, key: number, style?: CSSProperties) => <div key={key} style={{ color: consts.headerColor, ...style }}>{title}</div>

const desktop = ({
  headerStyle = { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10 },
  header = 'headerContent',
  drawerContentStyle = { padding: 10 },
  drawerContent = 'drawerContent',
  contentStyle = { padding: 10 },
  headerProps,
  drawerContentProps,
  contentProps,
  content = 'content' }: IProps) => [
    <div key={1} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: consts.headerHeight, backgroundColor: consts.headerBackground, zIndex: -1 }}></div>,
    <div key={2} style={{ width: '100wh', height: '100vh', marginLeft: 'auto', marginRight: 'auto', maxWidth: consts.dtMaxWidth, overflow: 'hidden', position: 'relative' }}>
      <div key={1} {...headerProps} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: consts.headerHeight, backgroundColor: consts.headerBackground, ...headerStyle }}>
        {header}
      </div>
      <div key={2} {...drawerContentProps} style={{ position: 'absolute', top: consts.headerHeight, left: 0, width: consts.drawerWidth, bottom: 0, ...drawerContentStyle }}>
        {drawerContent}
      </div>
      <div key={3} {...contentProps} style={{ position: 'absolute', top: consts.headerHeight, left: consts.drawerWidth, bottom: 0, right: 0, ...contentStyle }}>
        {content}
      </div>
    </div>
  ] as any

//const Desktop = () => desktop({ headerContentLeft: [] })
const Desktop = desktop

interface ITabletProps extends IProps {
  left: number
}

const Tablet = ({
  left = 0,

  drawerHeader = 'drawerHeader',
  drawerHeaderStyle,
  drawerHeaderProps,

  drawerContentStyle,
  drawerContent = 'drawerContent',
  drawerContentProps,

  headerStyle,
  header = 'header',
  headerProps,

  contentStyle,
  contentProps,
  content = 'content' }: ITabletProps) => <div style={{ position: 'absolute', top: 0, left, right: 0, bottom: 0, overflow: 'hidden' }}>
    <div key={1} className='md-paper--1' style={{ width: consts.drawerWidth, height: '100vh', float: 'left', position: 'relative' }}>
      <div key={1} {...drawerHeaderProps} style={{ height: consts.headerHeight - 1, backgroundColor: '#fafafa', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: consts.padding, paddingRight: consts.padding, ...drawerHeaderStyle, position: 'absolute', top: 0, left: 0, right: 0 }}>
        {drawerHeader}
      </div>
      <div style={{ position: 'absolute', top: consts.headerHeight - 1, left: 0, right: 0, height: 1, backgroundColor: 'lightgray'}} />
      <div key={2} {...drawerContentProps} style={{ backgroundColor: '#fafafa', top: consts.headerHeight, padding: consts.padding, ...drawerContentStyle, position: 'absolute', left: 0, right: 0, bottom: 0,  }}>
        {drawerContent}
      </div>
    </div>
    <div key={2} style={{ width: 'auto', overflow: 'hidden', float: 'none', height: '100vh', position: 'relative' }}>
      <div key={1} className='md-paper--3' {...headerProps} style={{ height: consts.headerHeight, backgroundColor: consts.headerBackground, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: consts.padding, paddingRight: consts.padding, ...headerStyle, position: 'absolute', top: 0, left: 0, right: 0 }}>
        {header}
      </div>
      <div key={2} {...contentProps} style={{ backgroundColor: '#fafafa', padding: consts.padding, ...contentStyle, position: 'absolute', top: consts.headerHeight, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
        {content}
      </div>
    </div>
  </div>

export default Tablet
//export default Desktop
