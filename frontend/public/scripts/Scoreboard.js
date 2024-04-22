import * as wfl from "../lib/WebFontLoader.js" 
export default class Scoreboard extends Phaser.GameObjects.Container {
    constructor(scene, x, y, scores) {
        super(scene, x, y);
        this.maxVisibleScores = 5;
        this.scores = scores;

        // Create Text objects for each score
        this.scoreTexts = [];
        this.createScoreTexts();

        // Add score Text objects to the container
        this.scoreTexts.forEach(text => this.add(text));

        // Add the container to the scene
        scene.add.existing(this);
    }

    createScoreTexts() {
        // Create Text objects for each score or blank box if less than maxVisibleScores
        for (let i = 0; i < this.maxVisibleScores; i++) {
            const score = this.scores[i];
            if (score) {
                const text = this.scene.add.text(0, 0, `${score.name}: ${score.value}`, { fontSize: 30, color: '#ffffff' });
                this.scoreTexts.push(text);
            } else {
                // Create blank box
                const text = this.scene.add.text(0, 0, '', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });
                text.setBackgroundColor('#ffff00'); // Yellow background
                text.setStroke('#ff8c00', 4); // Orange outline
                this.scoreTexts.push(text);
            }
        }

        // Position Text objects vertically using VBox layout
        let yOffset = 0;
        this.scoreTexts.forEach(text => {
            text.y = yOffset;
            yOffset += text.height + 10; // Adjust spacing between Text objects
        });
        wfl.default.load({
            custom:{
                families: ['Kenny'],
            },
            active : () => {
                this.scoreTexts.forEach(st => {
                    st.setFontFamily('Kenny');
                });
            }
        });
    }

    updateScores(newScores) {
        // Update the scores and update Text objects
        this.scores = newScores;
        this.scoreTexts.forEach((text, index) => {
            if (this.scores[index]) {
                text.setText(`${this.scores[index].name}: ${this.scores[index].value}`);
            } else {
                text.setText('');
            }
        });
    }
}
