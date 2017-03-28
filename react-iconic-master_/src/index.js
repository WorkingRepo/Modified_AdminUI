import React from 'react'

import { render } from 'react-dom'

import { Router, Route, hashHistory } from 'react-router'

import App from './modules/App'

import Login from './modules/Login'

import Register from './modules/Register'

import 'bootstrap/dist/css/bootstrap.css'

import 'font-awesome/css/font-awesome.css'

import Add from './modules/Add'

import Delete from './modules/Delete'

import Update from './modules/Update'

import Home from './modules/Home'



render((
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/register" component={Register} />
    <Route path="/home" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/add" component={Add} />
    <Route path="/delete" component={Delete} />
    <Route path="/update" component={Update} />
  
  </Router>

), document.getElementById('app'))
