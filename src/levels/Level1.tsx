import React, { Component, ReactNode } from 'react';
import Player from '../actors/Player';
import Stage from '../base/Stage';
import Enemy1 from '../actors/Enemy1';



class Level1 extends Component {
	
	render(){
		return <Stage>
			<Player></Player>
			<Enemy1 startAt={10}></Enemy1>
			<Enemy1 startAt={40}></Enemy1>
			<Enemy1 startAt={100}></Enemy1>
			<Enemy1 startAt={200}></Enemy1>
			<Enemy1 startAt={300}></Enemy1>
			<Enemy1 startAt={400}></Enemy1>
			<Enemy1 startAt={410}></Enemy1>
			<Enemy1 startAt={420}></Enemy1>
			<Enemy1 startAt={430}></Enemy1>
			<Enemy1 startAt={440}></Enemy1>
			</Stage>
	}
}

export default Level1;
