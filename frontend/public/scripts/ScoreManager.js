class scoreManager{
    constructor(){
        // TODO : have to fetch score player data.
        this.currScore = 0;
    }
    IncreaseScore(increament=1){
        this.currScore += increament;
        console.log(this.currScore);
    }
}
//TODO : make this class check with database.

export default scoreManager;