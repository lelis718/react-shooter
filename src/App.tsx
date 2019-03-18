import React, { Component } from 'react';
import './App.css';
import Game from './base/Game';
import Level1 from './levels/Level1';

class App extends Component {
  render() {
	  const style={
		  marginLeft:200,
		  marginTop:200,
		  width:400,
		  height:400
	  }
    return (

      <div className="App" style={style}>
	  	<Game width={style.width} height={style.height}>
		  <Level1></Level1>
		</Game>
      </div>
    );
  }
}

export default App;
