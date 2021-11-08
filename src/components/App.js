import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Register from './Register/Register'
import Login from './Login/Login'
import Dashboard from './Dashboard/Dashboard'
import NotFound from './NotFound/NotFound'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path='/'>
            <Redirect to='/dashboard' />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
