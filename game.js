export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'game' });
  }

 /* init (data){
    this.char = data.char;
}*/
  preload() {  
    this.load.image('front_shiba', './stuff/img/Assets/Sprites/boulder.png');
    this.load.image('clouds', './stuff/img/Assets/Backgrounds/clouds.png');
    this.load.image('sand', './stuff/img/Assets/Backgrounds/sand.png');
    this.load.image('sea', './stuff/img/Assets/Backgrounds/sea.png');
    this.load.spritesheet('shiba', './stuff/img/Assets/Sprites/characters_enemies/shiba/shiba.png', {frameWidth:150, frameHeight:208});
  }//images, sprites, etc

  create() {//"poner las cosas"
   this.clouds = this.add.tileSprite(700, 400, 3000, 800, "clouds");
   this.sea = this.add.tileSprite(700, 400, 3000, 800, 'sea');
   this.sand = this.add.tileSprite(700, 400, 3000, 800, 'sand');

   this.player = this.add.sprite(600, 600, "shiba");

   this.anims.create({
     key: "run",
     frameRate: 7,
     repeat: -1,
     frames: this.anims.generateFrameNumbers("shiba", {
      frames: [0,1,2,3,4,5,6,7,8,9,10,11]
        })
   });
   
   this.player.play("run");
   this.myCam = this.cameras.main;
    this.myCam.setBounds(0, 0, 3000, 800);

    // making the camera follow the player
   this.myCam.startFollow(this.player);

   this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time, delta) { 
    
    if (this.cursors.left.isDown && this.player.x > 0) {
      
      this.player.x -= 3;
      this.player.scaleX = -1;
      this.clouds.tilePositionX -= 0.5;
      this.sea.tilePositionX -= 1;
      this.sand.tilePositionX -= 2; 

    } else if (this.cursors.right.isDown && this.player.x < 3000) {
      this.player.x += 3;
      this.player.scaleX = 1;
      this.clouds.tilePositionX += 0.5;
      this.sea.tilePositionX += 1;
      this.sand.tilePositionX += 2; 
    }
    //this.clouds.tilePositionX += 0.5;
    //this.sea.tilePositionX += 1;
   // this.sand.tilePositionX += 2;   
  }
}