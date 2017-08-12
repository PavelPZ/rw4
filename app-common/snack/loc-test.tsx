import React from 'react'

import { loc, contextType as locContextType, registerFile } from '../loc'

const f = Loc.TFileIds.locTest
registerFile(f, 'app-common/snack/loc-test')

const Test = (props, c: IContext) => {
  const { s, ss, cl } = loc(c.loc, f)
  return <div>
    {s(1, 'Hallo world')}<br />
    {ss(2, ['Ahoj, ', 'jak se ', 'mas? '], ([s1, s2, s3]) => [s1, <a href='#' onClick={cl(ev => alert('XXX'))}>{s2}</a>, s3])}
  </div>
}
locContextType(Test)

export default Test