import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ token, handleLogout, history }) => {

  const logout = () => {
    handleLogout();
  }

  const login = () => (
    token ? (
      <li>
        <Link to="/login">Logged In</Link>
      </li>
    ) : (
      <li>
        <Link to="/login">Login</Link>
      </li>
    )
  );

  return (
    <div className="nav">
      <ul>
        {login()}
        <li>
          <Link to="/">Main Content</Link>
        </li>
        <li>
          <Link onClick={logout} to="/login">Logout</Link>
        </li>
      </ul>
    </div>
  );

}

Header.PropTypes = {
  token: React.PropTypes.string.isRequired,
  handleLogout: React.PropTypes.func.isRequired,
  history: React.PropTypes.array.isRequired
}

export default withRouter(Header);
