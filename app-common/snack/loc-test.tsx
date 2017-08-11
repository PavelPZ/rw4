import React from 'react'

const f = Loc.TFileIds.locTest

const test = (props, c: Loc.ILocContext) => {
  const { s, ss, cl } = c.loc.x(c, f)
  return <div>
    {s(1, 'Hallo world')}<br />
    {ss(2, ['Ahoj, ', 'jak se ', 'mas? '], ([s1, s2, s3]) => [s1, <a href='#' onClick={cl(ev => alert('XXX'))}>{s2}</a>, s3])}
  </div>
}
