export const DATA_KEYS = Object.freeze({
    PLAYER_POINT:'PLAYER_POINT',
    PLAYER_LEVEL:'PLAYER_LEVEL'
    
})
class DataManager extends Phaser.Events.EventEmitter{
    store;
    constructor(){
        super();
        this.store = new Phaser.Data.DataManager(this);
        this.store.set(DATA_KEYS.PLAYER_LEVEL,1);
        this.store.set(DATA_KEYS.PLAYER_POINT,0);
    }
    get store(){this.store;}
}


export const dataManager = new DataManager();