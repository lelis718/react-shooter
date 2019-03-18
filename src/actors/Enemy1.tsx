import React, { Component, ReactNode } from 'react';


class Enemy1 extends Component {

	/**
	 *
	 */
	constructor(public props:any) {
		super(props);
		this.startingFrame = this.props.startAt;
	}

	public state ={
		x:Math.random()*100,y:-10
	};
	public velY = 1;
	public startingFrame = 1;

	public update(gameState:any,deltaTime:number) {
		if(this.startingFrame <= gameState.frameCount){
			let y = this.state.y + this.velY;
			let x = this.state.x;
			if(y > 110){
				y = -10;
				x = Math.random()*100;
			}
			this.setState({x:x, y:y});
		}

	}
	render(){
		const style = {
			position:'absolute' as 'absolute',
			width:'10px',height:'10px',
			top:`calc(${this.state.y}% - 5px)`, 
			left:`calc(${this.state.x}% - 5px)`, 
			backgroundColor:'purple'
		};
		return <div style={style} ></div>
	}
}

export default Enemy1;
