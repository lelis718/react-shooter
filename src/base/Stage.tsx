import React, { Component, ReactNode } from 'react';
import CollisionUtils from './CollisionUtils';
import { GameUtils } from './GameUtils';

class Stage extends Component {

	public static Instance:any;

	public state = {
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
		this.fps = 30;
		this.now = Date.now();
		this.then = Date.now();
		this.interval = 1000/this.fps;
		this.delta = 0;
		this.frameCount = 0;
		this.updateCallback = props.onUpdate;
		Stage.Instance = this;
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

		requestAnimationFrame(this.frameLoop);
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
		requestAnimationFrame(this.frameLoop);
	
		this.now = Date.now();
		this.delta = this.now - this.then;
		 
		if (this.delta > this.interval) {
			this.then = this.now - (this.delta % this.interval);

			this.frameCount++;
			this.setState({
				frameCount:this.frameCount 
			})

			this.sprites.map((item: any) => {
				if(!item) return;

				if(!item.props.active){
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


	mouseMove(event: any) {
		let elm:any = document.getElementById("stage");
		let coords = this.getRelativeCoordinates(event, elm);
	//	console.log("Where is my mouse??", coords);
		//console.log("Coordinates", coords, elm.offsetWidth, elm.offsetHeight);

		// coords = {
		// 	x:(coords.x / elm.offsetWidth)*100,
		// 	y:(coords.y / elm.offsetHeight)*100,
		// }

		this.setState({
			input: { axis: { x: coords.x, y: coords.y } }
		});
	}
	mouseDown(event: any) {
		this.setState({
			input: { 
				axis: { x: this.state.input.axis.x, y: this.state.input.axis.y },
				fireDown: true 
			}
		});
	}
	mouseUp(event: any) {
		this.setState({
			input: { 
				axis: { x: this.state.input.axis.x, y: this.state.input.axis.y },
				fireDown: false 
			}
		});
	}


	getRelativeCoordinates (event:any, element:any){

		const position = {
		  x: event.pageX,
		  y: event.pageY
		};
	  
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
			<div id="stage" onMouseMove={this.mouseMove.bind(this)} onMouseDown={this.mouseDown.bind(this)} onMouseUp={this.mouseUp.bind(this)} className="game" style={style}>
				{this.state.children}
			</div>
		)
	}

}

export default Stage;
