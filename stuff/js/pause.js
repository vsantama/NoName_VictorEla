export default class Pause extends Phaser.Scene {
    constructor(){
        super({key: 'pause'});
    }

    init (data){
        this.lock = data.lock;
        //must add char value when going to menu
        //this.char = data.char;
    }

    preload(){
        this.load.spritesheet('b2m', './stuff/img/Assets/TitleScreenAndSprites/Buttons/back2menu.png', {frameWidth:111, frameHeight:20});
        this.load.spritesheet('con', './stuff/img/Assets/TitleScreenAndSprites/Buttons/continue.png', {frameWidth:80, frameHeight:20});
        this.load.image('sign', './stuff/img/Assets/Sprites/woodframe.png');
        this.load.audio('transition', './stuff/img/Assets/Sounds/Sound_FX/choose_menu_general_sound_3.mp3');
    }
    
    create(){
        this.veil = this.add.graphics({x: 0, y: 0});
        this.veil.fillStyle('0x000000', 0.3);
        this.veil.fillRect(0, 0, 1400, 800);
        this.veil.setScrollFactor(0);

        var sign = this.add.image(700,400, 'sign');
        sign.setScale(12);
        var buttonback = this.add.sprite(700, 250, 'b2m', );
        buttonback.setScale(4);
        var buttoncont = this.add.sprite(700, 550, 'con', );
        buttoncont.setScale(4);

        buttonback.setInteractive();
        buttoncont.setInteractive();
        

        buttonback.on("pointerover", ()=>{
            buttonback.setFrame(1);
            this.sound.play('transition', {volume: 0.6, loop: false});
        })

        buttonback.on("pointerout", ()=>{
            buttonback.setFrame(0);
        })

        buttonback.on("pointerup", ()=>{
            buttonback.setFrame(1);
            this.scene.stop("game");
            this.scene.stop();
            this.scene.start('menu', {music: false, lock: this.lock});
        })

        buttoncont.on("pointerover", ()=>{
            buttoncont.setFrame(1);
            this.sound.play('transition', {volume: 0.6, loop: false});
        })

        buttoncont.on("pointerout", ()=>{
            buttoncont.setFrame(0);
        })

        buttoncont.on("pointerup", ()=>{
            buttoncont.setFrame(1);
            this.scene.stop();
            this.scene.resume('game', {lock: this.lock});
        })

    }

    update(time, delta){
    
    }
}