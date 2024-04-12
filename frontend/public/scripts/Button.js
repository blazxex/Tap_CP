export default class Button extends Phaser.GameObjects.Container{
    constructor(scene, x,y,scale,image,name){
        super(scene,x,y);
        this.name = name;
        let img = scene.add.image(0,0,image).setScale(scale);
        this.add(img);
        this.whiteFill = scene.add.rectangle(0, 0, img.width*scale, img.height*scale, 0xffffff);
        this.whiteFill.setAlpha(0); // Initially invisible
        this.add(this.whiteFill);
        this.setSize(img.width*scale, img.height*scale);
        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
                console.log('hover')
                img.setAlpha(0.5)//set image opacity to 0.5
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
                console.log('out')
                img.setAlpha(1)//set image opacity to 1
            })
    }
}