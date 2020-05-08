export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'game' });
  }

 /* init (data){
    this.char = data.char;
}*/
  preload() {  
    this.load.image('boulder', './stuff/img/Assets/Sprites/boulder2.png');
    this.load.image('clouds', './stuff/img/Assets/Backgrounds/clouds.png');
    this.load.image('sand', './stuff/img/Assets/Backgrounds/sand.png');
    this.load.image('sea', './stuff/img/Assets/Backgrounds/sea.png');
    this.load.spritesheet('shiba', './stuff/img/Assets/Sprites/characters_enemies/shiba/shiba.png', {frameWidth:150, frameHeight:208});
    this.load.tilemapTiledJSON('map1', './stuff/img/Assets/map1.json');
    this.load.image('sandtiles', './stuff/img/Assets/Backgrounds/sand.png')
  }//images, sprites, etc

  //getRandomArbitrary(min, max) {
  //  return Math.random() * (max - min) + min;
  //}

  create() {
  //MAPS
  this.map = this.make.tilemap({
    key: 'map1',
    tileWidth: 32,
    tileHeight: 32
  });
  this.map.addTilesetImage('tiles', 'sandtiles');
  this.groundLayer = this.map.createStaticLayer('ground', 'tiles');
  this.groundLayer.setCollisionByExclusion(-1, true);

   //Word groups. 84 words in each group
   this.easyWords = ['act','bay','cut','dry','era','few','gym','hit','hot','ice','job','kid','log','may','new','one','pro',
   'red','sis','tea','use','blog','boat','crew','data','diner','eyes','else','film',
   'feed','feet','gold','grew','hall','hill','into','iron','join','jump','king','knew','know','lion','like','moon','menu',
   'none','note','null','over','open','post','pool','tiny','tips','user','upon','visa',
   'vast','walk','weak','yard','year','zack','asset','birds','catch','drink','eight','fifth','games','happy','juice','knife',
   'label','mount','night','occur','panel','queen','range','ships','thick','usage']
   this.mediumWords = ['agency','backup','crisis','figure','growth','joined','launch',
   'method','powder','affairs','average','disease','fashion','foreign','greatly','minimum','ongoing','analyst','bringing',
   'checking','eligible','directed','equipped','moment','reaction','straight','vacation','warranty','surprise','whatever',
   'internet','mountain','favourite','negative','election','division','calendar','action','friction','fiction','glorious',
   'homepage','lonely','monitor','secret','account','balance','capital','causing','brother','sister','factory','extreme',
   'sports','formula','initial','massive','located','tigers','picture','plastic','related','regular','language','twitter',
   'instagram','website','gravity','heating','soldier','skating','stating','vanilla','chocolate','coconut','cream','balloon',
   'bananas','aquatic','caption','needles', 'painting', 'sharpen','backpack']
   this.hardHords = ['acceptable','acquire','amateur','believe','conscience','column','conscious','definitely','drunkenness',
   'embarrassment','equipment','exceed','fiery','guarantee','gauge','harass','hierarchy','humorous','ignorance','immediate',
   'inoculate','jewelry','judgment','leisure','license','maintenance','miniature','maneuver','misspell','neighbor','noticeable',
   'occasionally','pastime','perseverance','pronunciation','privilege','questionnaire','receipt','recommend','rhyme','rhythm',
   'schedule','sergeant','threshold','twelfth','tyranny','vacuum','pharaoh','intelligence','handkerchief','necessary',
   'hypothetically','pneumonia','abolitionism','mortgage','awareness','establish','following','frequency','ourselves','pregnancy',
   'situation','somewhere','tradition','yesterday','addiction','wonderful','boyfriend','girlfriend','chemistry','mechanics',
   'objective','offensive','qualified','reactions','replacing','targeting','testament','volunteer','warehouse','workplace',
   'attractive','businesses','challenges']

   //BACKGROUND
   this.clouds = this.add.tileSprite(0, 400, 30000, 800, "clouds");
   this.sea = this.add.tileSprite(0, 400, 30000, 800, 'sea');
   this.sand = this.add.tileSprite(0, 400, 30000, 800, 'sand');
   
   //PLAYER
   this.player = this.add.sprite(100, 500, "shiba");
   this.physics.add.existing(this.player);
   this.player.body.setCollideWorldBounds(true);
   this.physics.add.collider(this.player, this.groundLayer);
  
   //doesnt work
   this.anims.create({
     key: "run",
     frameRate: 7,
     repeat: -1,
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
      this.player.play("run");   
      this.player.x -= 5;
      this.player.scaleX = -1;
      this.clouds.tilePositionX -= 0.5;
      this.sea.tilePositionX -= 1;
      this.sand.tilePositionX -= 2; 

    } else if (this.cursors.right.isDown && this.player.x < 3000) {
      this.player.play("run");   
      if (this.player.x < 700){
      this.player.x += 5;
      this.player.scaleX = 1;
      this.clouds.tilePositionX += 0.5;
      this.sea.tilePositionX += 1;
      this.sand.tilePositionX += 2; 
    }
      else{
      this.player.scaleX = 1;
      this.clouds.tilePositionX += 2;
      this.sea.tilePositionX += 4;
      this.sand.tilePositionX += 5; 
      }
      
    } 
     else if ((this.cursors.space.isDown || this.cursors.up.isDown) && (this.player.body.onFloor())){
       this.player.body.setVelocityY(-400);
       this.player.play('jump', true);
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