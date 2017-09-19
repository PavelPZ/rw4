import React from 'react'

export class Animate implements Router.IRouterAnimate {
  constructor(private oldEl: HTMLElement, private newEl: HTMLElement) {
  }
  animate(): Promise<void> { return new Promise<void>(resolve => this.timer = setTimeout(resolve, 1000)) }
  cancel() { clearTimeout(this.timer) }
  timer
  static renderRouter(nodes: JSX.Element[]): JSX.Element {
    return <div>{nodes}</div>
  }
}

