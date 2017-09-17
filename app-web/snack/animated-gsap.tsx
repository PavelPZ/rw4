//BEST: demo krivek, donwload apod.  https://greensock.com/get-started-js a common lightweight choice is TweenLite, CSSPlugin, and EasePack
import React from 'react'

const app: React.SFC<any> = props => <div style={{ position: 'relative' }}>
  <div
    style={{ position: 'absolute', opacity: 0.3, top: 10, left: 10, width: 100, height: 100, backgroundColor: 'red' }}
    //ref={el => TweenLite.to(el, 2, { delay:2, opacity: 1, top: 100, left: 100, width: 200, height: 200, onComplete: () => { }, ease: Elastic.easeOut.config(1, 0.3) })}
    ref={el => TweenLite.to(el, 2, { delay: 2, opacity: 1, top: 100, left: 100, width: 200, height: 200, onComplete: () => { }, ease: Power4.easeOut })}
  >
  </div>
</div>

export default app
