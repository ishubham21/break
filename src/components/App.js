import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import Home from './Home/Home'
import Dashboard from './Dashboard/Dashboard'
import NotFound from './NotFound/NotFound'
import Ide from "./Editor/Ide";
import theme from './../theme/theme'

//implementing an auth guard from the token
//Return the same component if the user is logged in, else redirect to the login page
const authGuard = (Component) => {
  return localStorage.getItem('token') ? <Component /> : <Redirect to='/home' />
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Switch>
            <Route path='/home'>
              <Home />
            </Route>
            <Route path='/dashboard/code'>
              {authGuard(Ide)}       { /* Securing the editor route */}
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
    </ThemeProvider>
  );
}

export default App;
