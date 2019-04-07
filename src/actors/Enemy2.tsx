import React, { Component, ReactNode } from 'react';
import Sprite from '../base/Sprite';
import EnemyBase from './EnemyBase';
import Stage from '../base/Stage';
import VectorUtils from '../base/VectorUtils';
import Player from './Player';
import { Transform } from 'stream';
import { GameGlobals } from '../helpers/GameGlobals';



class Enemy2 extends Component {
	

	public state = {
		active:true,
		position: {x:0,y:0},
		dimensions:{width:30,height:60},
		velocity:{x:0,y:2},
		movetimer:100,
		maxSpeed:5,
		targetAim:{x:0,y:0},
		style:{
			transform:''
		}
	};
	private base:any;
	private timePass=0;

	constructor(public props:any) {
		super(props);
		if(this.props.position){
			this.state.position = this.props.position;
		}
	}
	componentDidMount(){
		this.base = this.refs.base;
		this.timePass = 0;
	}
	
	update = (gameState:any) => { this.base.update(gameState) }
	
	move(gameState:any){
		let nextMove = {x:0,y:0};
		
		if(this.timePass < this.state.movetimer){
			this.timePass++;
			nextMove = VectorUtils.add(nextMove, this.state.velocity);
			let direction = VectorUtils.subtract(GameGlobals.Player.state.position, this.state.position);
			this.state.targetAim  = VectorUtils.normalize(direction, this.state.maxSpeed);
			const angle = Math.atan2(this.state.targetAim.y, this.state.targetAim.x) - Math.atan2(1, 0);

			this.setState({
				velocity: nextMove,
				position: VectorUtils.add(this.state.position, nextMove),
				style:{
					transform:`rotate(${angle}rad)`
				}
			});

		} else{
			let steer = VectorUtils.subtract(this.state.targetAim, this.state.velocity);
			let newVelocity = VectorUtils.normalize(VectorUtils.add(steer, this.state.velocity), this.state.maxSpeed);
			
			if(newVelocity.y < 0){
				newVelocity.y = newVelocity.y * -1;
			}
			
			let newPosition = VectorUtils.add(this.state.position, newVelocity);
			this.setState({
				velocity: newVelocity,
				position: newPosition
			});
	
		}
		
		if(this.state.position.y > gameState.gameProperties.height+100){
			GameGlobals.Stage.removeSprite(this);
		}
		if(this.state.position.x < -100 || this.state.position > gameState.gameProperties.width+100){
			GameGlobals.Stage.removeSprite(this);
		}
	}

	render(){
		return <EnemyBase ref="base" update={this.update.bind(this)} moveEnemy={this.move.bind(this)} dimensions={this.state.dimensions} position={this.state.position} style={this.state.style} className="enemy2"></EnemyBase>
	}
}

export default Enemy2;
