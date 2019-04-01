import React, { Component } from 'react';
import './App.css';
import Game from './base/Game';
import Level1 from './levels/Level1';

class App extends Component {

	public static Instance:App;
	public state = {
		gameStarted: false
	};

	constructor(props: any) {
		super(props);
		App.Instance = this;
	}
	gameStart() {
		this.setState({ gameStarted: true });
	}
	gameRestart(){
		this.setState({ gameStarted: false });
	}

	render() {
		const style = {
			marginLeft: 0,
			marginTop: 0,
			width: '100vw',
			height: '100vh'
		}

		let game;
		if(this.state.gameStarted){
			game = <Level1></Level1>;
		}
		let start;
		if(!this.state.gameStarted){
			start = <button name="Start" className={"startButton"} onClick={this.gameStart.bind(this)}>Start</button>;
		}

		return (
			<div className="App" style={style}>
				<Game width={style.width} height={style.height}>
					{game}
				</Game>
				{start}
			</div>
		);
	}
}

export default App;
