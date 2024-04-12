import { WIDTH,HEIGHT } from "./constant.js";
import clickEvent from "./eventCenter.js";
import { fetchUser, fetchBoss, attack } from "./api.js";

export default class MainScene extends Phaser.Scene{
    constructor() {
		super({ key: 'mainScene',active:true});
	}
    preload ()
    {
        this.load.image('sky', "./asset/bg.png")
        const user = fetchUser();
    }
    create ()
    {
        var bg = this.add.image(WIDTH/2, HEIGHT/2, 'sky');
        const scaleX = WIDTH / bg.width;
        const scaleY = HEIGHT / bg.height;

        // Determine the larger scale factor to ensure the image fits the screen
        bg.setScale(.95*scaleX, .95*scaleY);
        this.input.on('pointerup', () =>
        {
            //TODO: send damge to server
            attack();
            clickEvent.emit('OnClick');
            console.log("clicking");
        });
    }

}