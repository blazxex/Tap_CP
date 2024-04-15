import { fetchUserScore } from "./api.js";
import { user } from "./config.js";

class DataManager extends Phaser.Events.EventEmitter{
    store;
    constructor(){
        super();
        this.store = new Phaser.Data.DataManager(this);
        this.setUp();
    }
    get store(){this.store;}

    async setUp(){
        const userScore = await fetchUserScore();
        this.store.set("userScore",userScore.score);
    }
}


export const dataManager = new DataManager();