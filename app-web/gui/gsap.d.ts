declare const TweenLite: typeof gsap.TweenLite
declare const TweenMax: typeof gsap.TweenMax

declare const EaseLookup: typeof gsap.EaseLookup
declare const Back: typeof gsap.Back
declare const Bounce: typeof gsap.Bounce
declare const Circ: typeof gsap.Circ
declare const Cubic: typeof gsap.Cubic
declare const Elastic: typeof gsap.Elastic
declare const Expo: typeof gsap.Expo
declare const Linear: typeof gsap.Linear
declare const Quad: typeof gsap.Quad
declare const Quart: typeof gsap.Quart
declare const Quint: typeof gsap.Quint
declare const Sine: typeof gsap.Sine
declare const SlowMo: typeof gsap.SlowMo
declare const SteppedEase: typeof gsap.SteppedEase
declare const RoughEase: typeof gsap.RoughEase

declare const Power0: typeof gsap.Linear
declare const Power1: typeof gsap.Quad
declare const Power2: typeof gsap.Cubic
declare const Power3: typeof gsap.Quart
declare const Power4: typeof gsap.Quint
declare const Strong: typeof gsap.Quint

declare namespace GUI {
  type ITweenCancel = { cancel?: () => void }
  type ITweenParsEx = { cancel?: ITweenCancel, tweenProc?: Function, [prop: string]: any }
}


