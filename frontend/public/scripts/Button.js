import { fetchUserItem , upgradeItem} from "./api.js";

export default class Button extends Phaser.GameObjects.Container{
    // upgradeBtn;
    constructor(scene, x,y,scale,image,name,item,ind){
        super(scene,x,y);
        this.index = ind;
        this.name = name;
        this.img = scene.add.image(0,0,image).setScale(scale);
        // level and dmage text.
       
        this.item = item;
        this.lvTxt = scene.add.text(-70,-100, `lv: ${item.itemLevel}`).setFontSize(16).setColor('#ffff00');
        this.dmgTxt = scene.add.text(0,-100, `dmg: ${item.attackPower}`).setFontSize(16).setColor('#ffff00');

        // upgrade btn
        this.upgradeTxt = scene.add.text(-50,100, `lv:${item.itemLevel+1}  5pt.`).setFontSize(16).setColor('#000000');
        this.upgradeBtn = scene.add.rectangle(0, 110, this.img.width*scale, 80*scale, 0xffffff);

        this.add(this.img);
        this.add(this.lvTxt);
        this.add(this.dmgTxt);
        this.add(this.upgradeBtn)
        this.add(this.upgradeTxt)

        this.upgradeBtn.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
            this.upgradeBtn.setAlpha(0.5)//set image opacity to 0.5
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
            this.upgradeBtn.setAlpha(1)//set image opacity to 1
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, async () => {
            const res = await upgradeItem(this.index);
            let it = null;
            switch (this.index) {
            case 0:
                it = res.updatedItem.item.item_0;
                break;
            case 1:
                it = res.updatedItem.item.item_1;
                break;
            case 2:
                it = res.updatedItem.item.item_2;
                break;
            }

            console.log(it);
            this.lvTxt.setText(`lv: ${it.itemLevel}`);
            this.dmgTxt.setText(`atk: ${it.attackPower}`);
            this.upgradeTxt.setText(`lv: ${it.itemLevel+1}  5pt.`)
        })


        this.whiteFill = scene.add.rectangle(0, 0, this.img.width*scale, this.img.height*scale, 0x000000);
        this.whiteFill.setAlpha(0); // Initially invisible
        this.add(this.whiteFill);
        this.setSize(this.img.width*scale, this.img.height*scale);
        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
                // console.log('hover')
                this.img.setAlpha(0.5)//set image opacity to 0.5
            })
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
                // console.log('out')
                this.img.setAlpha(1)//set image opacity to 1
            })
    }
}