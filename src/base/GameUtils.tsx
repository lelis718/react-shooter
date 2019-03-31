export class GameUtils{
	public static GenerateUID(){
		return Math.random().toString(36).substring(2) 
               + (new Date()).getTime().toString(36);
	}
}