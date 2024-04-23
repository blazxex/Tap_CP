import { WIDTH,HEIGHT } from "./constant.js";
import * as wfl from "../lib/WebFontLoader.js"

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
        const muteButton = this.add.text(WIDTH / 1.5, HEIGHT - 50, 'Mute Music', { fill: '#ffff00' , fontSize: '40px'});
        muteButton.setInteractive(); // Make the button interactive

        // Start playing the music
        this.music = this.sound.add('TWF');
        this.music.setVolume(.02);
        this.music.play({ loop: true });
        this.music.isMuted = false;
        this.music.setMute(false);
        wfl.default.load({
            custom:{
                families: ['Kenny'],
            },
            active : () => {
                // this.scoreTexts.forEach(st => {
                muteButton.setFontFamily('Kenny');
                // });
            }
        });

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
