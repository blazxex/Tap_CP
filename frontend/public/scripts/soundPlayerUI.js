export default class soundPlayer extends Phaser.Scene {
    constructor() {
        super(); // Call the constructor of the parent class
    }

    // Preload assets
    preload() {
        // Load the song file
        this.load.audio('TWF', './asset/ThoseWhoFight.mp3');
    }

    // Create scene elements
    create() {
        // Add a button to start the music
        const startButton = this.add.text(100, 100, 'Start Music', { fill: '#ffffff' });
        startButton.setInteractive(); // Make the button interactive

        // Event handler for the button click
        startButton.on('pointerdown', () => {
            // Start the music when the button is clicked
            this.music = this.sound.add('TWF');
            this.music.play({ loop: true });
        });
    }
}
