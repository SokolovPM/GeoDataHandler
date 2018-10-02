import React from 'react'
import ReactDom from 'react-dom'

import { Router, Route, browserHistory, Redirect } from 'react-router'

import Layout from './components/layout'


ReactDom.render(
  <Router history={browserHistory}>
    <Route component={Layout} path="/" />
  </Router>
  ,
  document.getElementById('app')
)
