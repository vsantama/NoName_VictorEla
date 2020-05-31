import Blocker from "./stuff/js/Blocker.js";
import CopperBoulder from "./stuff/js/CopperBoulder.js";
import SilverBoulder from "./stuff/js/SilverBoulder.js";
import GoldBoulder from "./stuff/js/GoldBoulder.js";
import Snake from './stuff/js/Snake.js';
import PowerUps from './stuff/js/PowerUps.js';

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
    this.load.spritesheet('life', './stuff/img/Assets/Sprites/hearts_196x56.png', {frameWidth:196, frameHeight:56});
    this.load.image('sandtiles', './stuff/img/Assets/map/beach_tiles_64x32.png');
    this.load.tilemapTiledJSON('beach_light', './stuff/img/Assets/map/beach_light.json');
    CopperBoulder.preloadBoulder(this);
    SilverBoulder.preloadBoulder(this);
    GoldBoulder.preloadBoulder(this);
    Snake.preloadSnake(this);
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  create() {
    //VARIABLES
    this.direction = 'right';
    let m = Math.random() * (5 - 0) + 0;
    console.log(m);
    this.cont = 0;
   //BACKGROUND
   this.clouds = this.add.tileSprite(0, 400, 60000, 800, "clouds");
   this.sea = this.add.tileSprite(0, 400, 60000, 800, 'sea');
   this.sand = this.add.tileSprite(0, 400, 60000, 800, 'sand');
   //PLAYER'S LIFE
   this.life = this.add.sprite(150, 80, "life");
   this.life.setFrame(3);
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
   this.player.myGame = this;
   this.player.move = true;
   this.physics.add.collider(this.player, this.groundLayer);
   
  this.testsnek = this.add.sprite(200, 570, "snake");
  this.testsnek.setScale(3);
  this.testsnek.state = 0;
   //COLLLISION GROUPS
   this.powerups = this.physics.add.staticGroup();
   this.blockers = this.physics.add.staticGroup(); 
   this.snakes = this.physics.add.staticGroup();
   this.physics.add.collider(this.snakes, this.groundLayer);
   this.snakes.classType = Phaser.Physics.Arcade.Sprite;


   //CREATION OF POWERUPS

   //CREATION OF BLOCKERS
   var i;
   var n = 5;
   for (i = 0; i < n; i++){
     if (i === 0){
      let firstcop = new CopperBoulder(this, this.getRandomArbitrary(250, (10000/n)*(i+1)), 570);
      this.blockers.add(firstcop);
     }
     else if (i===2){
      //let snake_e = new Snake(this, this.getRandomArbitrary((10000/n)*i, (10000/n)*(i+1)), 470);
      let snake_e = new Snake(this, 300, 470);
      snake_e.setScale(4);
      /*this.physics.add.existing(snake_e);
      
      console.log(snake_e);
      this.physics.add.collider(snake_e, this.groundLayer);
      snake_e.setImmovable(true);*/
      this.snakes.add(snake_e);
     }
     else{
      let cop = new CopperBoulder(this, this.getRandomArbitrary((10000/n)*i, (10000/n)*(i+1)), 570);
      this.blockers.add(cop);
     }
  }
  for (i = 0; i < n; i++){
    if (i===2){
      let snake_m = new Snake(this, this.getRandomArbitrary(10000 + (10000/n)*i, 10000 + (10000/n)*(i+1)), 470);
      snake_m.setScale(4);
      this.snakes.add(snake_m);

     }
    else{
      let sil = new SilverBoulder(this, this.getRandomArbitrary(10000 + ((10000/n)*i), 10000 + ((10000/n)*(i+1))), 570);
      this.blockers.add(sil);
    }
  }
  for (i = 0; i < n; i++){
    if (i===2){
      let snake_h = new Snake(this, this.getRandomArbitrary(20000 + (10000/n)*i, 20000 + (10000/n)*(i+1)), 470);
      snake_h.setScale(4);
      this.snakes.add(snake_h);
     }
    else{
    let gol = new GoldBoulder(this, this.getRandomArbitrary(20000 + ((10000/n)*i), 20000 + ((10000/n)*(i+1))), 570);
    this.blockers.add(gol);
    }
  }
   ////////////////////////////////////////////////////////////////////////////////
  console.log(this.blockers.getChildren());
  console.log(this.snakes.getChildren());

  //COLLISIONS
  this.physics.add.collider(this.player, this.blockers, function(player, blocker){
    this.launched = false;
    if (this.launched == false){
      player.myGame.scene.launch('typing', {lock: this.lock, dif: player.myGame.dif, enemy: "boulder"});
      player.move = false;
      //console.log(player.myGame)
    }
  });

  this.physics.add.collider(this.player, this.snakes, function(player, snake){
    this.launched = false;
    if (this.launched == false){
      snake.SnakeIdle();
      player.myGame.scene.launch('typing', {lock: this.lock, dif: player.myGame.dif, enemy: "snake"});
      player.move = false;

      //console.log("snake.SnakeIdle"); ->getsHere
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
   this.myCam.setBounds(0, 0, 30000, 800);

   // making the camera follow the player
   this.myCam.startFollow(this.player);

   this.cursors = this.input.keyboard.createCursorKeys();
   this.escape = this.input.keyboard.addKey('ESC');

  }

  update(time, delta) {
    //this.testsnek.play("snake_idle", true);
    if (this.cursors.left.isDown && this.player.x > 55){ 
      if(this.player.move == true){
        this.player.play("run_flip", true);
      this.direction = 'left';   
      this.player.body.setVelocityX(-400);
      this.player.scaleX = 1;
      this.clouds.tilePositionX -= 0.5;
      this.sea.tilePositionX -= 1;
      this.sand.tilePositionX -= 2; 
      } 
  
    } else if (this.cursors.right.isDown) {
      if(this.player.move == true){
        this.player.play("run", true);   
        this.direction = 'right';
        this.player.body.setVelocityX(400);
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
    } 
     else if ((this.cursors.space.isDown || this.cursors.up.isDown) && (this.player.body.onFloor())){
      console.log(this.blockers.getChildren());
      if(this.player.move == true){
        this.player.body.setVelocityY(-400);
        console.log(this.dif);
        if (this.direction == 'right')  this.player.play('jump', true);
        else this.player.play('jump_flip', true);
      }
     }

     //wont go if pressed once after pausing before
     else if (Phaser.Input.Keyboard.JustDown(this.escape)){
      this.scene.pause('game');
      this.scene.launch('pause', {lock: this.lock, char: this.char});
    }

     else{
      this.player.body.setVelocityX(0);
      if (this.player.body.onFloor()) {
        if (this.direction == 'right') this.player.play('idle', true);
        else this.player.play('idle_flip', true);
      }
     }

     ///////////////////////
     if (this.player.x > 10000 && this.player.x < 20000){
        this.dif = 'medium';
     }
    else if (this.player.x > 20000){
      this.dif = 'hard';
     }
     
     let self = this;
     this.snakes.getChildren().forEach(function (block) {
      if (self.cont === 0) {
        console.log(block.state);
        self.cont++;
      }
  
        
        switch(block.state){
          case 0: 
            //console.log("block.state switch"); -> gets here
            block.play("snake_idle", true); break; //even if you do .anims it doesnt work
          case 1: block.anims.play("snake_attack", true); break;
          case 2: block.anims.play("snake_die", true); break;
         }
       
      });
    }    
}