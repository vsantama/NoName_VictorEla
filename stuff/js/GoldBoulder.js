import Blocker from "./Blocker.js";

export default class GoldBoulder extends Blocker{

    constructor(Scene, x, y){
        super(Scene, x, y, 'gol_boulder');
        Scene.parent = Scene; //esto es un poco guarro
        Scene.add.existing(this);
    }

    static preloadBoulder(Game){
        Game.load.image('gol_boulder', './stuff/img/Assets/Sprites/bgold_boulder.png');
    }

}