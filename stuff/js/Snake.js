import Blocker from "./Blocker.js";

export default class Snake extends Blocker{

    constructor(Scene, x, y){
        super(Scene, x, y, 'snake');
        Scene.parent = Scene; 
        Scene.add.existing(this);
        this.state = 0;
        this.name = "snake";
        Scene.anims.create({
            key: 'snake_idle',
            frameRate: 5,
            repeat: 0,
            frames: Scene.anims.generateFrameNumbers("snake", {
             frames: [0, 1, 2, 3, 4]
               })
          });
        Scene.anims.create({
            key: 'snake_attack',
            frameRate: 5,
            repeat: 0,
            frames: Scene.anims.generateFrameNumbers("snake", {
             frames: [5, 6, 7, 8, 9]
               })
          });
        Scene.anims.create({
            key: 'snake_die',
            frameRate: 5,
            repeat: 0,
            frames: Scene.anims.generateFrameNumbers("snake", {
             frames: [10, 11, 12, 13, 14]
               })
          });
    }

    static preloadSnake(Game){
        Game.load.spritesheet('snake', './stuff/img/Assets/Sprites/characters_enemies/snake_spritesheet.png', {frameWidth:42, frameHeight:65});
        Game.load.audio('snake_dies', './stuff/img/Assets/Sounds/Sound_FX/snake_Hiss.mp3');
        Game.load.audio('snake_attacks', './stuff/img/Assets/Sounds/Sound_FX/snake_attack.mp3');
    }

    preUpdate(t, dt){
       super.preUpdate(t, dt);
    }

    SnakeIdle(){
        //console.log("SnakeIdle"); -> gets here
        this.state = 0;
    }

    SnakeDie(){
        this.state = 2;
    }

    SnakeAttack(){
        this.state = 1;
    }
}