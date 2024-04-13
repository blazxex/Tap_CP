import { WIDTH,HEIGHT } from "./constant.js";
import Scoreboard from "./Scoreboard.js";

export default class ScoreBoardUI extends Phaser.Scene{
    constructor() {
		super({ key: 'ScoreBoardUI',active:true });
	}
    create ()
    {
        // Example scores
        var scores = [
            { name: 'Player 1', value: 100 },
            { name: 'Player 2', value: 80 },
            { name: 'Player 3', value: 120 }
        ];

        // Create the scoreboard
        this.scoreboard = new Scoreboard(this, WIDTH/4, HEIGHT/4, scores);

        // Example of updating scores dynamically
        setTimeout(() => {
            scores[0].value = 150;
            this.scoreboard.updateScores(scores);
        }, 3000);
    }
}