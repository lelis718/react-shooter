import React, { Component, ReactNode } from 'react';


class Sprite extends Component {
	/**
	 *
	 */
	constructor(public props:any) {
		super(props);
	}	
	render(){
		//console.log(this.props);
		const style:any = {
			position:'absolute' as 'absolute',
			width:`${this.props.dimensions.width}px`,height:`${this.props.dimensions.height}px`,
			top:`${this.props.position.y - this.props.dimensions.height/2}px`, 
			left:`${this.props.position.x - this.props.dimensions.width/2}px`, 
			display:'block',
			zIndex:2
			//border:'solid 1px green' //debug
		};
		
		return <div style={style} className={this.props.className}  />
	}

}

export default Sprite;
