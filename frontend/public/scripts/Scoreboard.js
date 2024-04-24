import { HEIGHT, scale, WIDTH } from "./constant.js";
import { dataManager } from "./DataManager.js";

export default class Scoreboard extends Phaser.GameObjects.Container {
    constructor(scene, x, y, scores) {
        super(scene, x, y);
        this.maxVisibleScores = 5;
        this.scores = scores;

        // Create Text objects for each score
        this.scoreTexts = [];
        this.createScoreTexts();

        // Add score Text objects to the container
        this.scoreTexts.forEach(text => this.add(text).setFontFamily('Kenny'));

        // Add the container to the scene
        scene.add.existing(this);
    }

    createScoreTexts() {
        // Create Text objects for each score or blank box if less than maxVisibleScores
        for (let i = 0; i < this.maxVisibleScores; i++) {
            const score = this.scores[i];
            if (score) {
               const text = this.scene.add.text(10, 0, `${score.name}: ${score.value}`, { fontSize: 30*scale, color: '#ffffff' }).setFontFamily('Kenny');
                this.scoreTexts.push(text);
            } else {
                // Create blank box
                const text = this.scene.add.text(10, 0, '', {fontSize:30*scale , color: '#ffffff' }).setFontFamily('Kenny');
                text.setBackgroundColor('#ffff00'); // Yellow background
                text.setStroke('#ff8c00', 4); // Orange outline
                this.scoreTexts.push(text);
            }
        }

        // Position Text objects vertically using VBox layout
        let yOffset = (WIDTH > HEIGHT) ? 0 : 200;
        this.scoreTexts.forEach(text => {
            text.y = yOffset;
            yOffset += text.height + 10; // Adjust spacing between Text objects
        });
    }

    updateScores(newScores,userCookieId) {
        // Update the scores and update Text objects
        this.scores = newScores;
        this.scoreTexts.forEach((text, index) => {
            if (this.scores[index]) {
                if(userCookieId == this.scores[index].userCookieId){
                    text.setText(`${dataManager.store.values.userName}: ${dataManager.store.values.userScore}`);
                }else{
                    text.setText(`${this.scores[index].name}: ${this.scores[index].value}`);
                }
            } else {
                text.setText('');
            }
        });
    }
}
