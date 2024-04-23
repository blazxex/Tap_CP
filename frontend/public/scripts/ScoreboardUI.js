import { WIDTH,HEIGHT } from "./constant.js";
import Scoreboard from "./Scoreboard.js";
import { BACKEND_URL } from "./config.js";

export default class ScoreBoardUI extends Phaser.Scene{
    constructor() {
		super({ key: 'ScoreBoardUI',active:true });
	}
    async create() {
        try {
            // console.log(localStorage.removeItem("userCookieId"));
            // console.log(localStorage.getItem("userCookieId"));
            // Fetch top 5 scores from the backend
            const response = await fetch(`${BACKEND_URL}/board/`);
            const topScores = await response.json();

            // Extract top 5 scores from the response
            const top5 = topScores.slice(0, 5);

            // Create an array of score objects for the Scoreboard component
            const scores = top5.map((score, index) => ({
                name: score.userName, // Assuming the userName property contains the player's name
                value: score.score
            }));

            // Create the scoreboard using fetched data
            this.scoreboard = new Scoreboard(this, 50, 50, scores);

            // Example of updating scores dynamically
            setInterval(async () => {
                // Simulate updating scores after 3 seconds
                const updatedResponse = await fetch(`${BACKEND_URL}/board/`);
                const updatedTopScores = await updatedResponse.json();
                
                // Extract top 5 scores from the updated response
                const updatedTop5 = updatedTopScores.slice(0, 5);
                
                // Create an array of score objects for the Scoreboard component
                const updatedScores = updatedTop5.map((score, index) => ({
                    name: score.userName, // Assuming the userName property contains the player's name
                    value: score.score,
                    cookieid: score.userCookieId
                }));
                
                // Update the scoreboard with the updated scores
                this.scoreboard.updateScores(updatedScores,localStorage.getItem("userCookieId"));
            }, 500);
        } catch (error) {
            //console.error('Error fetching top scores:', error);
        }
    }
}