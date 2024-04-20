import { fetchUserScore } from "./api.js";

class DataManager extends Phaser.Events.EventEmitter{
    store;
    constructor(){
        super();
        this.store = new Phaser.Data.DataManager(this);
        this.store.set("userScore", 0);
        this.store.set("userDamage",1);
        this.setUp();
    }
    get store(){this.store;}

    async setUp(){
        const userScore = await fetchUserScore();
        this.store.set("userScore",userScore) 
        setInterval(async () => {
            await await fetchUserScore();
        }, 50);
    }
}


export const dataManager = new DataManager();