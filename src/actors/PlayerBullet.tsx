import React, { Component, ReactNode } from 'react';
import Sprite from '../base/Sprite';
import VectorUtils from '../base/VectorUtils';
import './PlayerBullet.css';
import Stage from '../base/Stage';
import Explosion from './Explosion';
import { GameGlobals } from '../helpers/GameGlobals';

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
			GameGlobals.Stage.removeSprite(this);
		}
	}
	public collidesWith(sprite:any){
		if(sprite.props.name == "Enemy"){
			GameGlobals.Stage.addSprite(<Explosion name="Kaboom" active={false} position={this.state.position}></Explosion>);
			GameGlobals.Stage.removeSprite(sprite);
			GameGlobals.Stage.removeSprite(this);
			
			GameGlobals.Score.incrementScore(10);
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
