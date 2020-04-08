export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {  
    this.load.image('front_shiba', 'shiba_front.png')
  }//images, sprites, etc

  create() {//"poner las cosas"
    this.add.image(200, 100, 'front_shiba');
  }

  update(time, delta) {    //interactions
    
  }
}