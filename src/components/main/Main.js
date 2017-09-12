import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Card from 'material-ui/Card';

const pageStyle = {
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  card: {
    padding: '20px',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  cardContainer: {
    padding: '20px'
  },
  stars: {
    color: '#FFEB3B'
  }
};

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
        this.setState({
          metaInfo: res.data.results
        });
      })
      .catch(err => {
        console.log(err)
      })
  }

  formatTimeElement = (timeUnit, element) => {
    switch(true) {
      case timeUnit > 1:
        return `${timeUnit} ${element}s`;
      case timeUnit === 1:
        return `${timeUnit} ${element}`;
      case timeUnit === 0:
        return ``;
      default:
        return ``;
    };
  };

  renderBox = (meta, key) => {
    if(!meta) {
      return (
        <Card>
          <p>Loading...</p>
        </Card>
      )
    }

    const minutes = Math.floor(meta.duration / 60);
    const formattedMinutes = this.formatTimeElement(minutes, 'Minute');
    const seconds = meta.duration % 60;
    const formattedSeconds = this.formatTimeElement(seconds, 'Second');

    return (
      <div key={key} style={pageStyle.cardContainer}>
        <Card style={pageStyle.card }>
          <h3>Final Script</h3>
          <p>{meta.final_script}</p>
          <h3>Rating</h3>
          <p><span style={pageStyle.stars}>{'★'.repeat(meta.rating)}{'☆'.repeat(5 - meta.rating)}</span></p>
          <h3>Duration</h3>
          <p>{formattedMinutes} {formattedSeconds}</p>
          <h3>Audio File</h3>
          <audio controls>
            <source src={meta.url} type="audio/mp3" />
            <source src={meta.url} type="audio/ogg" />
            Please upgrade your web browser.
          </audio>
          <h3>Date Created</h3>
          <p>{new Date(meta.created).toLocaleDateString()}</p>
        </Card>
      </div>
    );
  };

  render() {
    return (
      <div style={pageStyle.container}>
        {this.state.metaInfo.map(this.renderBox)}
      </div>
    )
  }
}

export default Main;
