import PowerUps from './stuff/js/PowerUps.js';

export default class Heart extends PowerUps{

    constructor(Scene, x, y){
        super(Scene, x, y, 'heart');
        Scene.parent = Scene;
    }

    static preloadHeart(Game){
        Game.load.spritesheet('heart', './stuff/img/Assets/Sprites/hearts_animation.png', {frameWidth:42, frameHeight:64});
        Game.load.audio('pickup', './stuff/img/Assets/Sounds/Sound_FX/random_generic_cute_sound.mp3');
    }
}