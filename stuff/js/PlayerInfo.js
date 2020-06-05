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

        if (data && data.emitter){
            data.emitter.on('dogUpdate', this.updateDogX, this);
        }
    }

    preload(){
        this.load.spritesheet('life', './stuff/img/Assets/Sprites/hearts_196x56.png', {frameWidth:196, frameHeight:56});
        this.load.image('potion', './stuff/img/Assets/Sprites/potion_single.png');
        this.load.image('finn',  './stuff/img/Assets/Sprites/characters_enemies/finn.png');
        this.load.image('heart', './stuff/img/Assets/Sprites/heart.png');
        this.load.audio('potion', './stuff/img/Assets/Sounds/Sound_FX/potion.mp3');
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
    //MINIMAP
    this.minimapbar = new Phaser.GameObjects.Graphics(this);
    this.minimapbar.fillStyle(0xF8DC8C);
    this.minimapbar.fillRect(913, 703, 394, 80).setDepth(2);
    this.add.existing(this.minimapbar);
    this.minimapbar2 = new Phaser.GameObjects.Graphics(this);
    this.minimapbar2.fillStyle(0x000000);
    this.minimapbar2.fillRect(910, 700, 400, 86);
    this.add.existing(this.minimapbar2);
    //change 925 to wherever dog is
    this.minimapdog = this.add.image(925, 770, 'heart').setDepth(3);
    this.minimapdog.setScale(0.5);
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
        this.sound.play('potion', {volume: 0.6, loop: false});
        this.potion.setVisible(false);
        this.potion.visible = false;
    }

    updateDogX(){
        this.minimapdog.x = 925 + ((this.myGame.player.x * 368)/ 30000);
    }
}