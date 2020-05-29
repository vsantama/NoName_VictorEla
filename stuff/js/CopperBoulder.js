import Blocker from "./Blocker.js";

export default class CopperBoulder extends Blocker{

    constructor(Scene, x, y){
        super(Scene, x, y, 'cop_boulder');
        Scene.parent = Scene; 
        Scene.add.existing(this);
        }

    static preloadBoulder(Game){
        Game.load.image('cop_boulder', './stuff/img/Assets/Sprites/bcopper_boulder.png');
    }
}