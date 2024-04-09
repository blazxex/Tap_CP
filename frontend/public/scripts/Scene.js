import { WIDTH,HEIGHT } from "./constant.js";

export default class MainScene extends Phaser.Scene{
    constructor() {
		super({ key: 'mainScene',active:true});
	}
    preload ()
    {
        this.load.image('sky', "./asset/bg.png")
    }
    create ()
    {
        var bg = this.add.image(WIDTH/2, HEIGHT/2, 'sky');

        this.input.on('pointerup', () =>
        {
            //TODO: send damge to server
            console.log("clicking");
        });

    }
}