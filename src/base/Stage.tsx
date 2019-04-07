import React, { Component, ReactNode } from 'react';
import CollisionUtils from './CollisionUtils';
import { GameUtils } from './GameUtils';
import { GameGlobals } from '../helpers/GameGlobals';


class Stage extends Component {

	public static Instance:any;

	public state = {
		looping:false,
		input: {
			axis: { x: 0, y: 0 },
			fireDown: false
		},
		gameProperties:{
			width:0,
			height:0
		},
		children:[] as any[]
	}
	public sprites: any[] = []

	private fps:number;
	private now:number;
	private then:number;
	private interval:number;
	private delta:number;
	private frameCount:number;
	private updateCallback:any;

	constructor(public props: any) {
		super(props);
		this.fps = 60;
		this.now = Date.now();
		this.then = Date.now();
		this.interval = 1000/this.fps;
		this.delta = 0;
		this.frameCount = 0;
		this.updateCallback = props.onUpdate;
		GameGlobals.Stage = this;
	}

	setSprite = (sprite: any) => {
		if(sprite == null) return;
		this.sprites.push(sprite);
	}
	

	componentDidMount() {
		let elm:any = document.getElementById("stage");
		this.setState({gameProperties:{width:elm.offsetWidth, height:elm.offsetHeight}});
		
		React.Children.map(this.props.children, (child, i) => {
			this.addSprite(child);
		});
		this.setState({looping:true});
		requestAnimationFrame(this.frameLoop);
	}
	componentWillUnmount()
	{
		this.setState({looping:false});
	}
	addSprite = (sprite:any) =>{
		const elementKey = "sprite-"+GameUtils.GenerateUID();
		const newElm = React.cloneElement(sprite, {
			key: elementKey,
			ref: this.setSprite,
			input:this.state.input,
			pKey:elementKey
		})
		this.setState((currentState:any)=>{
			const children = currentState.children.concat(newElm);
			return {
				input:currentState.input,
				gameProperties:currentState.gameProperties,
				children:children,
			}
		})
	}
	removeSprite = (sprite:any) => {
		const spriteKey = sprite.props.pKey;
		this.sprites = this.sprites.filter(item=>item.props.pKey !== spriteKey);
		const newList = this.state.children.filter((item:any)=>item.props.pKey !== spriteKey);
		this.setState({ children:newList });
	}	

	
	frameLoop = () => {
		
		// if(this.frameCount < 3){
		// 	requestAnimationFrame(this.frameLoop);
		// }
		if(this.state.looping){
			requestAnimationFrame(this.frameLoop);
		}
	
		this.now = Date.now();
		this.delta = this.now - this.then;
		 
		if (this.delta > this.interval) {
			this.then = this.now - (this.delta % this.interval);

			this.frameCount++;

			if(this.frameCount > 100000){
				this.frameCount = 0;
			} 

			this.setState({
				frameCount:this.frameCount 
			})

			this.sprites.map((item: any) => {
				if(!item) return;

				if(item.state.active){
					this.handleColision(item);
				}

				item.update(this.state);
			});
			
			if(this.updateCallback) this.updateCallback(this.frameCount);
		}

	}

	handleColision(currentSprite:any){
		this.sprites.map((sprite)=>{
			if(sprite !== currentSprite){
				if(!sprite || sprite.props.startAt && sprite.props.startAt > this.frameCount) return;
				if(CollisionUtils.collide(currentSprite, sprite)){
					if(currentSprite.collidesWith) currentSprite.collidesWith(sprite);
				}
			}

		})
	}

	touchMove(event: any){
		let touch = event.touches[0];
		let position = {x:touch.pageX, y:touch.pageY};

		let elm:any = document.getElementById("stage");
		let coords = this.getRelativeCoordinates(position, elm);

		this.setState({
			input: { 
				axis: { x: coords.x, y: coords.y },
				fireDown:this.state.input.fireDown
			}
		});

	}
	mouseMove(event: any) {
		
		let position = {x:event.pageX, y:event.pageY};

		let elm:any = document.getElementById("stage");
		let coords = this.getRelativeCoordinates(position, elm);

		this.setState({
			input: { 
				axis: { x: coords.x, y: coords.y },
				fireDown:this.state.input.fireDown
			}
		});

	}
	mouseDown(event: any) {
		this.setState({
			input: { 
				axis: this.state.input.axis,
				fireDown: true 
			}
		});
	}
	mouseUp(event: any) {
		this.setState({
			input: { 
				axis: this.state.input.axis,
				fireDown: false 
			}
		});
	}


	getRelativeCoordinates (position:any, element:any){

	  
		const offset = {
		  left: element.offsetLeft,
		  top: element.offsetTop
		};
	  
		let reference = element.offsetParent;
	  
		while(reference != null){
		  offset.left += reference.offsetLeft;
		  offset.top += reference.offsetTop;
		  reference = reference.offsetParent;
		}
	  
		return { 
		  x: position.x - offset.left,
		  y: position.y - offset.top,
		}; 
	  
	  }	


	render() {
		const style = {
			position: 'relative' as 'relative',
			width: '100%',
			height: '100%',
			display: 'block',
			overflow:'hidden',
			zIndex:2
		}

		return (
			<div id="stage" 
				onTouchMove={this.touchMove.bind(this)}
				onTouchStart={this.mouseDown.bind(this)}
				onTouchEnd={this.mouseUp.bind(this)} 
				onMouseMove={this.mouseMove.bind(this)}
				onMouseDown={this.mouseDown.bind(this)}
				onMouseUp={this.mouseUp.bind(this)} 
				className="game" style={style}>
				{this.state.children}
			</div>
		)
	}

}

export default Stage;
