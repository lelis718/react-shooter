import React, { Component, ReactNode } from 'react';
import Sprite from '../base/Sprite';
import VectorUtils from '../base/VectorUtils';
import './Player.css';
import PlayerBullet from './PlayerBullet';
import Stage from '../base/Stage';

class Player extends Component {

	public state = {
		active:true,
		position: {x:0,y:0},
		dimensions:{width:30,height:30},
		velocity: {x:0,y:0},
		maxSpeed:10,
		turnDirection:"none",
	};

	public update(gameState:any) {

		let dir = VectorUtils.subtract(gameState.input.axis,this.state.position);
		let distance = VectorUtils.magnitude(dir);
		const arriveDistance = 30;

		let speed = 0;
		if(distance < arriveDistance){
			speed = this.state.maxSpeed * distance/arriveDistance;
		} else {
			speed = this.state.maxSpeed;
		}
		let desired = VectorUtils.normalize(dir, speed);
		let steer = VectorUtils.subtract(desired, this.state.velocity);



		this.state.velocity = VectorUtils.normalize(VectorUtils.add(steer, this.state.velocity), speed);
		let newPosition = VectorUtils.add(this.state.position, this.state.velocity);
		

		//Change sprites
		let turnTreshold = 10;
		if(newPosition.x > gameState.input.axis.x+turnTreshold){
			//going right
			this.state.turnDirection = "player-turn-right";
		}else if(newPosition.x < gameState.input.axis.x-turnTreshold){
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
			position:newPosition
		})
	}
	public collidesWith(sprite:any){
		if(sprite.props.name == "Enemy"){
			Stage.Instance.removeSprite(sprite);
			Stage.Instance.removeSprite(this);
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
