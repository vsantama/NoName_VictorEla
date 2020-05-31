import Blocker from "./Blocker.js";

export default class SilverBoulder extends Blocker{

    constructor(Scene, x, y){
        super(Scene, x, y, 'sil_boulder');
        Scene.parent = Scene; 
        this.name = "silver";
        Scene.add.existing(this);
    }

    static preloadBoulder(Game){
        Game.load.image('sil_boulder', './stuff/img/Assets/Sprites/bsilver_boulder.png');
    }
}