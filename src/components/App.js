import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Register from './Register/Register'
import Login from './Login/Login'
import Dashboard from './Dashboard/Dashboard'
import NotFound from './NotFound/NotFound'
import Editor from "./Editor/Editor";

//implementing an auth guard from the token
//Return the same component if the user is logged in, else redirect to the login page
const authGuard = (Component) => {
  return localStorage.getItem('token') ? <Component /> : <Redirect to='/login' />
}

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
          <Route path='/dashboard/editor'>
            {authGuard(Editor)}       { /* Securing the editor route */}
          </Route>
          <Route path="/dashboard" >
            {authGuard(Dashboard)}    { /* Securing the Dashboard route */}
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
