import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Profile from './components/profile/Profile'
import Myorders from './components/profile/Myorders'
import Dashboard from './components/admin/Dashboard'
import AddOrders from './components/orders/AddOrders';
import FetchAllOrders from './components/orders/FetchAllOrders';
import Orders from './components/orders/Orders';

// Redux
import { Provider } from 'react-redux'
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path='/' component={Landing} />
        
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/myorders' component={Myorders} />
            <Route exact path='/orders' component={AddOrders,FetchAllOrders,Orders}/>
            <Route exact path='/admin' component={Dashboard} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
