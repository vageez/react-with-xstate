import React from 'react'
import { Machine, assign, send } from 'xstate'
import { useMachine } from '@xstate/react'
import styled from 'styled-components'
import LinearProgress from '@material-ui/core/LinearProgress'
import Button from '@material-ui/core/Button'
import { taggedSum } from 'daggy'
import axios from 'axios'

const Pre = styled.pre`
  overflow-x: auto;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
  color: green;
`

const fetchUser = username =>
  axios
    .get(`https://api.github.com/users/${username}`)
    .then(({ data }) => send({ payload: data }))
    .catch(error => send(error))

const FetchState = taggedSum('FetchState', {
  IDLE: [],
  LOADING: [],
  SUCCESS: [],
  FAILIURE: []
})

const Maybe = taggedSum('Maybe', {
  Just: ['value'],
  Nothing: []
})

const fetchMachine = Machine(
  {
    id: 'fetch',
    initial: 'idle',
    context: {
      fetchState: FetchState.IDLE,
      user: Maybe.Nothing,
      error: Maybe.Nothing
    },
    states: {
      idle: {
        on: {
          FETCH: {
            target: 'loading',
            actions: 'setLoading'
          }
        }
      },
      loading: {
        invoke: {
          id: 'getUser',
          src: (_context, _event) => fetchUser('vageez'),
          onDone: {
            target: 'success',
            actions: ['setUser', 'setSuccess']
          },
          onError: {
            target: 'failure',
            actions: ['setError', 'setFailure']
          }
        }
      },
      success: {
        on: {
          RESET: {
            target: 'idle',
            actions: 'setIdle'
          }
        }
      },
      failure: {
        on: {
          RETRY: {
            target: 'loading'
          }
        }
      }
    }
  }
  // Can also take actions as second argument
)

const enhancedFetchMachine = fetchMachine.withConfig({
  actions: {
    setLoading: assign((_context, _event) => ({
      fetchState: FetchState.LOADING
    })),
    setSuccess: assign((_context, _event) => ({
      fetchState: FetchState.SUCCESS
    })),
    setFailure: assign((_context, _event) => ({
      fetchState: FetchState.FAILIURE
    })),
    setIdle: assign((_context, _event) => ({
      fetchState: FetchState.IDLE,
      user: Maybe.Nothing,
      error: Maybe.Nothing
    })),
    setUser: assign({
      user: (_context, res) => Maybe.Just(res.data.event.payload)
    }),
    setError: assign({
      error: (_context, err) => Maybe.Just(err)
    })
  }
})

export default () => {
  const [current, send] = useMachine(enhancedFetchMachine)
  const {
    context: { fetchState, user, error }
  } = current
  return (
    <div>
      {fetchState.cata({
        IDLE: () => (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => send('FETCH')}
          >
            FETCH
          </Button>
        ),
        LOADING: () => (
          <Button variant="contained" color="primary" size="large" disabled>
            FETCH
          </Button>
        ),
        SUCCESS: () => (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => send('RESET')}
          >
            RESET
          </Button>
        ),
        FAILIURE: () => (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => send('FETCH')}
          >
            TRY AGAIN
          </Button>
        )
      })}
      <br />
      <br />
      {fetchState.cata({
        IDLE: () => null,
        LOADING: () => <LinearProgress />,
        SUCCESS: () => null,
        FAILIURE: () => null
      })}
      <div>
        {user.cata({
          Just: user => <Pre>{JSON.stringify(user, null, 4)}</Pre>,
          Nothing: () => null
        })}
        {error.cata({
          Just: error => <Pre>{JSON.stringify(error, null, 4)}</Pre>,
          Nothing: () => null
        })}
      </div>
    </div>
  )
}
