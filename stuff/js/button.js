export default class Button extends Phaser.GameObjects.Image{
    constructor(scene, x, y, sprite, toScene, param){
        super(scene, x, y, sprite);
        this.value = param;
        this.toScene = toScene;
        this.setScale(4);
        this.setInteractive();
        this.scene.add.existing(this);
        this.on('pointerup', () => {
            this.scene.scene.start(this.toScene, this.value);
        })
    }
}