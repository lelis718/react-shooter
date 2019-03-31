import React, { Component, ReactNode } from 'react';
import Sprite from '../base/Sprite';
import EnemyBase from './EnemyBase';
import Stage from '../base/Stage';



class Enemy1 extends Component {
	

	public state = {
		active:true,
		position: {x:0,y:0},
		dimensions:{width:30,height:30},
		vel:{x:0,y:5}
	};
	private base:any;

	constructor(public props:any) {
		super(props);
		if(this.props.position){
			this.state.position = this.props.position;
		}
	}
	componentDidMount(){
		this.base = this.refs.base;
	}
	
	update = (gameState:any) => { this.base.update(gameState) }
	
	move(gameState:any){
		this.setState({
			position:{
				x:this.state.position.x+this.state.vel.x,
				y:this.state.position.y+this.state.vel.y
			}
		});
		if(this.state.position.y > gameState.gameProperties.height+100){
			Stage.Instance.removeSprite(this);
		}
	}

	render(){
		return <EnemyBase ref="base" update={this.update.bind(this)} moveEnemy={this.move.bind(this)} dimensions={this.state.dimensions} position={this.state.position} className="enemy1"></EnemyBase>
	}
}

export default Enemy1;
