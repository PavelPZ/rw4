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

const Card: React.SFC<any> = ({ children, onRemove }) => <div>
  {children}
  <button onClick={onRemove}>Remove</button>
</div>

const FadeTransition: React.SFC<any> = ({ children, duration, in: inProp }) => <Transition in={inProp} timeout={{ enter: 0, exit: duration }}>
  {(state: TTransitionState) => {
    if (state === TTransitionState.exited) return null;
    return React.cloneElement(children, { style: { ...defaultStyle(duration), ...transitionStyles[state] } })
  }}
</Transition>

const defaultStyle = duration => ({
  transition: `${duration}ms ease-in`,
  position: 'absolute',
  height: '30px',
  top:'-30px',
  transitionProperty: 'opacity, transform'
} as CSSProperties)

const transitionStyles = {
  entering: {
    opacity: 0,
    transform: 'translateY(-30px)'
  },
  entered: {
    opacity: 1,
    transform: 'translateY(0)'
  },
  exiting: {
    opacity: 0,
    transform: 'translateY(30px)'
  }
}

const Board: React.SFC<any> = ({ children }) => <div style={{ position: 'relative', paddingTop:'30px' }}>{children}</div>

export default class ReactTransitionDemo extends React.Component {

  state = { cards: [] }

  render() {
    const { cards } = this.state;

    return (
      <div>
        <h1>React Transition Demo</h1>
        <button onClick={() => this.addCard()}>Add</button>
        <button onClick={() => this.removeLastCard()}>Remove last</button>
        <button onClick={() => this.replaceCard()}>Replace</button>
        <TransitionGroup component={Board}>
          {cards.map(card => <FadeTransition duration={1500} key={card.id} in={undefined}>
            <div>
              {card.content}{' '} <button onClick={() => this.removeCard(card.id)}>Remove</button>
            </div>
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
