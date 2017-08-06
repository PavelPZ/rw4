declare namespace DReactNative {
  interface ButtonEx {
    primary?: boolean;
    secondary?: boolean;
    flat?: boolean;
    tabIndex?: number;
  }
}

declare module 'invariant' {
  const invariant: (condition: boolean, msg: string, ...arg: string[]) => void
  export default invariant
}