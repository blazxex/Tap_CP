import MainScene from "./Scene.js";
import BossUI from "./BossUI.js";
import PlayerUI from "./PlayerUI.js";
import ScoreBoardUI from "./ScoreboardUI.js";
import { WIDTH, HEIGHT } from "./constant.js";
import { fetchUser } from "./api.js";

setup();

async function setup(){
    var user = await fetchUser();
    var mainScene = new MainScene();
    var bossUI = new BossUI();
    var playerUI = new PlayerUI();
    var scoreUI = new ScoreBoardUI();

    var config = {
        scale:{
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        type: Phaser.AUTO,
        backgroundColor : "0x000000",
        width: WIDTH,
        height: HEIGHT,
        transparent: true,
        pixelArt: true,
        parent: "game",
        scene: [mainScene, bossUI, playerUI, scoreUI]

    };

    // const game = new Phaser.Game(config);
    const game = new Phaser.Game(config);
    // window.addEventListener('resize', resizeGame);
    // function resizeGame() {
    //     // Resize the game to fit the new window dimensions
    //     game.scale.resize(WIDTH, HEIGHT);
    // }   
}




