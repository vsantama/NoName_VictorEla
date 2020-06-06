export default class Shark extends Phaser.Physics.Arcade.Sprite{

    constructor(Scene, x, y){
        super(Scene, x, y, 'shark');
        Scene.parent = Scene;
        this.name = "shark";
        Scene.add.existing(this);
        this.myGame = Scene;
        this.move = false;
        this.speed = 210;
        
          Scene.anims.create({
            key: 'shark_run',
            frameRate: 8,
            repeat: -1,
            frames:  Scene.anims.generateFrameNumbers("shark", {
             frames: [0, 1, 2, 3, 4, 5, 6]
               })
          });
         
    }

    static preloadShark(Game){
        Game.load.spritesheet('shark', './stuff/img/Assets/Sprites/characters_enemies/shark.png', {frameWidth:300, frameHeight:245});
    }
}