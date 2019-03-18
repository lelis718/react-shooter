import React, { Component, ReactNode } from 'react';

class Stage extends Component {

	public state = {
		input: {
			axis: { x: 0, y: 0 },
			fireDown: false
		}
	}
	public sprites: any[] = []

	private fps:number;
	private now:number;
	private then:number;
	private interval:number;
	private delta:number;
	private frameCount:number;


	constructor(public props: any) {
		super(props);
		
		this.fps = 30;
		this.now = Date.now();
		this.then = Date.now();
		this.interval = 1000/this.fps;
		this.delta = 0;
		this.frameCount = 0;
	}

	setSprite = (sprite: any) => {
		this.sprites.push(sprite);
	}

	componentDidMount() {
		requestAnimationFrame(this.frameLoop);
	}

		
	
	frameLoop = () => {
	
		requestAnimationFrame(this.frameLoop);
	
		this.now = Date.now();
		this.delta = this.now - this.then;
		 
		if (this.delta > this.interval) {
			// update time stuffs
			 
			// Just `then = now` is not enough.
			// Lets say we set fps at 10 which means
			// each frame must take 100ms
			// Now frame executes in 16ms (60fps) so
			// the loop iterates 7 times (16*7 = 112ms) until
			// delta > interval === true
			// Eventually this lowers down the FPS as
			// 112*10 = 1120ms (NOT 1000ms).
			// So we have to get rid of that extra 12ms
			// by subtracting delta (112) % interval (100).
			// Hope that makes sense.
			 
			this.then = this.now - (this.delta % this.interval);

			// ... Code for Drawing the Frame ...
			this.frameCount++;
			this.setState({
				frameCount:this.frameCount
			})

			this.sprites.map((item: any) => {
				item.update(this.state,this.delta)
			});
		}

	}




	mouseMove(event: any) {
		let elm:any = document.getElementById("stage");
		let coords = this.getRelativeCoordinates(event, elm);
		//console.log("Coordinates", coords, elm.offsetWidth, elm.offsetHeight);

		coords = {
			x:(coords.x / elm.offsetWidth)*100,
			y:(coords.y / elm.offsetHeight)*100,
		}

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
			overflow:'hidden'
		}
		const wrappedChildren: any[] = [];
		React.Children.map(this.props.children, (child, i) => {
			if (!child) return;
			let spriteName = "sprite-" + i;
			wrappedChildren.push(React.cloneElement(child, {
				key: spriteName,
				ref: this.setSprite
			}));
		});
		return (
			<div id="stage" onMouseMove={this.mouseMove.bind(this)} onMouseDown={this.mouseDown.bind(this)} onMouseUp={this.mouseUp.bind(this)} className="game" style={style}>
				{wrappedChildren}
			</div>
		)
	}

}

export default Stage;
