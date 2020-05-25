//import FormUtil from './stuff/js/FormUtil.js'

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'game' });
  }

 init (data){
    this.char = data.char;
    this.dif = data.dif;
    this.lock = data.lock;
  }
  preload() {  
    this.load.image('clouds', './stuff/img/Assets/Backgrounds/clouds.png');
    this.load.image('sand', './stuff/img/Assets/Backgrounds/sand.png');
    this.load.image('sea', './stuff/img/Assets/Backgrounds/sea.png');
    this.load.spritesheet('shiba', './stuff/img/Assets/Sprites/characters_enemies/shiba/shiba_spritesheet.png', {frameWidth:126, frameHeight:194});
    this.load.spritesheet('shiba_flip', './stuff/img/Assets/Sprites/characters_enemies/shiba/shiba_spritesheet_flipped.png', {frameWidth:126, frameHeight:194});
    this.load.image('sandtiles', './stuff/img/Assets/map/beach_tiles_64x32.png');
    this.load.image('cop_boulder', './stuff/img/Assets/Sprites/bcopper_boulder.png');
    this.load.tilemapTiledJSON('beach_light', './stuff/img/Assets/map/beach_light.json');
    this.load.audio('snake_dies', './stuff/img/Assets/Sounds/Sound_FX/snake_Hiss.mp3');
    this.load.audio('snake_attack', './stuff/img/Assets/Sounds/Sound_FX/snake_attack.mp3');
  }//images, sprites, etc

  create() {
    //VARIABLES
    this.direction = 'right';

   //BACKGROUND
   this.clouds = this.add.tileSprite(0, 400, 30000, 800, "clouds");
   this.sea = this.add.tileSprite(0, 400, 30000, 800, 'sea');
   this.sand = this.add.tileSprite(0, 400, 30000, 800, 'sand');
   
    //MAPS
  this.map = this.make.tilemap({
    key: 'beach_light',
    tileWidth: 64,
    tileHeight: 32
  });
  this.map.addTilesetImage('beach_tiles_64x32',  'sandtiles');
  this.groundLayer = this.map.createStaticLayer('ground', 'beach_tiles_64x32');
  this.groundLayer.setCollisionByExclusion(-1, true);

   //PLAYER                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
   this.player = this.add.sprite(100, 500, "shiba");
   this.physics.add.existing(this.player);
   this.player.body.setCollideWorldBounds(true);
   this.player.myGame = this;
   //this.player.lauched = false;
   this.physics.add.collider(this.player, this.groundLayer);
   

   //COLLLISION GROUPS
   this.boulder = this.add.sprite(350, 570, "cop_boulder");
   this.powerups = this.physics.add.staticGroup();
   this.blockers = this.physics.add.staticGroup(); 
   this.blockers.add(this.boulder);

  //COLLISIONS
  this.physics.add.collider(this.player, this.blockers, function(player, blocker){
    this.launched = false;
    if (this.launched == false){
      player.myGame.scene.launch('typing', {lock: this.lock, dif: player.myGame.dif});
      //Invalid Animation Key, or Key already in use:
    }
  });
  
   //doesnt work
   this.anims.create({
    key: 'run',
    frameRate: 10,
    frames: this.anims.generateFrameNumbers("shiba", {
     frames: [0,1,3,4,5,6,8,9,10,11]
       })
  });
 
  this.anims.create({
    key: 'run_flip',
    frameRate: 10,
    frames: this.anims.generateFrameNumbers("shiba_flip", {
     frames: [0,1,3,4,5,6,8,9,10,11]
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
    key: 'jump_flip',
    frameRate: 4,
    frames: this.anims.generateFrameNumbers("shiba_flip", {
     frames: [12,13,14]
       })
  });

   this.anims.create({
    key: 'idle',
    frameRate: 5,
    repeat: -1,
    frames: this.anims.generateFrameNumbers("shiba", {
     frames: [3,19]
       })
  });

  this.anims.create({
    key: 'idle_flip',
    frameRate: 5,
    repeat: -1,
    frames: this.anims.generateFrameNumbers("shiba_flip", {
     frames: [3,19]
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
  
    //  WORD CHOOSING
   
    //
    
    if (this.cursors.left.isDown && this.player.x > 55) { 
      this.player.play("run_flip", true);
      this.direction = 'left';   
      this.player.body.setVelocityX(-200);
      this.player.scaleX = 1;
      this.clouds.tilePositionX -= 0.5;
      this.sea.tilePositionX -= 1;
      this.sand.tilePositionX -= 2; 

      //wont move past 1337
      //tried to make the map a power of 2, doesn't seem to change anything
      //https://gamedevacademy.org/how-to-make-a-mario-style-platformer-with-phaser-3/?a=13
      //https://gamedevacademy.org/how-to-make-an-infinitely-scrolling-game-with-phaser/
    } else if (this.cursors.right.isDown) {
      this.player.play("run", true);   
      this.direction = 'right';
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
       console.log(this.player.x);
       if (this.direction == 'right')  this.player.play('jump', true);
       else this.player.play('jump_flip', true);
       
     }

     //wont go if pressed once after pausing before
     else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)){
      this.scene.pause('game');
      this.scene.launch('pause', {lock: this.lock});
    }

     else{
      this.player.body.setVelocityX(0);
      // Only show the idle animation if the player is footed
      // If this is not included, the player would look idle while jumping
      if (this.player.body.onFloor()) {
        if (this.direction == 'right') this.player.play('idle', true);
        else this.player.play('idle_flip', true);
      }
     }


  }    
}