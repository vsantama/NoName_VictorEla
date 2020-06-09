export default class Menu extends Phaser.Scene {
    constructor(){
        super({key: 'menu'});
    }

    init (data){
        if (data.music == false){
            this.music = this.sound.add('beach');
            this.music.play({volume: 0.6, loop: true});
            this.music.pauseOnBlur = false;
        }
        this.char = data.char;
        this.lock = data.lock;
    }

    preload(){
        this.load.spritesheet('play_game', './stuff/img/Assets/TitleScreenAndSprites/Buttons/play_game.png', {frameWidth:85, frameHeight:20});
        this.load.spritesheet('howto', './stuff/img/Assets/TitleScreenAndSprites/Buttons/how_to_play.png', {frameWidth:99, frameHeight:20});
        this.load.spritesheet('charse', './stuff/img/Assets/TitleScreenAndSprites/Buttons/char_select.png', {frameWidth:150, frameHeight:20});
        this.load.spritesheet('bg', './stuff/img/Assets/TitleScreenAndSprites/background.png', {frameWidth:1400, frameHeight:800});
        this.load.audio('beach', './stuff/img/Assets/Sounds/Sound_FX/beach.mp3');
        this.load.audio('transition', './stuff/img/Assets/Sounds/Sound_FX/choose_menu_general_sound_3.mp3');
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

        this.add.sprite(700,400, 'bg').play("bganim");

        var buttonplay = this.add.sprite(700, 400, 'play_game', );
        buttonplay.setScale(8);

        buttonplay.setInteractive();

        buttonplay.on("pointerover", ()=>{
            buttonplay.setFrame(1);
            this.sound.play('transition', {volume: 0.6, loop: false});
        })

        buttonplay.on("pointerout", ()=>{
            buttonplay.setFrame(0);
        })

        buttonplay.on("pointerup", ()=>{
            buttonplay.setFrame(1);
            this.music.stop();
            this.scene.start('game', {lock: this.lock, char: this.char, dif: "easy", go: false});
        })
        //add lock and char parametres
        var buttonhow = this.add.sprite(700, 600, 'howto', );
        buttonhow.setScale(4);

        buttonhow.setInteractive();

        buttonhow.on("pointerover", ()=>{
            buttonhow.setFrame(1);
            this.sound.play('transition', {volume: 0.6, loop: false});
        })

        buttonhow.on("pointerout", ()=>{
            buttonhow.setFrame(0);
        })

        buttonhow.on("pointerup", ()=>{
            buttonhow.setFrame(1);
            this.scene.start('howto', {lock: this.lock, char: this.char});
        })

        var buttonchar = this.add.sprite(700, 700, 'charse', );
        buttonchar.setScale(4);

        buttonchar.setInteractive();

        buttonchar.on("pointerover", ()=>{
            buttonchar.setFrame(1);
            this.sound.play('transition', {volume: 0.6, loop: false});
        })

        buttonchar.on("pointerout", ()=>{
            buttonchar.setFrame(0);
        })

        buttonchar.on("pointerup", ()=>{
            buttonchar.setFrame(1);
            this.scene.start('char', {char: this.char, lock: this.lock});
        })
    }

}