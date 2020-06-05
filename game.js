import Blocker from "./stuff/js/Blocker.js";
import CopperBoulder from "./stuff/js/CopperBoulder.js";
import SilverBoulder from "./stuff/js/SilverBoulder.js";
import GoldBoulder from "./stuff/js/GoldBoulder.js";
import Snake from './stuff/js/Snake.js';
import PowerUps from './stuff/js/PowerUps.js';
import Heart from './stuff/js/Heart.js';
import Potion from "./stuff/js/Potion.js";
import Player from "./stuff/js/Player.js";
import Shiba from "./stuff/js/Shiba.js";

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
    this.load.image('sandtiles', './stuff/img/Assets/map/beach_tiles_64x32.png');
    this.load.tilemapTiledJSON('beach_light', './stuff/img/Assets/map/beach_light.json');
    this.load.audio('jump', './stuff/img/Assets/Sounds/Sound_FX/jump.mp3');
    this.load.audio('pickup', './stuff/img/Assets/Sounds/Sound_FX/random_generic_cute_sound.mp3');
    this.load.audio('pausegame', './stuff/img/Assets/Sounds/Sound_FX/pause_game_2.mp3');
    CopperBoulder.preloadBoulder(this);
    SilverBoulder.preloadBoulder(this);
    GoldBoulder.preloadBoulder(this);
    Snake.preloadSnake(this);
    Heart.preloadHeart(this);
    Potion.preloadPotion(this);
    Shiba.preloadShiba(this);
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  create() {
    //VARIABLES
    this.direction = 'right';
    let m = Math.random() * (5 - 0) + 0;
    this.cont = 0;
    this.potion = false;
    this.snakeCanDie = false;
   //BACKGROUND
   this.clouds = this.add.tileSprite(0, 400, 60000, 800, "clouds");
   this.sea = this.add.tileSprite(0, 400, 60000, 800, 'sea');
   this.sand = this.add.tileSprite(0, 400, 60000, 800, 'sand');
   
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
   this.player = new Shiba (this, 100, 500);
   this.physics.add.existing(this.player).setDepth(3);;
   this.physics.add.collider(this.player, this.groundLayer);
   
   //COLLLISION GROUPS
   this.powerups = this.physics.add.staticGroup();
   this.blockers = this.physics.add.staticGroup(); 
   this.snakes = this.physics.add.staticGroup();
   this.physics.add.collider(this.snakes, this.groundLayer);
   this.snakes.classType = Phaser.Physics.Arcade.Sprite;


   //CREATION OF POWERUPS
   var oz = Math.round(Math.random());
   switch(oz){
    case 0: let heart = new Heart(this, this.getRandomArbitrary(7000, 13000), 330);
      heart.anims.play("heart_move", true);
      this.powerups.add(heart);
      let potion = new Potion(this, this.getRandomArbitrary(13100, 20000), 360);
      potion.anims.play("potion_move", true);
      this.powerups.add(potion);
      break;
    case 1: let potion_ = new Potion(this, this. getRandomArbitrary(7000, 13000), 330);
    potion_.anims.play("potion_move", true);
    this.powerups.add(potion_);
    let heart_ = new Heart(this, this.getRandomArbitrary(13100, 20000), 330);
    heart_.anims.play("heart_move", true);
    this.powerups.add(heart_);
      break;
   }
   //CREATION OF BLOCKERS
   var i;
   var n = 5;
   for (i = 0; i < n; i++){
     if (i === 0){
      let firstcop = new CopperBoulder(this, this.getRandomArbitrary(250, (10000/n)*(i+1)), 570);
      this.blockers.add(firstcop);
     }
     else if (i===2){
      let snake_e = new Snake(this, 300, 470);
      //let snake_e = new Snake(this, this.getRandomArbitrary((10000/n)*i, (10000/n)*(i+1)), 470);
      snake_e.setScale(4);
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
    if (i===4){
      let lastgol = new GoldBoulder(this, this.getRandomArbitrary(20000 + ((10000/n)*i), 29900), 570);
      this.blockers.add(lastgol);
     }
    else if (i===2){
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
  //console.log(this.blockers.getChildren());
  //console.log(this.snakes.getChildren());

  //COLLISIONS
  this.physics.add.collider(this.player, this.blockers, function(player, blocker){
    this.launched = false;
    console.log("potion " + player.myGame.potion);
    switch(blocker.name){
      case "copper": player.myGame.dif = "easy"; break;
      case "silver": player.myGame.dif = "medium"; break;
      case "gold": player.myGame.dif = "hard"; break;
    }
    if (this.launched == false){
      player.myGame.scene.launch('typing', {lock: this.lock, dif: player.myGame.dif, enemy: "boulder"});
      player.move = false;
    }
  });

  this.physics.add.collider(this.player, this.snakes, function(player, snake){
    this.launched = false;
    if (this.launched == false){
      player.myGame.scene.launch('typing', {lock: this.lock, dif: player.myGame.dif, enemy: "snake"});
      player.move = false;
    }
  });
  this.infoEmitter = new Phaser.Events.EventEmitter();

  //OVERLAPS
  this.physics.add.overlap(this.player, this.powerups, function(player, powerup){
    player.myGame.sound.play('pickup', {volume: 0.6, loop: false});
    if (powerup.name == "heart"){
      player.myGame.infoEmitter.emit('heart_pickup');
      powerup.destroy();
    }
    else{
      player.myGame.infoEmitter.emit('potion_pickup');
      powerup.destroy();
    }
  });
   
  
   
   this.player.play("idle");
   this.myCam = this.cameras.main;
   this.myCam.setBounds(0, 0, 30000, 800);

   // making the camera follow the player
   this.myCam.startFollow(this.player);

   //KEYS
   this.cursors = this.input.keyboard.createCursorKeys();
   this.escape = this.input.keyboard.addKey('ESC');

   //INFO SCENE
   this.scene.launch('pinfo', {emitter: this.infoEmitter});

  }

  update(time, delta) {
    ///SNAKE DEATH
    if (this.snakeCanDie){
      this.time.delayedCall(1000, function(){
        this.snakes.getFirst(true).destroy();
        }, null, this); 

        this.snakeCanDie = false;
    }
    //KEYBOARD INPUT
    if(this.cursors.left.isDown  || this.cursors.right.isDown || (this.cursors.space.isDown || this.cursors.up.isDown)){

      this.infoEmitter.emit('dogUpdate');

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
       if (this.cursors.up.isDown && this.player.body.onFloor()){
        if(this.player.move == true){
          this.sound.play('jump', {volume: 0.4, loop: false});
          this.player.body.setVelocityY(-400);
          console.log(this.dif);
          if (this.direction == 'right')  this.player.play('jump', true);
          else this.player.play('jump_flip', true);
        }
       }

    }
    

     else{
      this.player.body.setVelocityX(0);
      if (this.player.body.onFloor()) {
        if (this.direction == 'right') this.player.play('idle', true);
        else this.player.play('idle_flip', true);
      }
     }
     //wont go if pressed once after pausing before
     if (Phaser.Input.Keyboard.JustDown(this.escape)){
      this.sound.play('pausegame', {volume: 0.3, loop: false});
      this.scene.pause('game');
      this.scene.launch('pause', {lock: this.lock, char: this.char});
    }

    if (this.cursors.space.isDown){
      if (this.potion){
        this.potion = false;
        this.infoEmitter.emit('deletePotion');
        //make shark stop for a little bit
      }
    }
 
     this.snakes.getChildren().forEach(function (block) {

        switch(block.state){
          case 0: block.play("snake_idle", true); break; 
          case 1: 
            block.anims.play("snake_attack", true); break;
          case 2: 
            block.anims.play("snake_die", true); break;
         }
       
      });
    }   
    
    playerDie(){
      this.scene.stop("pause");
      this.scene.stop("pinfo");
      this.scene.stop("typing");
      this.scene.stop();
      this.scene.start('deathScene', {lock: this.lock, char: this.char});
    }
}