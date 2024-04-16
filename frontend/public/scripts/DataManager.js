import { fetchUserScore } from "./api.js";
import { user } from "./config.js";

class DataManager extends Phaser.Events.EventEmitter{
    store;
    constructor(){
        super();
        this.store = new Phaser.Data.DataManager(this);
        this.store.set("userScore", 0);
        this.setUp();
    }
    get store(){this.store;}

    async setUp(){
        const userScore = await fetchUserScore();
        this.store.set("userScore",userScore);
    }
}


export const dataManager = new DataManager();