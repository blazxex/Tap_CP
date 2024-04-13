import { WIDTH,HEIGHT,OffsetFromOrigin} from "./constant.js";
import clickEvent from "./eventCenter.js";
import Button from "./Button.js";
import Scoreboard from "./Scoreboard.js";

export default class PlayerUI extends Phaser.Scene{

    constructor() {
		super({ key: 'PlayerUI',active:true });
        this.selectedCard = null;
        this.levelText = null;
        this.pointText = null;
	}
    preload (){
        this.load.image('kuromaru', "./asset/kuromaru.png")
        this.load.image('playerImg',"./asset/player.png")
        this.load.image('card1', "./asset/card1.png");
        this.load.image('card2', "./asset/card2.png");
        this.load.image('card3', "./asset/card3.png");
        this.load.image('diamondSword', "./asset/diamond.png");
        //load sprite sheet
        this.load.spritesheet("player-IDLE", "./asset/player-Sheet.png",{
            frameWidth:256,
            frameHeight:256
        });
    }

    selectCard(clickedCard) {
        // If another card is already selected, disable it
        if (this.selectedCard !== null && this.selectedCard !== clickedCard) {
            this.selectedCard.whiteFill.setAlpha(0); 
            console.log(`Cleared tint and enabled interaction for previously selected card: ${this.selectedCard.name}`);
        }
    
        // Update the selected card
        this.selectedCard = clickedCard;
        this.selectedCard.whiteFill.setAlpha(1); 
        console.log(`Set tint to white and disabled interaction for selected card: ${this.selectedCard.name}`);
    }

    create (){
        //set up event
        clickEvent.on('OnClick', score => this.onClickHandler(score), this)

        // player image
        // var kuro = this.add.image(WIDTH/2, OffsetFromOrigin(HEIGHT,.3), 'playerImg').setScale(1);
        var player = this.add.sprite(WIDTH/2, OffsetFromOrigin(HEIGHT,.3),"player-IDLE");
        this.anims.create({
            key:"player-Idle",
            frames: this.anims.generateFrameNumbers("player-IDLE"),
            frameRate:4,
            repeat:-1
        })

        player.play("player-Idle");

        // text
        //TODO : have to fetch point data from server

        this.pointText = this.add.text(.7*WIDTH, .4*HEIGHT, 'point : 000').setFontFamily('Arial').setFontSize(64).setColor('#ffff00');
        this.levelText = this.add.text(.7*WIDTH, .4*HEIGHT+80, 'level: 000').setFontFamily('Arial').setFontSize(64).setColor('#ffff00');


        //TODO : select one -> disable other
        // element button
        var card1 = new Button(this,.7*WIDTH, .2*HEIGHT,.2,'card1','card01');
        this.add.existing(card1);
        card1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            console.log("click card");
            this.selectCard(card1);
        });

        var card2 = new Button(this,.7*WIDTH+200, .2*HEIGHT,.17,'card2','card02');
        this.add.existing(card2);
        card2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            console.log("click card");
            this.selectCard(card2);
        });

        var card3 = new Button(this,.7*WIDTH+400, .2*HEIGHT,.2,'card3','card03');
        this.add.existing(card3);
        card3.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            console.log("click card");
            this.selectCard(card3);
        });


        // level up button
        var upgradeButton = new Button(this,.7*WIDTH+200, .7*HEIGHT,.2,'diamondSword');
        this.add.existing(upgradeButton);
        upgradeButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            console.log("upgrade");
        });

    }

    onClickHandler(score){
        // console.log('receive event')
        this.pointText.setText(`point : ${score}`)
        //TODO : for animation.
    }


}