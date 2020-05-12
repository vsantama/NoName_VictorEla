export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'game' });
  }

 /* init (data){
    this.char = data.char;
}*/
  preload() {  
    this.load.image('clouds', './stuff/img/Assets/Backgrounds/clouds.png');
    this.load.image('sand', './stuff/img/Assets/Backgrounds/sand.png');
    this.load.image('sea', './stuff/img/Assets/Backgrounds/sea.png');
    this.load.spritesheet('shiba', './stuff/img/Assets/Sprites/characters_enemies/shiba/shiba.png', {frameWidth:150, frameHeight:208});
    this.load.image('sandtiles', './stuff/img/Assets/map/beach_tiles_52x36.png');
    this.load.tilemapTiledJSON('map1', './stuff/img/Assets/map/map1.json');
   // this.load.image('stone', './stuff/img/Assets/Sprites/stone1_big.png');
  }//images, sprites, etc

  create() {

   //BACKGROUND
   this.clouds = this.add.tileSprite(0, 400, 30000, 800, "clouds");
   this.sea = this.add.tileSprite(0, 400, 30000, 800, 'sea');
   this.sand = this.add.tileSprite(0, 400, 30000, 800, 'sand');
   
    //MAPS
  this.map = this.make.tilemap({
    key: 'map1',
    tileWidth: 52,
    tileHeight: 36
  });
  this.map.addTilesetImage('beach_tiles_52x36',  'sandtiles');
  this.groundLayer = this.map.createStaticLayer('ground', 'beach_tiles_52x36');
  this.groundLayer.setCollisionByExclusion(-1, true);

   //PLAYER
   this.player = this.add.sprite(100, 500, "shiba");
   this.physics.add.existing(this.player);
   this.player.body.setCollideWorldBounds(true);
   this.physics.add.collider(this.player, this.groundLayer);
  
   //doesnt work
   this.anims.create({
    key: 'run',
    frameRate: 7,
    frames: this.anims.generateFrameNumbers("shiba", {
     frames: [0,1,2,3,4,5,6,7,8,9,10,11]
       })
  });

   this.anims.create({
     key: 'jump',
     frameRate: 4,
     frames: this.anims.generateFrameNumbers("shiba", {
      frames: [12,13,14]
        })
   });

   this.anims.create({
    key: 'idle',
    frameRate: 5,
    repeat: -1,
    frames: this.anims.generateFrameNumbers("shiba", {
     frames: [4,19]
       })
  });
  
   
   this.player.play("idle");
   this.myCam = this.cameras.main;
   this.myCam.setBounds(0, 0, 3000, 800);

    // making the camera follow the player
   this.myCam.startFollow(this.player);

   this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time, delta) { 
      
      // Para elegir un numero entre 0 y 84: var number =Math.floor(Math.random() * (84 - 0));
    
    if (this.cursors.left.isDown && this.player.x > 55) { 
      this.player.play("run", true);   
      this.player.body.setVelocityX(-200);
      //change this
      this.player.scaleX = 1;
      this.clouds.tilePositionX -= 0.5;
      this.sea.tilePositionX -= 1;
      this.sand.tilePositionX -= 2; 

    } else if (this.cursors.right.isDown && this.player.x < 3000) {
      this.player.play("run", true);   
      
      this.player.body.setVelocityX(200);
      if (this.player.x < 1000){
        this.clouds.tilePositionX += 0.5;
        this.sea.tilePositionX += 1;
        this.sand.tilePositionX += 2; 
      this.player.scaleX = 1;
      
    }
      else{
      this.player.scaleX = 1;
      this.clouds.tilePositionX += 0.8;
      this.sea.tilePositionX += 1.5;
      this.sand.tilePositionX += 3; 
      }
      
    } 
     else if ((this.cursors.space.isDown || this.cursors.up.isDown) && (this.player.body.onFloor())){
       this.player.body.setVelocityY(-400);
       this.player.play('jump', true);
     }

     //doesn't work
     else if (this.cursors.down.isDown){
      this.scene.pause('game');
      this.scene.launch('pause');
    }

     else{
      this.player.body.setVelocityX(0);
      // Only show the idle animation if the player is footed
      // If this is not included, the player would look idle while jumping
      if (this.player.body.onFloor()) {
        this.player.play('idle', true);
      }
     }
     
  }    
}