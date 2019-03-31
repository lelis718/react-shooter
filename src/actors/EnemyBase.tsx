import React, { Component, ReactNode } from 'react';
import Sprite from '../base/Sprite';
import './EnemyBase.css'

class EnemyBase extends Component {

	constructor(public props:any) {
		super(props);
	}

	public update(gameState:any) {
		this.props.moveEnemy(gameState);
	}

	

	render(){
		return <Sprite name="Enemy" dimensions={this.props.dimensions} position={this.props.position} className={this.props.className} ></Sprite>
	}
}

export default EnemyBase;
