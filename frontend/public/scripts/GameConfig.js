import MainScene from "./Scene.js";

var mainScene = new MainScene();

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [mainScene]
};

const game = new Phaser.Game(config);