import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import FetchMachine from './components/FetchMachine.jsx'

const AppWrapper = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  margin: 5px 10px;
`

const H1 = styled.h1`
  font-size: 1.2em;
`
const App = () => (
  <AppWrapper>
    <H1>{`React Demo Implementing xstate Statecharts`}</H1>
    <FetchMachine />
  </AppWrapper>
)

ReactDOM.render(<App />, document.getElementById('root'))
