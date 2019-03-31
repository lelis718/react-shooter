import React, { Component, ReactNode } from 'react';
import VectorUtils from './VectorUtils';

class CollisionUtils  {

	static collide(sprite1:any, sprite2:any):boolean{
		const pos1 = sprite1.state.position;
		const width1 = sprite1.state.dimensions.width;
		const height1 = sprite1.state.dimensions.height;
		
		const pos2 = sprite2.state.position;
		const width2 = sprite2.state.dimensions.width;
		const height2 = sprite2.state.dimensions.height;

		return !(((pos1.x + width1 - 1) < pos2.x) ||
				 ((pos2.x + width2 - 1) < pos1.x) ||
				 ((pos1.y + height1 - 1) < pos2.y) ||
				 ((pos2.y + height2 - 1) < pos1.y))
	}

}

export default CollisionUtils;
