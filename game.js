export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {  
    this.load.image('front_shiba', '/stuff/img/Assets/Sprites/boulder.png')
  }//images, sprites, etc

  create() {//"poner las cosas"
    this.add.image(350, 100, 'front_shiba');
  }

  update(time, delta) {    //interactions
    
  }
}