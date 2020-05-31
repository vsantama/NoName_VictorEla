import PowerUps from './stuff/js/PowerUps.js';

export default class Potion extends PowerUps{

    constructor(Scene, x, y){
        super(Scene, x, y, 'potion');
        Scene.parent = Scene;
    }

    static preloadHeart(Game){
        Game.load.spritesheet('potion', './stuff/img/Assets/Sprites/potion.png', {frameWidth:48, frameHeight:88});
        Game.load.audio('pickup', './stuff/img/Assets/Sounds/Sound_FX/random_generic_cute_sound.mp3');
    }
}