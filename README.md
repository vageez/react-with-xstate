## React DEMO implementing [XState](https://xstate.js.org) Statecharts for managing state

### Run locally

- > npm run dev

#### xstate Packages included

- npm i --save xstate
- npm i --save @xstate/react

#### State Machine

```
 {
    id: 'fetch',
    initial: 'idle',
    context: {
      fetchState: FetchState.IDLE,
      user: Maybe.Nothing,
      error: Maybe.Nothing
    },
    states: {
        idle: {...},
        loading: {...},
        success: {...},
        failure: {...}
    }
  }
```

### State Transition Diagram

idle ==click==> loading ==resolve==> success ===click==> idle
===========================reject==> failure ===click==> idle

### Adjacency list

What state maps to what

### Finite state machine

Deterministic : Pre determined sequence
Finite : Nimber of possible states we have in our applicaiton
Automata : Given the current state and action you will know what the next state is going to be, all the time

### Designing state machine, state examples using Pac-Man ghost states

- Chasing pac-man
- Running away from pac-man
- Dead, eyeballs
