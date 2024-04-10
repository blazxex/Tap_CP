import { WIDTH,HEIGHT } from "./constant.js";
import clickEvent from "./eventCenter.js";

export default class PlayerUI extends Phaser.Scene{
    constructor() {
		super({ key: 'PLayerUI',active:true });
	}
    preload (){
        this.load.image('kuromaru', "./asset/kuromaru.png")
    }
    create (){
        var kuro = this.add.image(WIDTH/2, HEIGHT/2+.3*HEIGHT, 'kuromaru')
        var pointText = this.add.text(WIDTH/2+ .3*WIDTH, HEIGHT/2, '000').setFontFamily('Arial').setFontSize(64).setColor('#ffff00');
        kuro.setScale(.5);
        clickEvent.on('OnClick', this.onClickHandler, this)
    }

    onClickHandler(){
        console.log('receive event')
    }



}