import React, { Component, ReactNode } from 'react';
import Sprite from '../base/Sprite';
import Stage from '../base/Stage';
import './Explosion.css'
import { GameGlobals } from '../helpers/GameGlobals';

class Explosion extends Component {
	

	public state = {
		active:false,
		explosionActive:true,
		dimensions:{width:30,height:30},
		position:{x:0,y:0},
		duration:20
	};
	private initialDuration = 0;
	constructor(public props:any) {
		super(props);
		this.state.position = this.props.position;
	}
	update(gameState:any){ 

		if(this.state.explosionActive && this.initialDuration < this.state.duration){
			this.initialDuration++;
		} else {
			this.state.explosionActive = false;
			GameGlobals.Stage.removeSprite(this);
			if(this.props.onEnd){
				this.props.onEnd();
			}
		}
	}
	
	componentDidMount(){
		this.initialDuration = 0;
	}
	
	render(){
		return <Sprite name="Explosion" dimensions={this.state.dimensions} position={this.props.position} className={"explosion"} style={this.props.style} ></Sprite>
	}
}

export default Explosion;
