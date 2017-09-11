import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class Main extends Component {

  state = {
    metaInfo: []
  };

  componentWillMount() {
    axios
      .get('https://i2x-challenge.herokuapp.com/ai/recording/list/', {
        headers: {
          Authorization: `JWT ${this.props.token}`
        }
      })
      .then(res => {
        console.log(res)
        this.setState({
          metaInfo: res.data.results
        });
      })
      .catch(err => {
        console.log(err)
      })
  }

  renderBox = (meta, key) => {
    if(!meta) {
      return (
        <div key={key}>
          <p>Loading...</p>
        </div>
      )
    }

    return (
      <div className="metaBox" key={key}>
        <p>Final Script: {meta.final_script}</p>
        <p>Rating: {'★'.repeat(meta.rating)}{'☆'.repeat(5 - meta.rating)}</p>
        <p>Duration: {Math.floor(meta.duration / 60)} Minutes</p>
        <audio controls>
          <source src={meta.url} type="audio/mp3" />
          <source src={meta.url} type="audio/ogg" />
          Please upgrade your web browser.
        </audio>
        {meta.url}
        <p>Date Created: {new Date(meta.created).toLocaleDateString()}</p>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.state.metaInfo.map(this.renderBox)}
      </div>
    )
  }
}

export default Main;
