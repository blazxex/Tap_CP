import { WIDTH,HEIGHT } from "./constant.js";
import { clickEvent, selectCardEvent, setupEvent } from "./eventCenter.js";
import { fetchUser, fetchBoss, attack, fetchUserScore } from "./api.js";
import { dataManager } from "./DataManager.js";

export default class MainScene extends Phaser.Scene{
    constructor() {
		super({ key: 'mainScene',active:true});
        this.currentSelectcard = 0;
	}
    async preload ()
    {
        this.load.image('sky', "./asset/bg.png")
    }
    async create ()
    {
        selectCardEvent.on('OnSelectCard',ind => this.currentSelectcard=ind,this);        

        var bg = this.add.image(WIDTH/2, HEIGHT/2, 'sky');
        const scaleX = WIDTH / bg.width;
        const scaleY = HEIGHT / bg.height;
        
        // Determine the larger scale factor to ensure the image fits the screen
        bg.setScale(scaleX,scaleY);


        this.input.on('pointerup', async (pointer) =>
        {
            const isAttackSuccess = await attack(this.currentSelectcard);
            dataManager.store.values.userScore += dataManager.store.values.userDamage;
            clickEvent.emit('OnClick'); // emit event with score
            // }
            console.log("clicking");
        });

    }
}

