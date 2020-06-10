//import 
export default class Pause extends Phaser.Scene {
    constructor(){
        super({key: 'typing'});
    }

    init (data){
        this.lock = data.lock;
        this.dif = data.dif;
        this.enemy = data.enemy;
    }

    preload(){
        this.load.image('long_sign', './stuff/img/Assets/Sprites/longwoodframe.png');
        this.load.spritesheet('cross', './stuff/img/Assets/Sprites/cross.png', {frameWidth:15, frameHeight:15});
        this.load.spritesheet('tick', './stuff/img/Assets/Sprites/checkmark.png', {frameWidth:17, frameHeight:14});
        this.load.audio('transition', './stuff/img/Assets/Sounds/Sound_FX/choose_menu_general_sound_3.mp3');
        this.load.audio('error', './stuff/img/Assets/Sounds/Sound_FX/error.mp3');
        this.load.audio('correct', './stuff/img/Assets/Sounds/Sound_FX/correct.mp3');
       
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    create(){
    //
    this.oldtime = 0;
    //REFERENCE TO SCENES
    this.myGame = this.scene.get('game');
    this.myInfo = this.scene.get('pinfo');

    //VARIABLES
    this.usertext = [];
    this.snake = this.myGame.snakes.getFirst(true);

    //FRAME
    var sign = this.add.image(700,180, 'long_sign');
    sign.setScale(9.5);
    this.cross = this.add.sprite(480, 180, "cross");
    this.cross.setScale(9.5);
    this.cross.setFrame(1);
    this.tick = this.add.sprite(480,180, 'tick');
    this.tick.setScale(9.5);
    this.tick.setFrame(1);
    //CROSS
    this.anims.create({
      key: 'cross_blink',
      frameRate: 2,
      repeat: 0,
      frames: this.anims.generateFrameNumbers("cross", {
       frames: [0,1]
         })
    });

    this.anims.create({
      key: 'tick_blink',
      frameRate: 2,
      repeat: 0,
      frames: this.anims.generateFrameNumbers("tick", {
       frames: [0,1]
         })
    });
   
    //Word groups. 84 words in each group
    this.easyWords = ['act','bay','gauge','dry','era','seldom','gym','hit','hot','ice','job','kid','log','may','new','one','pro',
    'red','when','tea','use','blog','boat','crew','data','diner','eyes','else','film',
    'feed','feet','gold','grew','hall','hill','into','iron','join','jump','king','knew','know','lion','like','moon','menu',
    'none','note','null','over','open','post','pool','tiny','tips','user','upon','visa',
    'vast','walk','weak','yard','year','done','asset','birds','catch','drink','eight','fifth','games','happy','juice','knife',
    'label','mount','night','occur','panel','queen','range','ships','thick','done']
    this.mediumWords = ['agency','backup','crisis','figure','growth','joined','launch',
    'method','debris','affairs','average','disease','fashion','foreign','greatly','minimum','ongoing','analyst','bringing',
    'checking','eligible','directed','equipped','moment','reaction','straight','vacation','warranty','surprise','whatever',
    'internet','mountain','favourite','negative','election','division','calendar','action','friction','fiction','glorious',
    'homepage','lonely','monitor','secret','account','balance','capital','causing','bourgeois','sister','factory','extreme',
    'sports','formula','initial','massive','located','tigers','picture','plastic','related','regular','language','twitter',
    'vintage','website','gravity','heating','soldier','skating','stating','vanilla','chocolate','coconut','cream','balloon',
    'bananas','aquatic','caption','needles', 'painting', 'sharpen','backpack']
    this.hardWords = ['acceptable','acquire','amateur','believe','conscience','column','conscious','definitely','somewhat',
    'embarrass','equipment','exceed','fiery','guarantee','completement','harass','hierarchy','humorous','ignorance','immediate',
    'inoculate','jewelry','judgment','leisure','license','maintenance','miniature','maneuver','misspell','neighbor','noticeable',
    'occasionally','pastime','perseverance','psychology','privilege','ambidextrous','receipt','recommend','rhyme','rhythm',
    'schedule','sergeant','threshold','twelfth','tyranny','vacuum','pharaoh','intelligence','handkerchief','necessary',
    'hypothetical','pneumonia','abolitionism','mortgage','awareness','establish','following','frequency','ourselves','pregnancy',
    'situation','somewhere','tradition','yesterday','addiction','wonderful','boyfriend','girlfriend','chemistry','mechanics',
    'objective','offensive','qualified','reactions','replacing','targeting','testament','volunteer','warehouse','workplace',
    'attractive','businesses','challenges']


    this.word = "";
    if (this.dif == 'easy'){
      this.word = this.easyWords[Math.floor(this.getRandomArbitrary(0, 83))];
    }
    else if (this.dif == 'medium'){
      this.word = this.mediumWords[Math.floor(this.getRandomArbitrary(0, 83))];
    }

    else if (this.dif == 'hard'){
      this.word = this.hardWords[Math.floor(this.getRandomArbitrary(0, 83))];
    }
    this.wordletters = this.word.split("");
    this.oddletters = this.word.split("");
    this.evenletters = this.word.split("");
    var i;
    for (i = 0; i < this.word.length; i++){
      if (i%2 === 0){
        this.oddletters.splice(i, 1, "_");
      }
      else{
        this.evenletters.splice(i, 1, "_");
      }
    }
    this.wordtext1 = this.add.text(625,100, this.oddletters.join(""), { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' , color: '#000', fontSize: '60px'});
    this.wordtext2 = this.add.text(625,100, this.evenletters.join(""), { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' , color: '#000', fontSize: '60px'});
    this.wordtext1.alpha = 1;
    this.wordtext2.alpha = 0;
    this.usertextarray = this.add.text(625,200, this.usertext.join(""), { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' , color: '#000', fontSize: '60px'});

     
    this.input.keyboard.on('keydown', function (event) { 

      if(event.key !== "Enter" 
        && event.key !== "ArrowRight" 
        && event.key !== "ArrowLeft"  
        && event.key !== "Shift"  
        && event.key !== "CapsLock"  
        && event.key !== "Tab"  
        && event.key !== "Control"  
        && event.key !== "AltGraph"  
        && event.key !== "ArrowDown"  
        && event.key !== "ArrowUp"  
        && event.key !== " "
        && event.key !== "Escape"  
        && event.key !== "Alt"){
          if (event.key === "Backspace"){
            this.usertext.splice(this.usertext.length - 1, 1);
          }
          else{
            this.usertext.push(event.key);}
      }
      this.usertextarray.setText(this.usertext.join(""));
    },this);
    
    this.enter = this.input.keyboard.addKey('ENTER');

    }
    

    update(time, delta){
      ///
      
      ///
      if(this.wordtext1 !== undefined || this.wordtext2 !== undefined){
        if(time - this.oldtime > 750){
          if (this.wordtext1.alpha === 1){
            this.wordtext1.alpha = 0;
            this.wordtext2.alpha = 1;
          } 
          else if ((this.wordtext1.alpha === 0)){
            this.wordtext1.alpha = 1;
            this.wordtext2.alpha = 0;
          } 
          this.oldtime = time;
        }
      }
      ///
      if (Phaser.Input.Keyboard.JustDown(this.enter)){
        let self = this;

        let wordtyped = this.usertext.join("");
        if (this.word === wordtyped){
          this.sound.play('correct', {volume: 0.6, loop: false});
          this.tick.play('tick_blink', false);
          if (this.enemy === "boulder"){
            this.block2destroy = this.myGame.blockers.getFirst(true);
            this.block2destroy.destroy();
          }
          else if (this.enemy === "snake"){
            this.block2destroy = this.myGame.snakes.getFirst(true);
            this.block2destroy.SnakeDie(this.myGame);
            this.block2destroy.body.checkCollision.none = true;
            this.myGame.snakeCanDie = true;
          }
          this.myGame.player.move = true;
          this.scene.stop();
        }

        else{
          if (this.enemy === "snake"){
            this.myInfo.lives--;
            
            this.snake.SnakeAttack(this.myGame);
            this.time.delayedCall(1000, function(){
              this.snake.SnakeIdle(); //does work
            }, null, this);
          }
          this.sound.play('error', {volume: 0.6, loop: false});
          this.cross.play('cross_blink', false);
          this.usertext = [];
          this.usertextarray.setText("");
        }
      }
      
    }
}