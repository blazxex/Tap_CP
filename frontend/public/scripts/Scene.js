import { WIDTH,HEIGHT } from "./constant.js";
import { clickEvent, setupEvent } from "./eventCenter.js";
import { fetchUser, fetchBoss, attack } from "./api.js";
import { dataManager } from "./DataManager.js";

export default class MainScene extends Phaser.Scene{
    constructor() {
		super({ key: 'mainScene',active:true});
	}
    async preload ()
    {
        this.load.image('sky', "./asset/bg.png")
    }
    async create ()
    {
        var bg = this.add.image(WIDTH/2, HEIGHT/2, 'sky');
        const scaleX = WIDTH / bg.width;
        const scaleY = HEIGHT / bg.height;

        // Determine the larger scale factor to ensure the image fits the screen
        bg.setScale(scaleX,scaleY);
        this.input.on('pointerup', async () =>
        {
            // attack
            const res = await attack();
            if(res.message === "Attack successful"){
                dataManager.store.values.userScore+=1;
                clickEvent.emit('OnClick'); // emit event with score
            }
            console.log("clicking");
        });
    }
}

