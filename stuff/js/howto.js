export default class Menu extends Phaser.Scene {
    constructor(){
        super({key: 'howto'});
    }

    init (data){
        this.char = data.char;
        this.lock = data.lock;
    }

    preload(){
        this.load.spritesheet('bg', './stuff/img/Assets/TitleScreenAndSprites/background.png', {frameWidth:1400, frameHeight:800});
        this.load.spritesheet('b2m', './stuff/img/Assets/TitleScreenAndSprites/Buttons/back2menu.png', {frameWidth:111, frameHeight:20});
        this.load.image('sign', './stuff/img/Assets/Sprites/woodframe.png');
        this.load.spritesheet('arrowr', './stuff/img/Assets/TitleScreenAndSprites/Buttons/arrow_right.png', {frameWidth:9, frameHeight:7});
        this.load.spritesheet('arrowl', './stuff/img/Assets/TitleScreenAndSprites/Buttons/arrow_left.png', {frameWidth:9, frameHeight:7});
        this.load.audio('transition', './stuff/img/Assets/Sounds/Sound_FX/choose_menu_general_sound_3.mp3');
        this.load.audio('beach', './stuff/img/Assets/Sounds/Sound_FX/beach.mp3');
    }
    
    create(){
        this.anims.create({
            key: "bganim",
            frameRate: 1,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("bg", {
                frames: [0,1]
            })
        });

        this.anims.create({
            key: "lanim",
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("arrowl", {
                frames: [0,1,2,3]
            })
        });

        this.anims.create({
            key: "ranim",
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("arrowr", {
                frames: [0,1,2,3]
            })
        });

        this.add.sprite(700,400, 'bg').play("bganim");
        var buttonback = this.add.sprite(250, 750, 'b2m', );
        buttonback.setScale(4);
        var sign = this.add.image(700,400, 'sign');
        sign.setScale(12);
        var left = this.add.sprite(180, 400, 'arrowl');
        left.setScale(10);
        left.setVisible(false);
        var right = this.add.sprite(1220, 400, 'arrowr');
        right.setScale(10);

        right.setInteractive();
        left.setInteractive();
        buttonback.setInteractive();

        buttonback.on("pointerover", ()=>{
            buttonback.setFrame(1);
            this.sound.play('transition', {volume: 0.6, loop: false});
        })

        buttonback.on("pointerout", ()=>{
            buttonback.setFrame(0);
        })

        buttonback.on("pointerup", ()=>{
            buttonback.setFrame(1);
            this.scene.start('menu', {music: true, lock: this.lock, char: this.char});
        })

        left.on("pointerover", ()=>{
            left.play("lanim");
        })

        left.on("pointerout", ()=>{
            left.setFrame(0);
            left.anims.stop(null, true);
        })

        left.on("pointerup", ()=>{
            left.setFrame(0);
            left.anims.stop(null, true);
            right.setVisible(true);
            left.setVisible(false);
        })

        right.on("pointerover", ()=>{
            right.play("ranim");
        })

        right.on("pointerout", ()=>{
            right.setFrame(0);
            right.anims.stop(null, true);
        })

        right.on("pointerup", ()=>{
            right.setFrame(0);
            right.anims.stop(null, true);
            left.setVisible(true);
            right.setVisible(false);
        })
    }
}