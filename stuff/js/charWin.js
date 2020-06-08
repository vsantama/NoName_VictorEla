export default class charWin extends Phaser.Scene {
    constructor(){
        super({key: 'winScene'});
    }

    init (data){
        this.lock = data.lock;
        this.char = data.char;
    }

    preload(){
        this.load.image('youwon', './stuff/img/Assets/TitleScreenAndSprites/Buttons/youwon.png');
        this.load.image('bg', './stuff/img/Assets/TitleScreenAndSprites/background_frame1.png');
        this.load.spritesheet('playagain_light', './stuff/img/Assets/TitleScreenAndSprites/Buttons/playagain_light.png', {frameWidth:93, frameHeight:10});
        this.load.spritesheet('back2menu_light', './stuff/img/Assets/TitleScreenAndSprites/Buttons/back2menu_light.png', {frameWidth:111, frameHeight:10});
        this.load.spritesheet('newchar', './stuff/img/Assets/TitleScreenAndSprites/Buttons/newcharunlock.png', {frameWidth:153, frameHeight:85});
        this.load.image('sign', './stuff/img/Assets/Sprites/woodframe.png');
        this.load.audio('transition', './stuff/img/Assets/Sounds/Sound_FX/choose_menu_general_sound_3.mp3');
        this.load.audio('winsound', './stuff/img/Assets/Sounds/Music/win_sound.wav');
    }
    
    create(){

    this.music = this.sound.add('winsound');
    this.music.play({volume: 0.6, loop: false});
    this.music.pauseOnBlur = false;

        this.anims.create({
            key: 'charanim',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("newchar", {
             frames: [0, 1, 2, 3]
               })
          });

        this.add.image(700, 400, 'bg');
        var sign = this.add.image(700,400, 'sign');
        sign.setScale(13.5);
        var youdied = this.add.image(700, 350, 'youwon');
        youdied.setScale(8);
        var buttonback = this.add.sprite(700, 600, 'back2menu_light');
        buttonback.setScale(4);
        var buttontry = this.add.sprite(700, 500, 'playagain_light');
        buttontry.setScale(4);
        var newchar = this.add.sprite(350, 200, 'newchar').play('charanim');
        newchar.setScale(1.1);

        if (this.lock === true){
            newchar.setVisible(true);
        }
        else{
            newchar.setVisible(false);
        }
        
        buttonback.setInteractive();
        buttontry.setInteractive();

        buttonback.on("pointerover", ()=>{
            buttonback.setFrame(1);
            this.sound.play('transition', {volume: 0.6, loop: false});
        })

        buttonback.on("pointerout", ()=>{
            buttonback.setFrame(0);
        })

        buttonback.on("pointerup", ()=>{
            buttonback.setFrame(1);
            this.scene.start('menu', {music: false, char: this.char, lock: false});
        })

        buttontry.on("pointerover", ()=>{
            buttontry.setFrame(1);
            this.sound.play('transition', {volume: 0.6, loop: false});
        })

        buttontry.on("pointerout", ()=>{
            buttontry.setFrame(0);
        })

        buttontry.on("pointerup", ()=>{
            buttontry.setFrame(1);
            this.scene.start('game', {char: this.char, lock: false, dif: "easy"});
        })
    }

    update(time, delta){
      
    }
}