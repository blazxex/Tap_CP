import { WIDTH,HEIGHT } from "./constant.js";

export default class PlayerUI extends Phaser.Scene{
    constructor() {
		super({ key: 'PLayerUI',active:true });
	}
    preload ()
    {
        this.load.image('kuromaru', "./asset/kuromaru.png")
    }
    create ()
    {
        var kuro = this.add.image(WIDTH/2, HEIGHT/2+.3*HEIGHT, 'kuromaru')
        kuro.setScale(.5);
    }
}