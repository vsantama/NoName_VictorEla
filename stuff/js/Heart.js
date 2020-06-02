import PowerUps from './PowerUps.js';

export default class Heart extends PowerUps{

    constructor(Scene, x, y){
        super(Scene, x, y, 'heart');
        Scene.parent = Scene;
        this.name = "heart";
        Scene.add.existing(this);
        Scene.anims.create({
            key: 'heart_move',
            frameRate: 8,
            repeat: -1,
            frames: Scene.anims.generateFrameNumbers("heart", {
             frames: [0, 1, 2, 3, 4, 5, 6, 7]
               })
          });
    }

    static preloadHeart(Game){
        Game.load.spritesheet('heart', './stuff/img/Assets/Sprites/heart_animation.png', {frameWidth:62, frameHeight:56});
        Game.load.audio('pickup', './stuff/img/Assets/Sounds/Sound_FX/random_generic_cute_sound.mp3');
    }
}