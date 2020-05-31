export default class PowerUps extends Phaser.Physics.Arcade.Sprite{

    constructor(Scene, x, y, nombre){
        super(Scene, x, y, nombre);
        this.parent = Scene;
    }
}