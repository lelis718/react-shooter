import React, { Component } from 'react';
import './Game.css';

class Game extends Component {

	constructor(public props:any) {
		super(props);
	}
	render() {
		const style={
			position:'relative' as 'relative',
			width:'100%',
			height:'100%',
			padding:0,
			display:'block'
		}
	return (
			<div id="game" className="game" style={style}>
				{this.props.children}
			</div>
		)
	}


}

export default Game;

