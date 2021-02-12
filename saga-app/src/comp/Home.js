import React, { Component } from 'react';

import '../style/index.css'

const Welcome = () => {
  return (
    <div className="container">
      <h2>Välkommen</h2>
      <a href="/start">STARTA SPELET</a>
  </div>
  )
}

class Home extends Component {
  render() {

    return (
      <Welcome />
    )
  }
}
export default Home
