import { attack, fetchUserItem , updateScore, upgradeItem} from "./api.js";
import { dataManager } from "./DataManager.js";
import * as wfl from "../lib/WebFontLoader.js"

export default class Button extends Phaser.GameObjects.Container{
    // upgradeBtn;
    constructor(scene, x,y,scale,image,name,item,ind){
        super(scene,x,y);
        this.index = ind;
        this.name = name;
        this.img = scene.add.image(0,0,image).setScale(scale);
        this.damge = 1;
        // level and dmage text.
       
        this.item = item;
        this.lvTxt = scene.add.text(-70,-100, `lv: ${item.itemLevel}`).setFontSize(32).setColor('#ffff00');
        this.dmgTxt = scene.add.text(0,-100, `dmg: ${item.attackPower}`).setFontSize(32).setColor('#ffff00');
        this.damge = item.attackPower;

        // upgrade btn
        this.upgradeTxt = scene.add.text(-50,100, `lv:${item.itemLevel+1}             ${formatNumber(item.price)} sc.`).setFontSize(20).setColor('#000000');
        this.upgradeBtn = scene.add.rectangle(0, 110, this.img.width*scale, 80*scale, 0xffffff);

        this.add(this.img);
        this.add(this.lvTxt);
        this.add(this.dmgTxt);
        this.add(this.upgradeBtn)
        this.add(this.upgradeTxt)

        this.price = item.price;

        this.upgradeBtn.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
            this.upgradeBtn.setAlpha(0.5)//set image opacity to 0.5
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
            this.upgradeBtn.setAlpha(1)//set image opacity to 1
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, async () => {
            if(dataManager.store.values.userScore >= this.price){
                dataManager.store.values.userScore -= this.price;
                const newScore = await updateScore(localStorage.getItem("userCookieId"), dataManager.store.values.userScore);
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
                this.damge = it.attackPower; 
                this.lvTxt.setText(`lv: ${it.itemLevel}`);
                this.dmgTxt.setText(`atk: ${it.attackPower}`);
                this.upgradeTxt.setText(`lv: ${it.itemLevel+1}  ${it.price} sc.`)
            }
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

        wfl.default.load({
            custom:{
                families: ['Kenny'],
            },
            active : () => {
                this.lvTxt.setFontFamily('Kenny')
                this.dmgTxt.setFontFamily('Kenny')
                this.upgradeTxt.setFontFamily('Kenny')
            }
        });
    }


}

function formatNumber(num) {
    if (num < 1000) {
        // If the number is less than 1000, just convert it to a string and return.
        return num.toString();
    } else {
        // If the number is 1000 or greater, convert to a string in the format of "1.2k".
        // Divide the number by 1000 and use toFixed(1) to keep one decimal place.
        return (num / 1000).toFixed(1) + 'k';
    }
}