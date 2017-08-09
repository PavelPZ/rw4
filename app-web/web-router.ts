//import createHistory from 'history/createBrowserHistory'
//import qs from 'qs'
//import UrlPattern from 'url-pattern'

//var patterns = [
//  new UrlPattern('/'), // both '' a '/' => {}
//  new UrlPattern('/:router/users:id'), // /api/users/ => {}
//  new UrlPattern('/:router/users(:id)'), // /api/users/ => {}
//  new UrlPattern('/:router/users/(:id)'), // /api/users/ => {}
//  new UrlPattern('/:router/users/:id'), // /api/users/ => null
//]

//export const init = () => {
//  const history = createHistory({ basename: '/web-app.html' })
//  let res = JSON.stringify(patterns.map((p, idx) => ({ u: idx, o: p.match(history.location.pathname), q: qs.parse(history.location.search.split('?')[1]) })), null, 2)
//  const unlisten = history.listen((location, action) => {
//    res = JSON.stringify(patterns.map((p, idx) => ({ u: idx, o: p.match(location.pathname), q: qs.parse(location.search.split('?')[1]) })), null, 2)
//    alert(JSON.stringify(patterns.map((p, idx) => {
//      const m = match(p, location)
//      return { idx, m, url: m ? stringify(p, m) : '-' }
//    }), null, 2))
//  })
//  history.push('/xxx/users/123?a=3&b=4')
//  history.push('/yyy/users/?a=3&b=4')
//  history.push('/zzz/users?a=3&b=4')
//  history.push('/ooo/users345?a=3&b=4')
//  //history.push('')
//  //history.push('/')
//  //history.push('/api/users/12')
//  //history.push('/api/users/')
//}

//interface IRouteUrl {
//  router: string
//  query?: {}
//}

//const match = (pattern: UrlPattern, loc: Location | any) => {
//  const m = pattern.match(loc.pathname) as IRouteUrl
//  if (!m) return null
//  const { router, ...rest } = m
//  const res: Router.IState = { routerName: router, par: rest as Router.IRoutePar }
//  if (!loc.search) return res
//  const q = qs.parse(loc.search.substr(1)) as {}
//  res.par.query = q
//  return res
//}

//const stringify = (pattern: UrlPattern, m: Router.IState) => {
//  if (!m) return null
//  const { routerName, par: { query, ...rest } } = m
//  return pattern.stringify({routerName}) + (query ? '?' + qs.stringify(query) : '')
//}