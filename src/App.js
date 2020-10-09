import React, { useEffect } from 'react'
import './App.css'

import { DataPage } from './containers/DataPage/DataPage'

import { useDispatch } from 'react-redux'
import { loadData } from './store/actions'
import { BrowserRouter, Route } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadData())
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={DataPage} />
      </div>
    </BrowserRouter>
  )
}

export default App
