import React from 'react';
import axios from 'axios';

export default class Test extends React.Component {
    state = {
      songs: []
    }
  
    componentDidMount() {
      axios.get(`http://localhost/8888/getAllSongs`)
        .then(res => {
          const songs = res.data;
          this.setState({ songs });
        })
    }
  
    render() {
      return (
        <ul>
          {
            this.state.songs
              .map(song =>
                <li key={song.id}>{song.title}</li>
              )
          }
          haha
        </ul>
      )
    }
  }