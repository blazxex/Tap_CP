import { WIDTH,HEIGHT } from "./constant.js";
export default class soundPlayerUI extends Phaser.Scene {
    constructor() {
        super({ key: 'soundPlayerUI',active:true }); // Call the constructor of the parent class
  
    }

    // Preload assets
    preload() {
        // Load the song file
        this.load.audio('TWF', './asset/Mega.mp3');
        console.log("create soundboard")
        
    }

    // Create scene elements
    create() {
        // Add a button to start the music
        const muteButton = this.add.text(WIDTH / 1.5, HEIGHT - 20, 'Mute Music', { fill: '#ffff00' });
        muteButton.setInteractive(); // Make the button interactive

        // Start playing the music
        this.music = this.sound.add('TWF');
        this.music.setVolume(.05);
        this.music.play({ loop: true });
        this.music.isMuted = false;
        this.music.setMute(false);

        // Event handler for the button click
        muteButton.on('pointerdown', () => {
            // Toggle mute/unmute state of the music
            // Change button text based on mute/unmute state
            if (this.music.isMuted) {
                this.music.isMuted = false;
                muteButton.setText('mute Music');
                this.music.setMute(false);
            } else {
                this.music.isMuted = true;
                muteButton.setText('UnMute Music');
                this.music.setMute(true);
            }
        });
    }
}
