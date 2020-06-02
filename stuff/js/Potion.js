import PowerUps from './PowerUps.js';

export default class Potion extends PowerUps{

    constructor(Scene, x, y){
        super(Scene, x, y, 'potion');
        Scene.parent = Scene;
        this.name = "potion";
        Scene.add.existing(this);
        Scene.anims.create({
            key: 'potion_move',
            frameRate: 8,
            repeat: -1,
            frames: Scene.anims.generateFrameNumbers("potion", {
             frames: [0, 1, 2, 3]
               })
          });
    }

    static preloadPotion(Game){
        Game.load.spritesheet('potion', './stuff/img/Assets/Sprites/potion.png', {frameWidth:48, frameHeight:88});
        Game.load.audio('pickup', './stuff/img/Assets/Sounds/Sound_FX/random_generic_cute_sound.mp3');
    }
}