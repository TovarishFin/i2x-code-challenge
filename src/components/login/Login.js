import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';

const pageStyle = {
  card: {
    padding: '20px',
    maxWidth: '50%'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  }
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  login = () => {
    this.props.handleLoginSubmit();
    this.props.history.push('/');
  }

  componentWillMount() {
    if(this.props.token) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div style={pageStyle.container}>
        <Card style={pageStyle.card}>
          <form onSubmit={(e) => {
              e.preventDefault();
              this.props.handleLoginSubmit(this.state.username, this.state.password);
              this.state.username = '';
              this.state.password = '';
            }}>
            <TextField
              name="username"
              hintText="Username"
              type="text"
              onChange={(e) => {this.state.username = e.target.value}}
            />
            <br />

            <TextField
              name="password"
              hintText="Password"
              type="password"
              onChange={(e) => {this.state.password = e.target.value}}
            />
            <br />
            <RaisedButton type="submit">Login</RaisedButton>
          </form>
        </Card>
      </div>
    );
  };
}

Login.propTypes = {
  handleLoginSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(Login);
