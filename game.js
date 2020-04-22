export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'game' });
  }

 /* init (data){
    switch (data.char){
      case "shiba":
      case "germanshep":
      case "human":
    }
    this.charId = data.id;
    this.charSprite = data.sprite;
}*/
  preload() {  
    this.load.image('front_shiba', './stuff/img/Assets/Sprites/boulder.png')
  }//images, sprites, etc

  create() {//"poner las cosas"
    this.add.image(350, 100, 'front_shiba');
  }

  update(time, delta) {    //interactions
    
  }
}