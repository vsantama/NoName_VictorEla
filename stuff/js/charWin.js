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
        this.load.image('sign', './stuff/img/Assets/Sprites/woodframe.png');
        this.load.audio('transition', './stuff/img/Assets/Sounds/Sound_FX/choose_menu_general_sound_3.mp3');
    }
    
    create(){
        this.add.image(700, 400, 'bg');
        var sign = this.add.image(700,400, 'sign');
        sign.setScale(13.5);
        var youdied = this.add.image(700, 350, 'youwon');
        youdied.setScale(8);
        var buttonback = this.add.sprite(700, 600, 'back2menu_light');
        buttonback.setScale(4);
        var buttontry = this.add.sprite(700, 500, 'playagain_light');
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
            this.scene.start('game', {char: this.char, lock: this.lock, dif: "easy"});
        })
    }

    update(time, delta){
      
    }
}