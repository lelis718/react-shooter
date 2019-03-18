import React, { Component } from 'react';

class Game extends Component {

	constructor(public props:any) {
		super(props);
	}
	render() {
		const style={
			position:'relative' as 'relative',
			width:this.props.width,
			height:this.props.height,
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

