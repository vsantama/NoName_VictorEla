export default class PlayerInfo extends Phaser.Scene {
    constructor(){
        super({key: 'pinfo'});
    }

    init (data){
    }

    preload(){
        this.load.spritesheet('life', './stuff/img/Assets/Sprites/hearts_196x56.png', {frameWidth:196, frameHeight:56});
    }
    
    create(){
    //PLAYER'S LIFE
    this.lives = 3;
    this.life = this.add.sprite(150, 80, "life");
    }

    update(time, delta){
        this.life.setFrame(this.lives);
    }
}