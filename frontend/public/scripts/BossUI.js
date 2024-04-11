import { WIDTH,HEIGHT } from "./constant.js";

export default class BossUI extends Phaser.Scene{
    constructor() {
		super({ key: 'BossUI',active:true });
	}
    preload ()
    {
        this.load.image('rei', "./asset/rei.png")
    }
    create ()
    {
        var boss = this.add.image(WIDTH/2, HEIGHT/2, 'rei')
        boss.setScale(2);
    }
}