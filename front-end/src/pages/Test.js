import React from 'react';
import axios from 'axios';
import {useState} from 'react'; 

const Test = () => {
    const [songs, setSongs] = useState([]) 
  
    componentDidMount() {
      axios.get(`http://localhost/8888/allsavedsongs`)
        .then(res => {
          const songs = res.data;
          this.setState({ songs });
        })
    }
  
    // render() {
      // return (
      //   <ul>
      //     {
      //       this.state.songs
      //         .map(song =>
      //           <li key={song.id}>{song.title}</li>
      //         )
      //     }
      //     haha
      //   </ul>
      // )
    // }
  }

  export default Test