import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

const NoMatch = ({location}) => (
  <p>No page found for: {location.pathname}</p>
);

NoMatch.PropTypes = {
  location: PropTypes.object.isRequired
}

export default withRouter(NoMatch);
