export default class PlayerInfo extends Phaser.Scene {
    constructor(){
        super({key: 'pinfo'});
    }
    //https://vimeo.com/362892218 19:50
    init (data){
        if (data && data.emitter){
            data.emitter.on('heart_pickup', this.updateLives, this);
        }

        if (data && data.emitter){
            data.emitter.on('potion_pickup', this.updatePotion, this);
        }
        
        if (data && data.emitter){
            data.emitter.on('deletePotion', this.deletePotion, this);
        }
    }

    preload(){
        this.load.spritesheet('life', './stuff/img/Assets/Sprites/hearts_196x56.png', {frameWidth:196, frameHeight:56});
        this.load.image('potion', './stuff/img/Assets/Sprites/potion_single.png');
    }
    
    create(){
    //GAME REFERENCE
    this.myGame = this.scene.get('game');
    //POTION
    this.potion = this.add.image(300, 80, 'potion');
    this.potion.setVisible(false);
    this.potion.visible = false;
    //PLAYER'S LIFE
    this.lives = 3;
    this.life = this.add.sprite(150, 80, "life");
    }

    update(time, delta){
        this.life.setFrame(this.lives);

        if (this.lives === 0){
            this.myGame.playerDie();
        }
    }

    updateLives(){
        if (this.lives < 3){
            this.lives++;
        }
    }

    updatePotion(){
        console.log(this.potion.visible);
        if (!this.potion.visible){
            this.myGame.potion = true;
            this.potion.setVisible(true);
            this.potion.visible = true;
        }
    }

    deletePotion(){
        this.potion.setVisible(false);
        this.potion.visible = false;
    }
}