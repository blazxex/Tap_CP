import { WIDTH,HEIGHT,OffsetFromOrigin} from "./constant.js";
import clickEvent from "./eventCenter.js";
import Button from "./Button.js";

export default class PlayerUI extends Phaser.Scene{
    constructor() {
		super({ key: 'PlayerUI',active:true });
	}
    preload (){
        this.load.image('kuromaru', "./asset/kuromaru.png")
        this.load.image('card1', "./asset/card1.png");
        this.load.image('card2', "./asset/card2.png");
        this.load.image('card3', "./asset/card3.png");
        this.load.image('diamondSword', "./asset/diamond.png");
    }
    create (){
        //set up event
        clickEvent.on('OnClick', this.onClickHandler, this)

        // player image
        var kuro = this.add.image(WIDTH/2, OffsetFromOrigin(HEIGHT,.3), 'kuromaru').setScale(.5);

        // text
        //TODO : have to fetch point data from server
        var pointText = this.add.text(.7*WIDTH, .4*HEIGHT, 'point : 000').setFontFamily('Arial').setFontSize(64).setColor('#ffff00');
        var levelText = this.add.text(.7*WIDTH, .4*HEIGHT+80, 'level: 000').setFontFamily('Arial').setFontSize(64).setColor('#ffff00');


        //TODO : select one -> disable other
        // element button
        var card1 = new Button(this,.7*WIDTH, .2*HEIGHT,.2,'card1');
        this.add.existing(card1);
        card1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            console.log("click card");
        });

        var card2 = new Button(this,.7*WIDTH+200, .2*HEIGHT,.17,'card2');
        this.add.existing(card2);
        card2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            console.log("click card");
        });

        var card3 = new Button(this,.7*WIDTH+400, .2*HEIGHT,.2,'card3');
        this.add.existing(card3);
        card3.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            console.log("click card");
        });


        // level up button
        var upgradeButton = new Button(this,.7*WIDTH+200, .7*HEIGHT,.2,'diamondSword');
        this.add.existing(upgradeButton);
        upgradeButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            console.log("upgrade");
        });

    }

    onClickHandler(){
        // console.log('receive event')
        //TODO : for animation.
    }


}