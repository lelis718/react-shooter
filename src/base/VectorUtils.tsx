import React, { Component, ReactNode } from 'react';

interface Vector{
	x:number,
	y:number
}

class VectorUtils  {

	static add(v1:Vector, v2:Vector):Vector{
		//console.log("Adding", v1, v2,{x:v1.x+v2.x, y:v1.y+v2.y});
		return {x:v1.x+v2.x, y:v1.y+v2.y}
	}

	static subtract(v1:Vector, v2:Vector):Vector{
		//console.log("Subtract", v1, v2,{x:v1.x-v2.x, y:v1.y-v2.y});
		return {x:v1.x-v2.x, y:v1.y-v2.y}
	}
	static multiply(v1:Vector,factor:number):Vector{
		//console.log("Multiply", v1, factor,{x:factor*v1.x, y:factor*v1.y});
		return {x:factor*v1.x, y:factor*v1.y}
	}
	static divide(v1:Vector,factor:number){
		if(factor == 0) return v1;
		//console.log("Divide", v1, factor,{x:v1.x/factor, y:v1.y/factor});
		return {x:v1.x/factor, y:v1.y/factor}
	}
	static magnitude(v:Vector):number{
		//console.log("Magnitude", v, Math.sqrt((v.x*v.x)+(v.y*v.y)));
		return Math.sqrt((v.x*v.x)+(v.y*v.y));
	}
	static distance(v1:Vector, v2:Vector):number{
		return VectorUtils.magnitude(VectorUtils.subtract(v1, v2));
	}
	static normalize(v1:Vector, magnitude=1){
		return VectorUtils.multiply(VectorUtils.divide(v1, VectorUtils.magnitude(v1)),magnitude);
	}
}

export default VectorUtils;
