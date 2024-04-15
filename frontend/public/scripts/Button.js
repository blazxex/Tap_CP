export default class Button extends Phaser.GameObjects.Container{
    constructor(scene, x,y,scale,image,name){
        super(scene,x,y);
        this.name = name;
        let img = scene.add.image(0,0,image).setScale(scale);
        // level and dmage text.
        let lvTxt = scene.add.text(-70,-120, `lv: 0`).setFontSize(16).setColor('#ffff00');
        let dmgTxt = scene.add.text(0,-120, `dmg: 0`).setFontSize(16).setColor('#ffff00');

        // upgrade btn
        let upgradeTxt = scene.add.text(-50,120, `lv:2  5pt.`).setFontSize(16).setColor('#000000');
        let upgradeBtn = scene.add.rectangle(0, 130, img.width*scale, img.height*scale*.1, 0xffffff);

        this.add(img);
        this.add(lvTxt);
        this.add(dmgTxt);
        this.add(upgradeBtn)
        this.add(upgradeTxt)

        upgradeBtn.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
            upgradeBtn.setAlpha(0.5)//set image opacity to 0.5
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
            upgradeBtn.setAlpha(1)//set image opacity to 1
        })



        this.whiteFill = scene.add.rectangle(0, 0, img.width*scale, img.height*scale, 0xffffff);
        this.whiteFill.setAlpha(0); // Initially invisible
        this.add(this.whiteFill);
        this.setSize(img.width*scale, img.height*scale);
        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
                // console.log('hover')
                img.setAlpha(0.5)//set image opacity to 0.5
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
                // console.log('out')
                img.setAlpha(1)//set image opacity to 1
            })
    }
}