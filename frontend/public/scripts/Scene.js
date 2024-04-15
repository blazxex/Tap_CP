import { WIDTH,HEIGHT } from "./constant.js";
import clickEvent from "./eventCenter.js";
import { fetchUser, fetchBoss, attack } from "./api.js";
import { user } from "./config.js";
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
        this.input.on('pointerup', () =>
        {
            // attack
            attack(localStorage.getItem("userCookieId"),"6619670c38ef6cdc4ac6b7e7");
            // this.scoreManger.IncreaseScore(); // TODO : if attack sucess -> increase score
            dataManager.store.values.PLAYER_POINT+=1;
            clickEvent.emit('OnClick'); // emit event with score
            console.log("clicking");
        });
    }
}

