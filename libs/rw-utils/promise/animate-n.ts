import { PromiseExtensible } from './index'
import { Animated } from "react-native";

export class AnimatedPromise extends PromiseExtensible<void> {

  constructor(private value: Animated.Value, private startIsVisible: boolean) { super() }

  doStart() {
    const { value, startIsVisible } = this
    value.setValue(startIsVisible ? 1 : 0.05)
    const tw = Animated.timing(value, {
      duration: 125,
      toValue: startIsVisible ? 0.05 : 1
    })
    //value.addListener(v => console.log(v))
    tw.start(res => {
      this.resolve()
      delete this.value
    });
  }

  abort(msg?) {
    const { value, _state } = this
    if (value) value.stopAnimation()
    delete this.value
    if (_state) return this
    return super.abort(msg)
  }
}
