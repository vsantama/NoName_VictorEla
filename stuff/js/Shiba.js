import Player  from './Player.js';

export default class Shiba extends Player{

    constructor(Scene, x, y){
        super(Scene, x, y, 'shiba');
        Scene.parent = Scene;
        this.name = "shiba";
        Scene.add.existing(this);
        this.myGame = Scene;
        this.move = true;
        this.speed = 400;
        
          Scene.anims.create({
            key: 'run',
            frameRate: 10,
            frames:  Scene.anims.generateFrameNumbers("shiba", {
             frames: [0,1,3,4,5,6,8,9,10,11]
               })
          });
         
          Scene.anims.create({
            key: 'run_flip',
            frameRate: 10,
            frames:  Scene.anims.generateFrameNumbers("shiba_flip", {
             frames: [0,1,3,4,5,6,8,9,10,11]
               })
          });
        
          Scene.anims.create({
             key: 'jump',
             frameRate: 4,
             frames:  Scene.anims.generateFrameNumbers("shiba", {
              frames: [12,13,14]
                })
           });
        
           Scene.anims.create({
            key: 'jump_flip',
            frameRate: 4,
            frames:  Scene.anims.generateFrameNumbers("shiba_flip", {
             frames: [12,13,14]
               })
          });
        
          Scene.anims.create({
            key: 'idle',
            frameRate: 5,
            repeat: -1,
            frames:  Scene.anims.generateFrameNumbers("shiba", {
             frames: [3,19]
               })
          });
        
          Scene.anims.create({
            key: 'idle_flip',
            frameRate: 5,
            repeat: -1,
            frames:  Scene.anims.generateFrameNumbers("shiba_flip", {
             frames: [3,19]
               })
          });
    }

    static preloadShiba(Game){
        Game.load.spritesheet('shiba', './stuff/img/Assets/Sprites/characters_enemies/shiba/shiba_spritesheet.png', {frameWidth:126, frameHeight:194});
        Game.load.spritesheet('shiba_flip', './stuff/img/Assets/Sprites/characters_enemies/shiba/shiba_spritesheet_flipped.png', {frameWidth:126, frameHeight:194});
    }
}