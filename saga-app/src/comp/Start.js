import React, { Component } from 'react';
import AudioPlayer from './AudioPlayer';

import '../style/index.css';
import '../style/media.css';

class Start extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
        play: true,
        pause: false,
        url: '',
        errors: {},
        hidden: true,
    };
    this.state = this.initialState;
    this.url = 'audio/first.mp3';
    this.audio = new Audio(this.url);

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    //this.togglePlay = this.toggplePlay.bind(this);

    console.log(this.state)
};


  componentDidMount() {
    this.audio.addEventListener('ended', () => this.setState({ play: false }));
  }

  componentWillUnmount() {
    this.audio.removeEventListener('ended', () => this.setState({ play: false }));  
  }

  togglePlay = () => {
    this.setState({
      play: !this.state.play
    });

    this.state.play ? this.audio.play() : this.audio.pause();
  }


  play = async () => {
    this.setState({ play: true, pause: false })

    try {
      await this.audio.play();
      console.log('playing');
    } catch (err) {
      console.log('det går inte att play ' + err)

      return(<div><p>Fungerade inte, testa </p><a href="/mediaplayer/">mediaplayer</a></div>)
    }
    }
    
  pause = async () => {
  this.setState({ play: false, pause: true })

    try {
      await this.audio.pause();
      console.log("pausade");
    } catch(err) {
      console.log("det går inte att pausa " + err)
    }
  }

  render() {

    return (
        <div className="container">
          <AudioPlayer />
            <button onClick={this.play}>Play</button>
            <button onclick={this.pause}>Pause</button>
            <button onClick={this.togglePlay}>{this.state.play ? 'Pause' : 'Play'}</button>
          </div>
    )
  }
}
export default Start
