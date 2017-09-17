//https://restlessbit.github.io/react-transition-demo/index.html
//https://github.com/restlessbit/react-transition-demo
//https://reactcommunity.org/react-transition-group/
import React from 'react'
import Transition from 'react-transition-group/Transition'
import TransitionGroup from 'react-transition-group/TransitionGroup'

const enum TTransitionState {
  exited = 'exited',
  entered = 'entered',
  entering = 'entering',
  exiting = 'exiting',
}

interface IFadeProps {
  duration: number
  in?: boolean,
  //childs: React.ReactNode
}

const FadeTransition: React.SFC<IFadeProps> = ({ duration, in: inProp, children }) => <Transition in={inProp} timeout={{ enter: 0, exit: duration }}>
  {(state: TTransitionState) => state === TTransitionState.exited ? null : <div style={getStyle(duration, state)}>{children}{` STATE: ${state}, count: ${count++}`}</div>}
</Transition>
let count = 0

const getStyle = (duration, state) => ({
  transition: `${duration}ms ease-in`,
  position: 'absolute',
  height: '30px',
  transitionProperty: 'opacity, transform',
  ...transitionStyles[state]
} as CSSProperties)

const transitionStyles = {
  entering: {
    opacity: 0,
    transform: 'translateY(-30px)'
  } as CSSProperties,
  entered: {
    opacity: 1,
    transform: 'translateY(0)'
  } as CSSProperties,
  exiting: {
    opacity: 0,
    transform: 'translateY(30px)'
  } as CSSProperties
}

const Board: React.SFC<any> = ({ children }) => <div style={{ height: '60px', position: 'relative', overflow: 'hidden', border: 'solid 1px black', marginTop: '10px', padding: '15px' }}>{children}</div>

export default class ReactTransitionDemo extends React.Component {

  state = { cards: [] }

  render() {
    const { cards } = this.state;
    const duration = 300
    return (
      <div>
        <h1>React Transition Demo</h1>
        <button onClick={() => this.addCard()}>Add</button>
        <button onClick={() => this.removeLastCard()}>Remove last</button>
        <button onClick={() => this.replaceCard()}>Replace</button>
        <TransitionGroup component={Board}>
          {cards.map(card => <FadeTransition duration={1000} key={card.id}>
            {card.content}{' '}<button onClick={() => this.removeCard(card.id)}>Remove</button>
          </FadeTransition>
          )}
        </TransitionGroup>
      </div>
    )
  }

  addCard() {
    const { cards } = this.state
    const id = counter++
    const newCard = { id, content: `Card ${id}` }
    this.setState({ cards: cards.concat([newCard]) })
  }

  removeCard(id) {
    const { cards } = this.state
    this.setState({ cards: cards.filter(card => card.id !== id) })
  }

  removeLastCard() {
    const { cards } = this.state;
    this.setState({ cards: cards.slice(0, -1) })
  }

  replaceCard() {
    const { cards } = this.state;
    const id = counter++
    const newCard = { id, content: `Card ${id}` }
    const newCards = [...cards]
    newCards[newCards.length - 1] = newCard
    this.setState({ cards: newCards })
  }

}
let counter = 0
