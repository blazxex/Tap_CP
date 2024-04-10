export default class Button extends Phaser.GameObjects.Container{
    constructor(scene, x,y,scale,image){
        super(scene,x,y);
        let img = scene.add.image(0,0,image).setScale(scale);
        this.add(img);
        this.setSize(img.width*scale, img.height*scale);
        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>console.log('hover'))
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>console.log('out'))
    }
}