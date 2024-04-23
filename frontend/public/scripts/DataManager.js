import { fetchUserScore, updateScore } from "./api.js";
import { sendUserScore  } from "./api.js";
class DataManager extends Phaser.Events.EventEmitter{
    store;
    constructor(){
        super();
        this.store = new Phaser.Data.DataManager(this);
        this.store.set("userScore", 0);
        this.store.set("userDamage",1);
        this.store.set("userLang", 0);
        this.store.set("bossWeakness", 0);
        this.store.set("userName","user" + Math.floor(Math.random() * 100000) + 1);
        this.setUp();
    }
    get store(){this.store;}

    async setUp(){
        const userScore = await fetchUserScore();
        this.store.set("userScore",userScore) 
        setInterval(async () => {
            let score = await sendUserScore(this.store.values.userScore);
        }, 1000);
    }
}


export const dataManager = new DataManager();