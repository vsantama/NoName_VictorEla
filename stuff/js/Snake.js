import Blocker from "./Blocker.js";

export default class Snake extends Blocker{

    constructor(Scene, x, y){
        super(Scene, x, y, 'snake');
        Scene.parent = Scene; 
        Scene.add.existing(this);
    }

    static preloadSnake(Game){
        Game.load.spritesheet('snake', './stuff/img/Assets/Sprites/characters_enemies/snake_spritesheet.png', {frameWidth:42, frameHeight:64});
    }

    preUpdate(){

    }
}