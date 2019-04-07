export class PseudoRandom{

	private seed = 1;

	constructor(seed: number) {
		this.seed = seed;
	}

	public random() {
		var x = Math.sin(this.seed++) * 10000;
		return x - Math.floor(x);
	}	
}