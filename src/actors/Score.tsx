import React, { Component, ReactNode } from 'react';
import { GameGlobals } from '../helpers/GameGlobals';
import './Score.css';
import Game from '../base/Game';

class Score extends Component {

	public state = {
		currentScore:0
	}
	constructor(public props:any) {
		super(props);
		GameGlobals.Score =this;
	}
	incrementScore(amount: number){
		GameGlobals.ScoreVal += amount;
		console.log("Incrementing score:", amount, GameGlobals.ScoreVal);
		
		this.setState({
			currentScore:GameGlobals.ScoreVal
		});
	}
	resetScore(){
		GameGlobals.ScoreVal = 0;
		this.setState({currentScore:0});
	}
	render(){
		const scoreNumber = this.state.currentScore;
		return <div className={['score', this.props.position].join(' ')}>Score: {scoreNumber}</div>
	}
}
export default Score;
