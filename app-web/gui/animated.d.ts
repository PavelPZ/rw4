declare module 'animated' {
  // Most (all?) functions where AnimatedValue is used any subclass of Animated can be used as well.
  type AnimatedValue = Animated;
  type AnimatedValueXY = ValueXY;

  type Base = Animated;

  class Animated {
    // Internal class, no public API.
  }

  class AnimatedWithChildren extends Animated {
    // Internal class, no public API.
  }

  class AnimatedInterpolation extends AnimatedWithChildren {
    interpolate(config: InterpolationConfigType): AnimatedInterpolation;
  }

  type ExtrapolateType = 'extend' | 'identity' | 'clamp';

  type InterpolationConfigType = {
    inputRange: number[];
    outputRange: (number[] | string[]);
    easing?: ((input: number) => number);
    extrapolate?: ExtrapolateType;
    extrapolateLeft?: ExtrapolateType;
    extrapolateRight?: ExtrapolateType;
  };

  type ValueListenerCallback = (state: { value: number }) => void;

  /**
   * Standard value for driving animations.  One `Animated.Value` can drive
   * multiple properties in a synchronized fashion, but can only be driven by one
   * mechanism at a time.  Using a new mechanism (e.g. starting a new animation,
   * or calling `setValue`) will stop any previous ones.
   */
  export class Value extends AnimatedWithChildren {
    constructor(value: number);

    /**
     * Directly set the value.  This will stop any animations running on the value
     * and update all the bound properties.
     */
    setValue(value: number): void;

    /**
     * Sets an offset that is applied on top of whatever value is set, whether via
     * `setValue`, an animation, or `Animated.event`.  Useful for compensating
     * things like the start of a pan gesture.
     */
    setOffset(offset: number): void;

    /**
     * Merges the offset value into the base value and resets the offset to zero.
     * The final output of the value is unchanged.
     */
    flattenOffset(): void;

    /**
     * Sets the offset value to the base value, and resets the base value to zero.
     * The final output of the value is unchanged.
     */
    extractOffset(): void;

    /**
     * Adds an asynchronous listener to the value so you can observe updates from
     * animations.  This is useful because there is no way to
     * synchronously read the value because it might be driven natively.
     */
    addListener(callback: ValueListenerCallback): string;

    removeListener(id: string): void;

    removeAllListeners(): void;

    /**
     * Stops any running animation or tracking.  `callback` is invoked with the
     * final value after stopping the animation, which is useful for updating
     * state to match the animation position with layout.
     */
    stopAnimation(callback?: (value: number) => void): void;

    /**
     * Interpolates the value before updating the property, e.g. mapping 0-1 to
     * 0-10.
     */
    interpolate(config: InterpolationConfigType): AnimatedInterpolation;
  }

  type ValueXYListenerCallback = (value: { x: number; y: number }) => void;

  /**
   * 2D Value for driving 2D animations, such as pan gestures.  Almost identical
   * API to normal `Animated.Value`, but multiplexed.  Contains two regular
   * `Animated.Value`s under the hood.
   */
  export class ValueXY extends AnimatedWithChildren {
    x: AnimatedValue;
    y: AnimatedValue;

    constructor(valueIn?: { x: number | AnimatedValue; y: number | AnimatedValue });

    setValue(value: { x: number; y: number }): void;

    setOffset(offset: { x: number; y: number }): void;

    flattenOffset(): void;

    extractOffset(): void;

    stopAnimation(callback?: (value: { x: number, y: number }) => void): void;

    addListener(callback: ValueXYListenerCallback): string;

    removeListener(id: string): void;

    /**
     * Converts `{x, y}` into `{left, top}` for use in style, e.g.
     *
     *```javascript
     *  style={this.state.anim.getLayout()}
     *```
     */
    getLayout(): { [key: string]: AnimatedValue };

    /**
     * Converts `{x, y}` into a useable translation transform, e.g.
     *
     *```javascript
     *  style={{
     *    transform: this.state.anim.getTranslateTransform()
     *  }}
     *```
     */
    getTranslateTransform(): { [key: string]: AnimatedValue }[];

  }

  type EndResult = { finished: boolean };
  type EndCallback = (result: EndResult) => void;

  interface CompositeAnimation {
    start: (callback?: EndCallback) => void;
    stop: () => void;
  }

  interface AnimationConfig {
    isInteraction?: boolean;
    useNativeDriver?: boolean;
  }

  /**
   * Animates a value from an initial velocity to zero based on a decay
   * coefficient.
   */
  export function decay(
    value: AnimatedValue | AnimatedValueXY,
    config: DecayAnimationConfig
  ): CompositeAnimation;

  interface DecayAnimationConfig extends AnimationConfig {
    velocity: number | { x: number, y: number };
    deceleration?: number;
  }

  /**
   * Animates a value along a timed easing curve.  The `Easing` module has tons
   * of pre-defined curves, or you can use your own function.
   */
  export var timing: (
    value: AnimatedValue | AnimatedValueXY,
    config: TimingAnimationConfig
  ) => CompositeAnimation;

  interface TimingAnimationConfig extends AnimationConfig {
    toValue: number | AnimatedValue | { x: number, y: number } | AnimatedValueXY;
    easing?: (value: number) => number;
    duration?: number;
    delay?: number;
  }

  interface SpringAnimationConfig extends AnimationConfig {
    toValue: number | AnimatedValue | { x: number, y: number } | AnimatedValueXY;
    overshootClamping?: boolean;
    restDisplacementThreshold?: number;
    restSpeedThreshold?: number;
    velocity?: number | { x: number, y: number };
    bounciness?: number;
    speed?: number;
    tension?: number;
    friction?: number;
  }

  interface LoopAnimationConfig {
    iterations?: number; // default -1 for infinite
  }

  /**
   * Creates a new Animated value composed from two Animated values added
   * together.
   */
  export function add(
    a: Animated,
    b: Animated
  ): AnimatedAddition;

  class AnimatedAddition extends AnimatedInterpolation { }

  /**
   * Creates a new Animated value composed by dividing the first Animated
   * value by the second Animated value.
   */
  export function divide(
    a: Animated,
    b: Animated
  ): AnimatedDivision;

  class AnimatedDivision extends AnimatedInterpolation { }

  /**
   * Creates a new Animated value composed from two Animated values multiplied
   * together.
   */
  export function multiply(
    a: Animated,
    b: Animated
  ): AnimatedMultiplication;

  class AnimatedMultiplication extends AnimatedInterpolation { }

  /**
   * Creates a new Animated value that is the (non-negative) modulo of the
   * provided Animated value
   */
  export function modulo(
    a: Animated,
    modulus: number
  ): AnimatedModulo;

  class AnimatedModulo extends AnimatedInterpolation { }

  /**
   * Create a new Animated value that is limited between 2 values. It uses the
   * difference between the last value so even if the value is far from the bounds
   * it will start changing when the value starts getting closer again.
   * (`value = clamp(value + diff, min, max)`).
   *
   * This is useful with scroll events, for example, to show the navbar when
   * scrolling up and to hide it when scrolling down.
   */
  export function diffClamp(a: Animated, min: number, max: number): AnimatedDiffClamp;

  class AnimatedDiffClamp extends AnimatedInterpolation { }

  /**
   * Starts an animation after the given delay.
   */
  export function delay(time: number): CompositeAnimation;

  /**
   * Starts an array of animations in order, waiting for each to complete
   * before starting the next.  If the current running animation is stopped, no
   * following animations will be started.
   */
  export function sequence(
    animations: Array<CompositeAnimation>
  ): CompositeAnimation;

  /**
   * Array of animations may run in parallel (overlap), but are started in
   * sequence with successive delays.  Nice for doing trailing effects.
   */

  export function stagger(
    time: number,
    animations: Array<CompositeAnimation>
  ): CompositeAnimation

  /**
   * Loops a given animation continuously, so that each time it reaches the end,
   * it resets and begins again from the start. Can specify number of times to
   * loop using the key 'iterations' in the config. Will loop without blocking
   * the UI thread if the child animation is set to 'useNativeDriver'.
   */

  export function loop(
    animation: CompositeAnimation,
    config?: LoopAnimationConfig,
  ): CompositeAnimation

  /**
   * Spring animation based on Rebound and Origami.  Tracks velocity state to
   * create fluid motions as the `toValue` updates, and can be chained together.
   */
  export function spring(
    value: AnimatedValue | AnimatedValueXY,
    config: SpringAnimationConfig
  ): CompositeAnimation;

  type ParallelConfig = {
    stopTogether?: boolean; // If one is stopped, stop all.  default: true
  }

  /**
   * Starts an array of animations all at the same time.  By default, if one
   * of the animations is stopped, they will all be stopped.  You can override
   * this with the `stopTogether` flag.
   */
  export function parallel(
    animations: Array<CompositeAnimation>,
    config?: ParallelConfig
  ): CompositeAnimation;

  type Mapping = { [key: string]: Mapping } | AnimatedValue;
  interface EventConfig {
    listener?: ValueListenerCallback;
    useNativeDriver?: boolean;
  }

  /**
   *  Takes an array of mappings and extracts values from each arg accordingly,
   *  then calls `setValue` on the mapped outputs.  e.g.
   *
   *```javascript
   *  onScroll={Animated.event(
   *    [{nativeEvent: {contentOffset: {x: this._scrollX}}}]
   *    {listener},          // Optional async listener
   *  )
   *  ...
   *  onPanResponderMove: Animated.event([
   *    null,                // raw event arg ignored
   *    {dx: this._panX},    // gestureState arg
   *  ]),
   *```
   */
  export function event(
    argMapping: Mapping[],
    config?: EventConfig
  ): (...args: any[]) => void;

  /**
   * Make any React component Animatable.  Used to create `Animated.View`, etc.
   */
  export function createAnimatedComponent(component: any): any;

  /**
   * Animated variants of the basic native views. Accepts Animated.Value for
   * props and style.
   */
  export var View: any;
  export var Image: any;
  export var Text: any;
  export var ScrollView: any;
}
