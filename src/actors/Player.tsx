import React, { Component, ReactNode } from 'react';
import Sprite from '../base/Sprite';
import VectorUtils from '../base/VectorUtils';
import './Player.css';
import PlayerBullet from './PlayerBullet';
import Stage from '../base/Stage';
import App from '../App';

class Player extends Component {

	public state = {
		active:true,
		position: {x:0,y:0},
		dimensions:{width:30,height:30},
		velocity: {x:0,y:0},
		maxSpeed:30,
		turnDirection:"none",
	};

	public update(gameState:any) {
		let axis = {x:gameState.input.axis.x, y:gameState.input.axis.y-50}; 
		let dir = VectorUtils.subtract(axis,this.state.position);
		let distance = VectorUtils.magnitude(dir);
		const arriveDistance = 50;

		let speed = 0;
		if(distance < arriveDistance){
			speed = this.state.maxSpeed * distance/arriveDistance;
		} else {
			speed = this.state.maxSpeed;
		}
		let desired = VectorUtils.normalize(dir, speed);
		let steer = VectorUtils.subtract(desired, this.state.velocity);

		let newVelocity = VectorUtils.normalize(VectorUtils.add(steer, this.state.velocity), speed);
		let newPosition = VectorUtils.add(this.state.position, newVelocity);
		

		//Change sprites
		let turnTreshold = 10;
		if(newPosition.x > axis.x+turnTreshold){
			//going right
			this.state.turnDirection = "player-turn-right";
		}else if(newPosition.x < axis.x-turnTreshold){
			//going left
			this.state.turnDirection = "player-turn-left";
		} else{
			this.state.turnDirection = "player-no-turn";
		}
		
		//Shoot
		if (gameState.frameCount % 15 == 0) {
			Stage.Instance.addSprite(<PlayerBullet name="Shoot" position={{ x: this.state.position.x, y: this.state.position.y-15 }}></PlayerBullet>);
		}

		
		this.setState({
			velocity:newVelocity,
			position:newPosition
		})
	}
	public collidesWith(sprite:any){
		if(sprite.props.name == "Enemy"){
			Stage.Instance.removeSprite(sprite);
			Stage.Instance.removeSprite(this);
			App.Instance.gameRestart();
		}		
	}
	constructor(public props:any) {
		super(props);
		if(this.props.position){
			this.state.position = this.props.position;
		}
	}
	
	render(){
		return <Sprite name="Player" dimensions={this.state.dimensions} position={this.state.position} flip={true} className={['player',this.state.turnDirection].join(' ')} ></Sprite>
	}

}

export default Player;
