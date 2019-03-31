import React, { Component, ReactNode } from 'react';
import Sprite from '../base/Sprite';
import VectorUtils from '../base/VectorUtils';
import './PlayerBullet.css';
import Stage from '../base/Stage';

class PlayerBullet extends Component {

	public state = {
		active:true,
		position: {x:0,y:0},
		dimensions:{width:10,height:10},
		image:"assets/player-bullet.png",
		maxSpeed:20,
		turnDirection:"none",
	};

	public update(gameState:any) {

		let vel = {x:0, y:-this.state.maxSpeed};
		
		this.setState({
			position:VectorUtils.add(this.state.position,vel)
		})

		if(this.state.position.y < -50){
			Stage.Instance.removeSprite(this);
		}
	}
	public collidesWith(sprite:any){
		console.log("Coliding with", sprite.props.name);
		if(sprite.props.name == "Enemy"){
			Stage.Instance.removeSprite(sprite);
			Stage.Instance.removeSprite(this);
		}
		//console.log("I am coliding with", sprite);
	}
	constructor(public props:any) {
		super(props);
		if(this.props.position){
			this.state.position = this.props.position;
		}
	}
	
	render(){
		return <Sprite name="Bullet" dimensions={this.state.dimensions} position={this.state.position} image={this.state.image} className={'player-bullet'} ></Sprite>
	}

}

export default PlayerBullet;
