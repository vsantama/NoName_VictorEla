export default class TitleScreen extends Phaser.Scene {
    constructor(){
        super({key: 'title'});
    }
    preload(){
        this.load.spritesheet('bg', '/stuff/img/Assets/TitleScreenAndSprites/background.png', {frameWidth:1400, frameHeight:800});
        this.load.spritesheet('text', '/stuff/img/Assets/TitleScreenAndSprites/title_screen.png', {frameWidth:288, frameHeight:192});
        this.load.audio('beach', '/stuff/img/Assets/Sounds/Sound_FX/beach.mp3');
        
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
            key: "textanim",
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("text", {
                frames: [0,1,2,3]
            })
        });

        this.music = this.sound.add('beach');
        this.music.play({volume: 0.6, loop:true});
        this.music.pauseOnBlur = false;

        this.add.sprite(700,400, 'bg').play("bganim");
        var text = this.add.sprite(700,400,'text').play("textanim");
        text.setScale(4);

        this.enter = this.input.keyboard.addKey('ENTER');

    }

    update(time, delta){
        if (Phaser.Input.Keyboard.JustDown(this.enter)) {
            this.music.stop();
            this.scene.start('menu');
        }
    }

}