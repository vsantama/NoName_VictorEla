export default class charDeath extends Phaser.Scene {
    constructor(){
        super({key: 'deathScene'});
    }

    init (data){
        this.lock = data.lock;
        this.char = data.char;
    }

    preload(){
        this.load.spritesheet('angel', './stuff/img/Assets/Sprites/angel_heart.png', {frameWidth:200, frameHeight:200});
        this.load.spritesheet('tryagain', './stuff/img/Assets/TitleScreenAndSprites/Buttons/tryagain_dark.png', {frameWidth:118, frameHeight:16});
        this.load.spritesheet('back2menu', './stuff/img/Assets/TitleScreenAndSprites/Buttons/back2menu_dark.png', {frameWidth:111, frameHeight:12});
        this.load.image('youdied', './stuff/img/Assets/TitleScreenAndSprites/Buttons/youdied.png');
        this.load.image('sign', './stuff/img/Assets/Sprites/woodframe_dark.png');
        this.load.audio('transition', './stuff/img/Assets/Sounds/Sound_FX/choose_menu_general_sound_3.mp3');
    }
    
    create(){
        this.anims.create({
            key: 'animation',
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("angel", {
             frames: [0, 1]
               })
          });
        
        var sign = this.add.image(700,400, 'sign');
        sign.setScale(13.5);
        var youdied = this.add.image(700, 150, 'youdied');
        youdied.setScale(6);
        var angel = this.add.sprite(700, 300, 'angel').play("animation", true);
        angel.setScale(3);
        var buttonback = this.add.sprite(700, 600, 'back2menu');
        buttonback.setScale(4);
        var buttontry = this.add.sprite(700, 500, 'tryagain');
        buttontry.setScale(4);
        
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
            this.scene.start('menu', {music: false, char: this.char, lock: this.lock});
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
            this.scene.start('game', {char: this.char, lock: this.lock});
        })
    }

    update(time, delta){
      
    }
}