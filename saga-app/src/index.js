import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'

import './style/index.css';

import Home from './comp/Home';
import Start from './comp/Start';
import AudioPlayer from './comp/AudioPlayer';


import Notfound from './notfound';
import reportWebVitals from './reportWebVitals';


const routing = (
  <Router>
    <div>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/start" component={Start}/>
      <Route path="/audioplayer" component={AudioPlayer}/>

      <Route component={Notfound} />
    </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
