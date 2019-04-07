import React, { Component, ReactNode } from 'react';
import Player from '../actors/Player';
import Stage from '../base/Stage';
import Enemy1 from '../actors/Enemy1';
import { PseudoRandom } from '../helpers/PseudoRandom';
import Enemy2 from '../actors/Enemy2';



class Level1 extends Component {


	private stage: any = null;
	private rand:PseudoRandom;

	constructor(props: any) {
		super(props);
		this.rand = new PseudoRandom(1000);
	}

	update(frameCount: number) {
		if (!this.stage) return;
		let enemyCreateRatio = 60+(this.rand.random()*30);
		if (frameCount % Math.round(enemyCreateRatio) == 0) {
			
			let enemyXPosition = 10+ this.rand.random()* (this.stage.state.gameProperties.width-20);
			enemyXPosition = Math.round(enemyXPosition);

			let enemyType = Math.round(this.rand.random()*10);
			if(enemyType > 8){
				this.stage.addSprite(<Enemy2 name="Enemy" position={{ x: enemyXPosition, y: -50 }}></Enemy2>);
			} else {
				this.stage.addSprite(<Enemy1 name="Enemy" position={{ x: enemyXPosition, y: -50 }}></Enemy1>);
			}

		}
		
	}
	componentDidMount(){
		this.stage = this.refs.stage;
		//this.update(0);
	}

	render() {
		
		return <Stage ref="stage" onUpdate={this.update.bind(this)} >
			<Player name="Player" position={{ x: 200, y: 350 }}></Player>
		</Stage>
	}
}

export default Level1;
