export default class PlayerInfo extends Phaser.Scene {
    constructor(){
        super({key: 'pinfo'});
    }
    //https://vimeo.com/362892218 19:50
    init (data){
        if (data && data.emitter){
            data.emitter.on('heart_pickup', this.updateLives, this);
        }
    }

    preload(){
        this.load.spritesheet('life', './stuff/img/Assets/Sprites/hearts_196x56.png', {frameWidth:196, frameHeight:56});
        this.load.image('potion', './stuff/img/Assets/Sprites/potion_single.png');
    }
    
    create(){
    
    
    //PLAYER'S LIFE
    this.lives = 2;
    this.life = this.add.sprite(150, 80, "life");
    }

    update(time, delta){
        this.life.setFrame(this.lives);
    }

    updateLives(){
        if (this.lives < 3){
            this.lives++;
        }
    }
}