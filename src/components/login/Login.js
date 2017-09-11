import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

const Login = ({ handleLoginSubmit, history }) => {
  let username;
  let password;

  return (
    <div>
      <form onSubmit={(e) => {
          e.preventDefault();
          handleLoginSubmit(username.value, password.value);
          username.value = '';
          password.value = '';
          history.push('/');
        }}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          ref={(el) => {
            username = el;
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          ref={(el) => {
            password = el;
          }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  handleLoginSubmit: PropTypes.func.isRequired,
  history: PropTypes.array.isRequired
};

export default withRouter(Login);
