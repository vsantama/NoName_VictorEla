export default class Menu extends Phaser.Scene {
    constructor(){
        super({key: 'menu'});
    }
    preload(){
        this.load.spritesheet('play_game', '/stuff/img/Assets/TitleScreenAndSprites/Buttons/play_game.png', {frameWidth:85, frameHeight:20});
        this.load.spritesheet('howto', '/stuff/img/Assets/TitleScreenAndSprites/Buttons/how_to_play.png', {frameWidth:99, frameHeight:20});
        this.load.spritesheet('settings', '/stuff/img/Assets/TitleScreenAndSprites/Buttons/settings.png', {frameWidth:82, frameHeight:20});
        this.load.spritesheet('charse', '/stuff/img/Assets/TitleScreenAndSprites/Buttons/char_select.png', {frameWidth:150, frameHeight:20});
        this.load.spritesheet('bg', '/stuff/img/Assets/TitleScreenAndSprites/background.png', {frameWidth:1400, frameHeight:800});
        this.load.audio('beach', '/stuff/img/Assets/Sounds/Sound_FX/beach.mp3');
        this.load.audio('joke', '/stuff/img/Assets/Sounds/Sound_FX/robotlady.mp3');
        this.load.audio('transition', '/stuff/img/Assets/Sounds/Sound_FX/choose_menu_general_sound_3.mp3');
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

        this.sound.pauseOnBlur = false;
        //this.sound.play('joke', {loop: true});

        this.add.sprite(700,400, 'bg').play("bganim");

        var buttonplay = this.add.sprite(400, 300, 'play_game', );
        buttonplay.setScale(4);

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
            this.scene.start('game');
        })

        var buttonhow = this.add.sprite(1000, 300, 'howto', );
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
            //this.scene.start('howto');
        })

        var buttonset = this.add.sprite(400, 600, 'settings', );
        buttonset.setScale(4);

        buttonset.setInteractive();

        buttonset.on("pointerover", ()=>{
            buttonset.setFrame(1);
            this.sound.play('transition', {volume: 0.6, loop: false});
        })

        buttonset.on("pointerout", ()=>{
            buttonset.setFrame(0);
        })

        buttonset.on("pointerup", ()=>{
            buttonset.setFrame(1);
            //this.scene.start('settings');
        })

        var buttonchar = this.add.sprite(1000, 600, 'charse', );
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
            //this.scene.start('char_select');
        })
    }

}