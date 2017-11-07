//import React from 'react'
////import { View } from '../../../app-common/gui/gui'
//import { renderCSS } from '../../lib/fela'

////https://stackoverflow.com/questions/5195836/2-column-div-layout-right-column-with-fixed-width-left-fluid
////https://stackoverflow.com/questions/15376558/how-to-fill-100-of-remaining-height



//interface IHeaderProps {
//  left?: IHeaderItem
//  center?: IHeaderItem
//  right?: IHeaderItem
//}
//interface IHeaderItem {
//  style?: CSSProperties
//  title?: string
//  content?: (props: { key: number, style?: CSSProperties }) => JSX.Element
//  contents?: JSX.Element[]
//}

//const template = (key: number | string, styleAfter: CSSProperties, template?: Layout.ITemp, styleBefore?: CSSProperties, styleInline?: CSSProperties, className = '') => {
//  template = template || {}
//  return { key, className: (template.className || '') + ' ' + (className || '') + ' ' + renderCSS({ ...styleBefore, ...template.style, ...styleAfter }), style: styleInline, ...template.props }
//}

//const Consts = {
//  headerBackground: 'blue',
//  headerColor: 'white',
//  leftWidth: 256,
//  rightWidth: 256,
//  desMaxWidth: '1280',
//  padding: 10,
//  //https://material.io/guidelines/layout/structure.html#structure-app-bar
//  tabDeskH: 64, //tabled, desktop header height
//  mobPortH: 56, //mobile portrait header height
//  movLandH: 48, //mobile landscape header height
//}

//export const desktop = ({
//  header = { content: 'headerContent' },
//  content = { content: 'content' },
//  drawerContent = { content: 'drawerContent' }
//}: Layout.IProps) => [
//    <div {...template(11, { position: 'absolute', top: 0, left: 0, right: 0, height: Consts.tabDeskH, backgroundColor: Consts.headerBackground, zIndex: 1 }, null, null, null, 'md-paper--3') }></div>,
//    <div {...template(12, { width: '100wh', height: '100vh', marginLeft: 'auto', marginRight: 'auto', maxWidth: Consts.desMaxWidth, overflow: 'hidden', position: 'relative' }) }>
//      <div {...template(1,
//        { position: 'absolute', top: 0, left: 0, right: 0, height: Consts.tabDeskH, zIndex: 1 }, header,
//        { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10 }) }>
//        {header.content}
//      </div>
//      <div {...template(2,
//        { position: 'absolute', top: Consts.tabDeskH, left: 0, width: Consts.leftWidth, bottom: 0, overflow: 'auto' }, drawerContent,
//        { padding: 10 }) }>
//        {drawerContent.content}
//      </div>
//      <div
//        {...template(3, { position: 'absolute', top: Consts.tabDeskH, left: Consts.leftWidth, bottom: 0, right: 0, overflow: 'auto' }, content,
//          { padding: 10 }) }>
//        {content.content}
//      </div>
//    </div>
//  ] as any

////const Desktop = () => desktop({ headerContentLeft: [] })
//const Desktop = () => desktop({})

//export const tablet2 = ({
//  leftExpanded = false,
//  rightExpanded = true,
//  header = { content: 'header' },
//  content = { content: 'content' },
//  drawerHeader = { content: 'drawerHeader' },
//  drawerContent = { content: 'drawerContent' }
//}: Layout.ITabletProps) => {

//  return <div style={{ position: 'absolute', top: 0, left: leftExpanded ? 0 : -Consts.leftWidth, right: 0, bottom: 0, overflow: 'hidden', display: 'table-cell' }}>
//    <div {...template(21, { width: Consts.leftWidth, height: '100%', float: 'left', position: 'relative', zIndex: 1 }, null, null, null, 'md-paper--1') }> {/*DRAWER*/}
//      <div {...template(1, /*LEFT HEADER*/
//        { position: 'absolute', top: 0, left: 0, right: 0, height: Consts.tabDeskH - 1 }, drawerHeader,
//        { backgroundColor: '#fafafa', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: Consts.padding, paddingRight: Consts.padding }) }>
//        {drawerHeader.content}
//      </div>
//      <div {...template(2, { position: 'absolute', top: Consts.tabDeskH - 1, left: 0, right: 0, height: 1, backgroundColor: 'lightgray' }) } /> {/*LEFT DIVIDER*/}
//      <div {...template(3, /*LEFT CONTENT*/
//        { position: 'absolute', top: Consts.tabDeskH, left: 0, right: 0, bottom: 0, overflow: 'auto' }, drawerContent,
//        { backgroundColor: '#fafafa', padding: Consts.padding }) }>
//        {drawerContent.content}
//      </div>
//    </div>
//    <div {...template(2, { width: 'auto', overflow: 'hidden', float: 'none', height: '100%', position: 'relative' }) }> {/*CONTENT*/}
//      <div {...template(2, /*CONTENT & RIGHT*/
//        { display: 'table-cell', position: 'absolute', top: Consts.tabDeskH, left: 0, right: rightExpanded ? 0 : -Consts.rightWidth, bottom: 0 }, content,
//        { backgroundColor: '#fafafa' }) }>
//        <div {...template(1, { width: Consts.rightWidth, height: '100%', overflow: 'auto', float: 'right', zIndex: 1, backgroundColor: '#fafafa' }, null, null, null, 'md-paper--1') }> {/*RIGHT*/}
//          RIGHT RIGHT RIGHT RIGHT RIGHT RIGHT RIGHT RIGHT
//        </div>
//        <div style={{ width: 'auto', overflow: 'auto', height: '100%', float: 'none', backgroundColor: '#fafafa' }}> {/*CONTENT*/}
//          {content.content}
//        </div>
//      </div>
//      <div {...template(1, /*CONTENT HEADER*/
//        { position: 'absolute', top: 0, left: 0, right: 0, height: Consts.tabDeskH, zIndex: 1 }, header,
//        { backgroundColor: Consts.headerBackground, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: Consts.padding, paddingRight: Consts.padding }, null, 'md-paper--3') }>
//        {header.content}
//      </div>
//    </div>
//  </div>
//}

//export const mobile = ({
//  header = { content: 'header' },
//  content = { content: 'content' },
//  drawerHeader = { content: 'drawerHeader' },
//  drawerContent = { content: 'drawerContent' }
//}: Layout.IMobileProps) => null

//export const tablet = ({
//  leftExpanded = false,
//  rightExpanded = true,
//  header = { content: 'header' },
//  content = { content: 'content' },
//  drawerHeader = { content: 'drawerHeader' },
//  drawerContent = { content: 'drawerContent' }
//}: Layout.ITabletProps) => {

//  return <div style={{ position: 'absolute', top: 0, left: leftExpanded ? 0 : -Consts.leftWidth, right: 0, bottom: 0, overflow: 'hidden', display: 'table-cell' }}>
//    <div {...template(21, { width: Consts.leftWidth, height: '100%', float: 'left', position: 'relative', zIndex: 1 }, null, null, null, 'md-paper--1') }> {/*DRAWER*/}
//      <div {...template(1, /*LEFT HEADER*/
//        { position: 'absolute', top: 0, left: 0, right: 0, height: Consts.tabDeskH - 1 }, drawerHeader,
//        { backgroundColor: '#fafafa', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: Consts.padding, paddingRight: Consts.padding }) }>
//        {drawerHeader.content}
//      </div>
//      <div {...template(2, { position: 'absolute', top: Consts.tabDeskH - 1, left: 0, right: 0, height: 1, backgroundColor: 'lightgray' }) } /> {/*LEFT DIVIDER*/}
//      <div {...template(3, /*LEFT CONTENT*/
//        { position: 'absolute', top: Consts.tabDeskH, left: 0, right: 0, bottom: 0, overflow: 'auto' }, drawerContent,
//        { backgroundColor: '#fafafa', padding: Consts.padding }) }>
//        {drawerContent.content}
//      </div>
//    </div>
//    <div {...template(2, { width: 'auto', overflow: 'hidden', float: 'none', height: '100%' }) }> {/*CONTENT*/}
//      <div style={{ width: `calc(100% + ${rightExpanded ? 0 : Consts.rightWidth}px)`, height: '100%', backgroundColor: 'yellow', overflow: 'auto', position: 'relative' }}>
//        <div style={{ position:'absolute',  }}>
//        </div>
//        <div style={{}}>
//        </div>
//        {'START ' + new Array(200).join('asdf asd f af asd fas df ') + ' END'}
//      </div>
//    </div>
//  </div>
//}

