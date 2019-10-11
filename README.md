## React DEMO implementing [XState](https://xstate.js.org) Statecharts for managing state

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
