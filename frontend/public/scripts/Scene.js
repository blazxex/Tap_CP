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
    }
    async create ()
    {
        const user = await fetchUser();
        var bg = this.add.image(WIDTH/2, HEIGHT/2, 'sky');
        const scaleX = WIDTH / bg.width;
        const scaleY = HEIGHT / bg.height;

        // Determine the larger scale factor to ensure the image fits the screen
        bg.setScale(.95*scaleX, .95*scaleY);
        this.input.on('pointerup', () =>
        {
            //TODO: send damge to server
            attack(user[0].userCookieId,"6619670c38ef6cdc4ac6b7e7");
            clickEvent.emit('OnClick');
            console.log("clicking");
        });
    }

}