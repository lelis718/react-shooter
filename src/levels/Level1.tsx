import React, { Component, ReactNode } from 'react';
import Player from '../actors/Player';
import Stage from '../base/Stage';
import Enemy1 from '../actors/Enemy1';



class Level1 extends Component {


	private stage: any = null;

	constructor(props: any) {
		super(props);
	}

	update(frameCount: number) {
		if (!this.stage) return;
		if (frameCount % 60 == 0) {

			this.stage.addSprite(<Enemy1 name="Enemy" position={{ x: 10, y: -50 }}></Enemy1>);
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
