import React from 'react'
import Transition from 'react-transition-group/Transition'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import { render } from 'react-dom'

const Card: React.SFC<any> = ({ children, onRemove }) => <div>
  {children}
  <button onClick={onRemove}>Remove</button>
</div>

const FadeTransition: React.SFC<any> = ({ children, duration, in: inProp }) => <Transition in={inProp} timeout={{ enter: 0, exit: duration }}>
  {(state) => {
    if (state === 'exited') return null;
    return React.cloneElement(children, {
      style: Object.assign({}, defaultStyle(duration), transitionStyles[state])
    })
  }
  }
</Transition>


const defaultStyle = duration => ({
  transition: `${duration}ms ease-in`,
  transitionProperty: 'opacity, transform'
})

const transitionStyles = {
  entering: {
    opacity: 0,
    transform: 'translateY(-100%)'
  },
  entered: {
    opacity: 1,
    transform: 'translateY(0)'
  },
  exiting: {
    opacity: 0,
    transform: 'translateY(-100%)'
  }
}

const Board: React.SFC<any> = ({ children }) => <ul>
  {children}
</ul>

export default class ReactTransitionDemo extends React.Component {

  state = { cards: [] }

  render() {
    const { cards } = this.state;

    return (
      <div>
        <h1>React Transition Demo</h1>
        <button onClick={() => this.addCard()}>Add a card</button>
        <button onClick={() => this.removeLastCard()}>Remove last card</button>
        <TransitionGroup component={Board}>
          {cards.map(card => <FadeTransition duration={150} key={card.id} in={undefined}>
            <li>
              <Card onRemove={() => {
                this.removeCard(card.id)
              }}>{card.content}</Card>
            </li>
          </FadeTransition>
          )}
        </TransitionGroup>
      </div>
    )
  }

  addCard() {
    const { cards } = this.state
    const id = cards.length + 1;
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
}
