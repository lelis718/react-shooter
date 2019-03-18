import React, { Component, ReactNode } from 'react';


class Player extends Component {

	public state ={
		x:0,y:0
	};

	public update(gameState:any, deltaTime:number) {

		console.log("FrameCount", gameState.frameCount, deltaTime);
		this.setState({
			x:gameState.input.axis.x,
			y:gameState.input.axis.y
		})
	}
	render(){
		const style = {
			position:'absolute' as 'absolute',
			width:'10px',height:'10px',
			top:`calc(${this.state.y}% - 5px)`, 
			left:`calc(${this.state.x}% - 5px)`, 
			backgroundColor:'red'
		};
		return <div style={style} ></div>
	}
}

export default Player;
