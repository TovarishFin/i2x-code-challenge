import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';

class Header extends Component {
//({ token, handleLogout, history, location}) =>
  logout = () => {
    this.props.handleLogout();
    this.props.history.push('/login');
  }

  render() {
    return (
      <div>
        <AppBar
          title="I2X Code Challenge: Cody Lamson"
          showMenuIconButton={false}
          zDepth={0}
        />
        <Tabs value={this.props.location.pathname}>

          <Tab
            containerElement={<Link to="/"/>}
            label="Main Content"
            value="/"
          >
          </Tab>

          <Tab
            containerElement={<Link to="/login"/>}
            label={this.props.token ? 'Logged In' : 'Login'}
            value="/login"
          >
          </Tab>

          <Tab
            onActive={this.logout}
            containerElement={<Link to="/logout"/>}
            label="Logout"
            value="/logout"
          >
          </Tab>

        </Tabs>
      </div>
    );
  }
};

Header.PropTypes = {
  token: React.PropTypes.string.isRequired,
  handleLogout: React.PropTypes.func.isRequired,
  history: React.PropTypes.array.isRequired
};

export default withRouter(Header);
