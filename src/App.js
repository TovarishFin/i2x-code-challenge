import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Login from './components/login/Login';
import Main from './components/main/Main';
import NoMatch from './components/noMatch/NoMatch';
import Header from './components/header/Header';

import './app.css';

injectTapEventPlugin();

class App extends Component {

  state = {
    token: null,
    error: null
  };

  handleLoginSubmit = (username, password) => {
    axios
      .post('https://i2x-challenge.herokuapp.com/core/login/', {
        email: username,
        password: password
      })
      .then(res => {
        const token = res.data.token;
        localStorage.setItem('i2x-jwt', token);
        this.setState({
          token: token
        });

      })
      .catch(err => {
        this.setState({
          error: 'login failed'
        })
      });
  }

  handleLogout = () => {
    localStorage.removeItem('i2x-jwt');
    this.setState({
      token: null
    });

  };

  componentWillMount() {
    const localStorageJWT = localStorage.getItem('i2x-jwt');
    if(localStorageJWT) {
      this.setState({
        token: localStorageJWT
      });
    }
  };

  render() {

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route { ...rest } component={props => (
          this.state.token ? (
            <Component { ...props } />
          ) : (
            <Redirect to={{
                pathname: '/login',
                state: {
                  from: props.location
                }
              }} />
          )
        )} />
    );

    return (
      <MuiThemeProvider>
        <Router>
          <div className="page">
            <Header
              token={this.state.token}
              handleLogout={this.handleLogout}
            />
            <Switch>
              <PrivateRoute
                exact
                path="/"
                component={(props) => (<Main {...props} token={this.state.token} />)}
              />
              <Redirect from="/logout" to="/login" />
              <Route
                path="/login"
                component={(props) => (<Login {...props} token={this.state.token} handleLoginSubmit={this.handleLoginSubmit} />)}
              />
            <Route component={() => (<NoMatch />)} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
