export default class CharSel extends Phaser.Scene {
    constructor(){
        super({key: 'char'});
    }

    init (data){
        this.char = data.char;
        this.lock = data.lock;
    }

    preload(){
        this.load.spritesheet('bg', './stuff/img/Assets/TitleScreenAndSprites/background.png', {frameWidth:1400, frameHeight:800});
        this.load.spritesheet('b2m', './stuff/img/Assets/TitleScreenAndSprites/Buttons/back2menu.png', {frameWidth:111, frameHeight:20});
        this.load.spritesheet('ken', './stuff/img/Assets/TitleScreenAndSprites/Buttons/ken_shiba.png', {frameWidth:37, frameHeight:20});
        this.load.image('locked', './stuff/img/Assets/TitleScreenAndSprites/Buttons/locked.png');
        this.load.image('choose', './stuff/img/Assets/TitleScreenAndSprites/Buttons/chooseyourch.png');
        this.load.image('sign', './stuff/img/Assets/Sprites/woodframe.png');
        this.load.audio('transition', './stuff/img/Assets/Sounds/Sound_FX/choose_menu_general_sound_3.mp3');
        this.load.audio('shiba_bark', './stuff/img/Assets/Sounds/Sound_FX/shibe_bark_2.mp3');
        this.load.spritesheet('shiba', './stuff/img/Assets/Sprites/characters_enemies/shiba/shiba_spritesheet.png', {frameWidth:126, frameHeight:194});
        this.load.image('locked_char', './stuff/img/Assets/Sprites/locked_character.png');

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
            key: "shibanim",
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("shiba", {
                frames: [15,16,17,18]
            })
        });

        this.add.sprite(700,400, 'bg').play("bganim");

        var buttonback = this.add.sprite(250, 750, 'b2m', );
        buttonback.setScale(4);

        var sign = this.add.image(700,400, 'sign');
        sign.setScale(12);
        var  choose = this.add.image(700, 200, 'choose');
        choose.setScale(4);

        var shiba = this.add.sprite(460,400, 'shiba');
        shiba.setScale(1.5);
        shiba.setFrame(15);

        this.shibaname = this.add.sprite(445,580, 'ken');
        this.shibaname.setScale(4);

        var locked = this.add.image(900, 580, 'locked');
        var lockchar = this.add.image(900, 416, 'locked_char');
        locked.setScale(4);
        lockchar.setScale(1.5);
        if(this.lock){
            locked.setVisible(true);
            lockchar.setVisible(true);
        }
        else{
            locked.setVisible(false);
            lockchar.setVisible(false);
        }
        
        buttonback.setInteractive();
        shiba.setInteractive();
        this.shibaname.setInteractive();

        buttonback.on("pointerover", ()=>{
            buttonback.setFrame(1);
            this.sound.play('transition', {volume: 0.6, loop: false});
        })

        buttonback.on("pointerout", ()=>{
            buttonback.setFrame(0);
        })

        buttonback.on("pointerup", ()=>{
            buttonback.setFrame(1);
            this.scene.start('menu', {music: true, char: this.char, lock: this.lock});
        })

        shiba.on("pointerover", ()=>{
            shiba.play("shibanim");
        })

        shiba.on("pointerout", ()=>{
            shiba.setFrame(15);
            shiba.anims.stop(null, true);
        })

        shiba.on("pointerup", ()=>{
            shiba.setFrame(18);
            this.char = "shiba";
        })

        this.shibaname.on("pointerover", ()=>{
            if (!this.lock){
                this.shibaname.setFrame(1);
                this.sound.play('transition', {volume: 0.6, loop: false});
            }
        })

        this.shibaname.on("pointerout", ()=>{
            if (!this.lock){
                this.shibaname.setFrame(0);
            }
        })

        this.shibaname.on("pointerup", ()=>{
            this.sound.play('shiba_bark', {volume: 0.6, loop: false});
            this.char = "shiba";
        })
    }

    update(time,delta){
        if (this.char == "shiba"){
            this.shibaname.setFrame(1);
            /*this.otherdogname.setFrame(0)*/
        }
        /*
        else{
            this.shibaname.setFrame(0);
            this.otherdogname.setFrame(1)
        }
        */
    }
}