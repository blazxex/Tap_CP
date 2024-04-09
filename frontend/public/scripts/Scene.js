import { WIDTH,HEIGHT } from "./constant.js";

export default class MainScene extends Phaser.Scene{
    constructor() {
		super({ key: 'mainScene' });
	}
    preload ()
    {
        this.load.image('fuuka', "./asset/fuuka.png")
        this.load.image('kuromaru', "./asset/kuromaru.png")
    }
    create ()
    {
        var bg = this.add.image(WIDTH/2, HEIGHT/2, 'fuuka');
        var player = this.add.image(WIDTH/2, HEIGHT/2+.2*HEIGHT, 'kuromaru');
        player.setScale(.5);

    }
}