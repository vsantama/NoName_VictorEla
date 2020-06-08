import Player  from './Player.js';

export default class GerShep extends Player{

    constructor(Scene, x, y){
        super(Scene, x, y, 'ger');
        Scene.parent = Scene;
        this.name = "ger_shep";
        Scene.add.existing(this);
        this.myGame = Scene;
        this.move = true;
        this.speed = 430;
        
          Scene.anims.create({
            key: 'grun',
            frameRate: 10,
            frames:  Scene.anims.generateFrameNumbers("ger", {
             frames: [0, 1, 2, 3, 4, 5]
               })
          });
         
          Scene.anims.create({
            key: 'grun_flip',
            frameRate: 10,
            frames:  Scene.anims.generateFrameNumbers("ger_flip", {
             frames: [0, 1, 2, 3, 4, 5]
               })
          });
        
          Scene.anims.create({
             key: 'gjump',
             frameRate: 4,
             frames:  Scene.anims.generateFrameNumbers("ger", {
              frames: [6, 7, 8]
                })
           });
        
           Scene.anims.create({
            key: 'gjump_flip',
            frameRate: 4,
            frames:  Scene.anims.generateFrameNumbers("ger_flip", {
             frames: [6, 7, 8]
               })
          });
        
          Scene.anims.create({
            key: 'gidle',
            frameRate: 5,
            repeat: -1,
            frames:  Scene.anims.generateFrameNumbers("ger", {
             frames: [2, 4]
               })
          });
        
          Scene.anims.create({
            key: 'gidle_flip',
            frameRate: 5,
            repeat: -1,
            frames:  Scene.anims.generateFrameNumbers("ger_flip", {
             frames: [2, 4]
               })
          });
    }

    static preloadShep(Game){
        Game.load.spritesheet('ger', './stuff/img/Assets/Sprites/characters_enemies/german_shepherd/shep_spritesheet.png', {frameWidth:125, frameHeight:185});
        Game.load.spritesheet('ger_flip', './stuff/img/Assets/Sprites/characters_enemies/german_shepherd/shep_spritesheet_flipped.png', {frameWidth:125, frameHeight:185});
    }
}